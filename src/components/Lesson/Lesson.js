/* eslint-env node */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Lesson.scss';
import LevelIcon from '../LevelIcon';
import ToggleButton from './ToggleButton';
import processContent from './processContent';
import contentStyles from './Content.scss';
import {ImprovePageContainer} from './ImprovePage.js';
import Row from 'react-bootstrap/lib/Row';
import {removeHtmlFileEnding} from '../../util.js';
import lessonStyles from '../PlaylistPage/LessonItem.scss';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import {connect} from 'react-redux';
import {setModeTeacher, setLanguage} from '../../action_creators';


const Lesson = React.createClass({
  getTitle() {
    return this.props.lesson.frontmatter.title ? this.props.lesson.frontmatter.title : '';
  },
  getLevel() {
    return this.props.lesson.frontmatter.level ? this.props.lesson.frontmatter.level : 0;
  },
  getAuthor() {
    return this.props.lesson.frontmatter.author ? this.props.lesson.frontmatter.author : '';
  },
  getLanguage() {
    return this.props.lesson.frontmatter.language ? this.props.lesson.frontmatter.language : '';
  },
  createMarkup(){
    return {
      __html: removeHtmlFileEnding(this.props.lesson.content)
    };
  },
  getButton(path){
    const lessons = this.props.lessons;
    let lessonOrReadme = typeof(lessons['./' + path + '.md']) !== 'undefined'
    ? lessons['./' + path + '.md']['readmePath'] : undefined;
    const buttonText = lessonOrReadme ? 'Til lærerveiledning' : 'Til oppgave';

    if(!lessonOrReadme){
      for(let key in lessons){
        if(lessons[key]['readmePath'] === '/' + path){
          lessonOrReadme = lessons[key]['external'] === '' ? lessons[key]['path'] : undefined;
        }
      }
    }
    return (lessonOrReadme ?
      <LinkContainer to={lessonOrReadme}>
        <Button componentClass="div" className={lessonStyles.instructionBtn} bsStyle="guide" bsSize="small">
          {buttonText}
        </Button>
      </LinkContainer> : null
    );
  },
  isReadme(path){
    try{
      return this.props.readmeContext('./' + path + '.md');
    }catch(e){
      return;
    }
  },
  setLanguage(){
    const lessonLanguage = this.getLanguage();
    if(lessonLanguage !== '' && lessonLanguage !== this.props.language) {
      this.props.setLanguage(lessonLanguage);
    }
  },
  componentWillMount(){
    if (typeof document === 'undefined') {
      // do nothing server-side
      return;
    }
    this.props.lesson.content = processContent(this.props.lesson.content, contentStyles);

    if(this.isReadme(this.props.path)) this.props.setModeTeacher();
    /*Comment this in when language is implemented
    Changes the language state to the language defined in the current lesson or readme-file*/
    //this.setLanguage();
  },
  componentDidMount() {
    const nodes = document.getElementsByClassName('togglebutton');
    for (let node of nodes) {
      const strongNode = node.getElementsByTagName('strong')[0];
      const buttonText = strongNode ? strongNode.textContent : 'Hint';
      const hiddenNode = node.getElementsByTagName('hide')[0];
      const hiddenHTML = hiddenNode ? hiddenNode.innerHTML : '';
      ReactDOM.render(<ToggleButton buttonText={buttonText} hiddenHTML={hiddenHTML}/>,node);
    }
  },
  componentWillUnmount() {
    const nodes = document.getElementsByClassName('togglebutton');
    for (let node of nodes) {
      ReactDOM.unmountComponentAtNode(node);
    }
  },
  render() {
    const instructionBtn = !this.props.isStudentMode ? this.getButton(this.props.path) : null;
    return (
      <div className={styles.container}>
        <h1>
          <LevelIcon level={this.getLevel()}/>
          {this.getTitle()}{this.getLevel > 0 ? '- Level ' + this.getLevel() : ''}
        </h1>
        {this.getAuthor() !== '' ? <p><i>av {this.getAuthor()}</i></p> : ''}
        {instructionBtn}
        <div dangerouslySetInnerHTML={this.createMarkup()}/>
        
        <Row>
          <ImprovePageContainer courseLessonFileProp={this.props.params}/>
        </Row>

      </div>
    );
  }
});

Lesson.propTypes = {
  lesson: PropTypes.shape({
    frontmatter: PropTypes.object,
    content: PropTypes.string
  }),
  path: PropTypes.string,
  lessons: PropTypes.object,
  isStudentMode: PropTypes.bool,
  readmeContext: PropTypes.func,
  setModeTeacher: PropTypes.func,
  setLanguage: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isStudentMode: state.isStudentMode,
    lessons: state.lessons,
    readmeContext: state.context.readmeContext,
    language: state.language
  };
};

export default connect(
  mapStateToProps,
  {
    setModeTeacher,
    setLanguage
  }
  )(withStyles(styles, contentStyles)(Lesson));
