/* eslint-env node */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';
import styles from './Lesson.scss';
import LevelIcon from '../LevelIcon';
import ToggleButton from './ToggleButton';
import processContent from '../../processContent';
import contentStyles from './Content.scss';
import ImprovePage from './ImprovePage.js';
import Row from 'react-bootstrap/lib/Row';
import {getTranslator} from '../../selectors/translate';
import {removeHtmlFileEnding, hashCode, createCheckboxesKey} from '../../util';
import {setLanguage, setCheckbox, setLastLesson} from '../../action_creators';
import MarkdownRenderer from '../MarkdownRenderer';
import ReadmeButton from './ReadmeButton';
import LessonButton from './LessonButton';
import ResetButton from './ResetButton';

export const setCheckboxes = (path, checkboxes, setCheckbox) => {
  const labels = [...document.getElementsByTagName('label')];
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

const anyCheckboxTrue = (checkboxes) => {
  for (let i of Object.keys(checkboxes)) {
    if (checkboxes[i] === true) {
      return true;
    }
  }
  return false;
};

const renderToggleButtons = () => {
  const nodes = [...document.getElementsByClassName('togglebutton')];
  for (let node of nodes) {
    const strongNode = node.getElementsByTagName('strong')[0];
    const buttonText = strongNode ? strongNode.textContent : 'Hint';
    const hiddenNode = node.getElementsByTagName('hide')[0];
    const hiddenHTML = hiddenNode ? hiddenNode.innerHTML : '';
    ReactDOM.render(<ToggleButton {...{buttonText, hiddenHTML}}/>,node);
  }
};

const rememberLastLesson = (path, setLastLesson) => {
  const lessonPath = '/' + path;
  setLastLesson(lessonPath);
};

const Lesson = React.createClass({
  getTitle() {
    const {lesson, params} = this.props;
    return lesson.frontmatter.title || params.file;
  },
  getLevel() {
    const {lesson} = this.props;
    return lesson.frontmatter.level || 0;
  },
  getAuthor() {
    const {lesson, t} = this.props;
    const author = lesson.frontmatter.author || '';
    return author ?
      <p><i>{t('lessons.writtenby')} <MarkdownRenderer src={author} inline={true} /></i></p> :
      null;
  },
  getTranslator() {
    const {lesson, t} = this.props;
    const translator = lesson.frontmatter.translator || '';
    return translator ?
      <p><i>{t('lessons.translatedby')} <MarkdownRenderer src={translator} inline={true} /></i></p> :
      null;
  },
  getLanguage() {
    const {lesson} = this.props;
    return lesson.frontmatter.language || '';
  },
  createMarkup(){
    const {lesson} = this.props;
    return {
      __html: removeHtmlFileEnding(lesson.content)
    };
  },
  setLanguage(){
    const {language, setLanguage} = this.props;
    const lessonLanguage = this.getLanguage();
    if(lessonLanguage !== '' && lessonLanguage !== language) {
      setLanguage(lessonLanguage);
    }
  },
  componentWillMount(){
    const {lesson} = this.props;
    if (typeof document === 'undefined') {
      // do nothing server-side
      return;
    }
    lesson.content = processContent(lesson.content, contentStyles);
  },
  componentDidMount() {
    const {path, checkboxes, setCheckbox, setLastLesson} = this.props;
    setCheckboxes(path, checkboxes, setCheckbox);
    rememberLastLesson(path, setLastLesson);
    renderToggleButtons();
  },
  render() {
    const {t, path, lessons, isReadme, isStudentMode, checkboxes, params} = this.props;
    const instructionButton = isReadme ? <LessonButton {...{path, lessons, t}}/> :
      isStudentMode ? null : <ReadmeButton {...{path, lessons, t}}/>;
    const resetButton = anyCheckboxTrue(checkboxes) === true ?
      <ResetButton {...{path}}/> : null;
    return (
      <DocumentTitle title={this.getTitle() + ' | ' + t('title.codeclub')}>
        <div className={styles.container}>
          <h1>
            <LevelIcon level={this.getLevel()}/>
            {this.getTitle()}{this.getLevel > 0 ? '- ' + t('general.level') + this.getLevel() : ''}
          </h1>
          {this.getAuthor()}
          {this.getTranslator()}
          {resetButton}
          {instructionButton}
          <div dangerouslySetInnerHTML={this.createMarkup()}/>

          <Row>
            <ImprovePage courseLessonFileProp={params}/>
          </Row>

        </div>
      </DocumentTitle>
    );
  }
});

Lesson.propTypes = {
  // ownProps
  path: PropTypes.string,
  params: PropTypes.shape({
    file: PropTypes.string.isRequired
  }).isRequired,
  lesson: PropTypes.shape({
    frontmatter: PropTypes.object,
    content: PropTypes.string
  }),

  // mapStateToProps
  t: PropTypes.func.isRequired,
  isStudentMode: PropTypes.bool.isRequired,
  lessons: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
  checkboxes: PropTypes.object,

  // mapDispatchToProps
  setLanguage: PropTypes.func.isRequired,
  setCheckbox: PropTypes.func.isRequired,
  setLastLesson: PropTypes.func.isRequired
};

const mapStateToProps = (state, {path}) => ({
  t: getTranslator(state),
  isStudentMode: state.isStudentMode,
  lessons: state.lessons,
  language: state.language,
  isReadme: state.context.readmeContext.keys().indexOf('./' + path + '.md') !== -1,
  checkboxes: state.checkboxes[createCheckboxesKey(path)] || {}
});

const mapDispatchToProps = {
  setLanguage,
  setCheckbox,
  setLastLesson
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(withStyles(styles, contentStyles)(Lesson));
