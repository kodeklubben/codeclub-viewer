/* eslint-env node */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentMeta from 'react-document-meta';
import styles from './Lesson.scss';
import LevelIcon from '../LevelIcon';
import ToggleButton from './ToggleButton';
import processContent from '../../processContent';
import contentStyles from './Content.scss';
import ImprovePage from './ImprovePage.js';
import Row from 'react-bootstrap/lib/Row';
import {getTranslator} from '../../selectors/translate';
import {removeHtmlFileEnding, getReadmepathFromLessonpath, hashCode,
  createCheckboxesKey, getLessonIntro} from '../../util';
import Button from 'react-bootstrap/lib/Button';
import {setModeTeacher, setLanguage, setCheckbox, setLastLesson} from '../../action_creators';
import MarkdownRenderer from '../MarkdownRenderer';
import InstructionButton from './InstructionButton';

const ReadmeButton = ({path, lessons, t}) => {
  const contextPath = './' + path + '.md';
  const buttonPath = (lessons[contextPath] || {}).readmePath;
  const buttonText= t('lessons.toteacherinstruction');
  const bsStyle = 'guide';
  const bsSize = 'small';
  return <InstructionButton {...{buttonPath, buttonText, bsStyle, bsSize}}/>;
};

ReadmeButton.propTypes = {
  // ownProps
  path: PropTypes.string.isRequired,
  lessons: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const LessonButton = ({path, lessons, t}) => {
  const lessonPath = '/' + path;
  const buttonPath = getReadmepathFromLessonpath(lessons, lessonPath);
  const buttonText= t('lessons.tolesson');
  const bsStyle = 'guide';
  const bsSize = 'small';
  return <InstructionButton {...{buttonPath, buttonText, bsStyle, bsSize}}/>;
};

LessonButton.propTypes = {
  // ownProps
  path: PropTypes.string.isRequired,
  lessons: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const setCheckboxes = (path, checkboxes, setCheckbox) => {
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
    return this.props.lesson.frontmatter.title || this.props.params.file;
  },
  getLevel() {
    return this.props.lesson.frontmatter.level || 0;
  },
  getAuthor() {
    const author = this.props.lesson.frontmatter.author || '';
    return author ?
      <p><i>{this.props.t('lessons.writtenby')} <MarkdownRenderer src={author} inline={true} /></i></p> :
      null;
  },
  getTranslator() {
    const translator = this.props.lesson.frontmatter.translator || '';
    return translator ?
      <p><i>{this.props.t('lessons.translatedby')} <MarkdownRenderer src={translator} inline={true} /></i></p> :
      null;
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

    //Changes the language state to the language defined in the current lesson or readme-file
    //this.setLanguage();
  },
  componentDidMount() {
    const {path, checkboxes, setCheckbox, setLastLesson} = this.props;
    setCheckboxes(path, checkboxes, setCheckbox);
    rememberLastLesson(path, setLastLesson);
    renderToggleButtons();
  },
  componentWillUnmount() {
    const nodes = [...document.getElementsByClassName('togglebutton')];
    for (let node of nodes) {
      ReactDOM.unmountComponentAtNode(node);
    }
  },
  render() {
    const {t, path, lessons, isReadme, isStudentMode, setCheckbox, checkboxes} = this.props;
    const meta = {
      title: this.getTitle() + ' | ' + t('title.codeclub'),
      description: getLessonIntro(path)
    };
    const instructionBtn = isReadme ? <LessonButton {...{path, lessons, t}}/> :
      isStudentMode ? null : <ReadmeButton {...{path, lessons, t}}/>;
    const resetButton = anyCheckboxTrue(checkboxes) === true ?
      <Button className={styles.resetButton}  bsStyle="warning" bsSize="small"
      onClick={() => setCheckboxes(path, {}, setCheckbox)}>{t('lessons.reset')}</Button>
      : null;
    return (
      <DocumentMeta {...meta}>
        <div className={styles.container}>
          <h1>
            <LevelIcon level={this.getLevel()}/>
            {this.getTitle()}{this.getLevel > 0 ? '- ' + t('general.level') + this.getLevel() : ''}
          </h1>
          {this.getAuthor()}
          {this.getTranslator()}
          {resetButton}
          {instructionBtn}
          <div dangerouslySetInnerHTML={this.createMarkup()}/>

          <Row>
            <ImprovePage courseLessonFileProp={this.props.params}/>
          </Row>

        </div>
      </DocumentMeta>
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
  meta: PropTypes.object,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  isStudentMode: PropTypes.bool.isRequired,
  lessons: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
  checkboxes: PropTypes.object,

  // mapDispatchToProps
  setModeTeacher: PropTypes.func.isRequired,
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
  setModeTeacher,
  setLanguage,
  setCheckbox,
  setLastLesson
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(withStyles(styles, contentStyles)(Lesson));
