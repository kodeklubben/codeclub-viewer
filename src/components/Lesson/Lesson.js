/* eslint-env node */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Lesson.scss';
import LevelIcon from '../LevelIcon';
import ToggleButton from './ToggleButton';
import processContent from './processContent';
import contentStyles from './Content.scss';
import {ImprovePageContainer} from './ImprovePage.js';
import Row from 'react-bootstrap/lib/Row';
import {getTranslator} from '../../selectors/translate';
import {removeHtmlFileEnding, getReadmepathFromLessonpath, hashCode, createCheckboxesKey} from '../../util.js';
import lessonStyles from '../PlaylistPage/LessonItem.scss';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import {setModeTeacher, setLanguage, setCheckbox, setLastLesson} from '../../action_creators';

const InstructionButton = ({buttonPath, buttonText}) => {
  return (buttonPath ?
    <LinkContainer to={buttonPath}>
      <Button className={lessonStyles.instructionBtn} bsStyle="guide" bsSize="small">
        {buttonText}
      </Button>
    </LinkContainer> :
    null);
};

const ReadmeButton = ({path, lessons, t}) => {
  const contextPath = './' + path + '.md';
  const buttonPath = (lessons[contextPath] || {}).readmePath;
  return <InstructionButton buttonPath={buttonPath} buttonText={t('lessons.toteacherinstruction')}/>;
};

const LessonButton = ({path, lessons, t}) => {
  const lessonPath = '/' + path;
  const buttonPath = getReadmepathFromLessonpath(lessons, lessonPath);
  return <InstructionButton buttonPath={buttonPath} buttonText={t('lessons.tolesson')}/>;
};

const onclickAndSetCheckboxes = (path, checkboxes, setCheckbox) => {
  const labels = document.getElementsByTagName('label');
  for (let label of labels) {
    const input = document.getElementById(label.htmlFor);
    if (input && input.type === 'checkbox') {
      let hash = hashCode(label.textContent);
      input.checked = !!checkboxes[hash];
      setCheckbox(path, hash, !!checkboxes[hash]);
      input.onclick = (e) => {
        setCheckbox(path, hash, !!e.target.checked);
      };
    }
  }
};

const renderToggleButtons = () => {
  const nodes = document.getElementsByClassName('togglebutton');
  for (let node of nodes) {
    const strongNode = node.getElementsByTagName('strong')[0];
    const buttonText = strongNode ? strongNode.textContent : 'Hint';
    const hiddenNode = node.getElementsByTagName('hide')[0];
    const hiddenHTML = hiddenNode ? hiddenNode.innerHTML : '';
    ReactDOM.render(<ToggleButton buttonText={buttonText} hiddenHTML={hiddenHTML}/>,node);
  }
};

const rememberLastLesson = (path, setLastLesson) => {
  const lessonPath = '/' + path;
  setLastLesson(lessonPath);
};

const Lesson = React.createClass({
  getTitle() {
    return this.props.lesson.frontmatter.title || '';
  },
  getLevel() {
    return this.props.lesson.frontmatter.level || 0;
  },
  getAuthor() {
    return this.props.lesson.frontmatter.author || '';
  },
  getLanguage() {
    return this.props.lesson.frontmatter.language || '';
  },
  createMarkup(){
    return {
      __html: removeHtmlFileEnding(this.props.lesson.content)
    };
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

    if(this.props.isReadme) this.props.setModeTeacher();
    /*Comment this in when language is implemented
    Changes the language state to the language defined in the current lesson or readme-file*/
    //this.setLanguage();
  },
  componentDidMount() {
    const {path, checkboxes, setCheckbox, setLastLesson} = this.props;
    onclickAndSetCheckboxes(path, checkboxes, setCheckbox);
    rememberLastLesson(path, setLastLesson);
    renderToggleButtons();
  },
  componentWillUnmount() {
    const nodes = document.getElementsByClassName('togglebutton');
    for (let node of nodes) {
      ReactDOM.unmountComponentAtNode(node);
    }
  },
  render() {
    const {t, path, lessons, isReadme, isStudentMode} = this.props;
    const instructionBtn = isReadme ? <LessonButton {...{path, lessons, t}}/> :
      isStudentMode ? null : <ReadmeButton {...{path, lessons, t}}/>;
    return (
      <div className={styles.container}>
        <h1>
          <LevelIcon level={this.getLevel()}/>
          {this.getTitle()}{this.getLevel > 0 ? '- ' + t('general.level') + this.getLevel() : ''}
        </h1>
        {this.getAuthor() !== '' ? <p><i>{t('lessons.writtenby')} {this.getAuthor()}</i></p> : ''}
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
  setModeTeacher: PropTypes.func,
  setLanguage: PropTypes.func,
  isReadme: PropTypes.bool,
  t: PropTypes.func,
  setCheckbox: PropTypes.func,
  checkboxes: PropTypes.object,
  setLastLesson: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  t: getTranslator(state),
  isStudentMode: state.isStudentMode,
  lessons: state.lessons,
  language: state.language,
  isReadme: state.context.readmeContext.keys().indexOf('./' + ownProps.path + '.md') !== -1,
  checkboxes: state.checkboxes[createCheckboxesKey(ownProps.path)] || {}
});

export default connect(
  mapStateToProps,
  {
    setModeTeacher,
    setLanguage,
    setCheckbox,
    setLastLesson
  }
  )(withStyles(styles, contentStyles)(Lesson));
