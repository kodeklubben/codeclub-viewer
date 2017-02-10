/* eslint-env node */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Lesson.scss';
import LevelIcon from '../LevelIcon';
import ToggleButton from './ToggleButton';
import processContent from './processContent';
import contentStyles from './Content.scss';
import {ImprovePageContainer} from '../ImprovePage.js';
import Row from 'react-bootstrap/lib/Row';


const Lesson = React.createClass({
  getTitle() {
    return this.props.lesson.frontmatter.title;
  },
  getLevel() {
    return this.props.lesson.frontmatter.level;
  },
  getAuthor() {
    return this.props.lesson.frontmatter.author;
  },
  createMarkup(){
    return {
      __html: this.props.lesson.content
    };
  },
  componentWillMount(){
    if (typeof document === 'undefined') {
      // do nothing server-side
      return;
    }
    this.props.lesson.content = processContent(this.props.lesson.content, contentStyles);
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
    return (
      <div className={styles.container}>
        <h1><LevelIcon level={this.getLevel()}/>{this.getTitle()} - Level {this.getLevel()}</h1>
        <p><i>av {this.getAuthor()}</i></p>
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
  })
};

export default withStyles(styles, contentStyles)(Lesson);
