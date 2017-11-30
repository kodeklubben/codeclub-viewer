/* eslint-env node */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import styles from './Lesson.scss';
import LevelIcon from '../LevelIcon';
import ToggleButton from './ToggleButton';
import processContent from '../../processContent';
import contentStyles from './Content.scss';
import ImprovePage from './ImprovePage.js';
import Row from 'react-bootstrap/lib/Row';
import {getTranslator} from '../../selectors/translate';
import {capitalize, removeHtmlFileEnding,
  setCheckboxes, anyCheckboxTrue, createCheckboxesKey, translateGroup, translateTag} from '../../util';
import {getTitle, getLevel, getTags, getAuthorName, getTranslatorName} from '../../selectors/frontmatter';
import {getNumberOfCheckedCheckboxes, getTotalNumberOfCheckboxes} from '../../selectors/checkboxes';
import {setCheckbox, setLastLesson} from '../../action_creators';
import MarkdownRenderer from '../MarkdownRenderer';
import LessonButton from './LessonButton';
import ReadmeButton from './ReadmeButton';
import ResetButton from './ResetButton';
import PdfButton from './PdfButton';
import PrintButton from './PrintButton';

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

const createMarkup = (lessonContent) => {
  return ({__html: removeHtmlFileEnding(processContent(lessonContent, contentStyles))});
};

const Progress = ({checkedCheckboxes, totalCheckboxes}) => {
  const now = totalCheckboxes > 0 ? 100 * checkedCheckboxes / totalCheckboxes : 0;
  const bsStyle = 'success';
  const className = styles.progressBar;
  const label = `${checkedCheckboxes}/${totalCheckboxes}`;
  return <ProgressBar {...{now, bsStyle, className, label}} active/>;
};

Progress.PropTypes = {
  // mapStateToProps
  checkedCheckboxes: PropTypes.number.isRequired,
  totalCheckboxes: PropTypes.number.isRequired,
};

const PrintInfo = ({t, course, tags}) =>
  <div className={styles.box}>
    <div>{t('lessons.course')} {capitalize(course)}</div>
    {Object.keys(tags).map( group =>
      <div key={group}>
        {translateGroup(t, group) + ': ' + tags[group].map(tag => translateTag(t, group, tag)).join(', ')}
      </div>
    )}
  </div>;

PrintInfo.PropTypes = {
  t: PropTypes.func.isRequired,
  course: PropTypes.string.isRequired,
  tags: PropTypes.object.isRequired,
};

const Lesson = React.createClass({
  componentDidMount() {
    const {path, checkboxes, setCheckbox, setLastLesson} = this.props;
    setCheckboxes(path, checkboxes, setCheckbox);
    rememberLastLesson(path, setLastLesson);
    renderToggleButtons();
  },
  render() {
    const {path, params, lesson, checkedCheckboxes, totalCheckboxes,
      checkboxes, t, title, level, tags, authorName, translatorName, isReadme, isStudentMode} = this.props;
    const author = authorName ?
      <p><i>{t('lessons.writtenby')} <MarkdownRenderer src={authorName} inline={true} /></i></p> : null;
    const translator = translatorName ? <p><i>{t('lessons.translatedby')} {translatorName}</i></p> : null;
    const resetButton = anyCheckboxTrue(checkboxes) === true ? <ResetButton {...{path}}/> : null;
    const instructionButton = isReadme ? <LessonButton {...{path}}/> :
      isStudentMode ? null : <ReadmeButton {...{path}}/>;
    const pdfButton = <PdfButton lessonfile={params.file}/>;
    const progress = checkedCheckboxes > 0 ? <Progress {...{checkedCheckboxes, totalCheckboxes}}/> : null;
    return (
      <DocumentTitle title={title + ' | ' + t('title.codeclub')}>
        <div className={styles.container}>
          <h1>
            <LevelIcon {...{level}}/>
            {title}
          </h1>
          {author}
          {translator}
          <PrintInfo {...{t, course: params.course, tags}}/>
          <PrintButton/>
          {resetButton}
          {instructionButton}
          {pdfButton}
          {progress}
          <div dangerouslySetInnerHTML={createMarkup(lesson.content)}/>
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
    file: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
  }).isRequired,
  lesson: PropTypes.shape({
    content: PropTypes.string
  }),

  // mapStateToProps
  t: PropTypes.func.isRequired,
  checkboxes: PropTypes.object,
  title: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  tags: PropTypes.object.isRequired,
  authorName: PropTypes.string.isRequired,
  translatorName: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
  isStudentMode: PropTypes.bool.isRequired,

  // mapDispatchToProps
  setCheckbox: PropTypes.func.isRequired,
  setLastLesson: PropTypes.func.isRequired
};

const mapStateToProps = (state, {path, params}) => ({
  t: getTranslator(state),
  checkboxes: state.checkboxes[createCheckboxesKey(path)] || {},
  title: getTitle(state, params),
  level: getLevel(state, params),
  tags: getTags(state, params),
  authorName: getAuthorName(state, params),
  translatorName: getTranslatorName(state, params),
  isReadme: state.context.readmeContext.keys().indexOf('./' + path + '.md') !== -1,
  isStudentMode: state.isStudentMode,
  checkedCheckboxes: getNumberOfCheckedCheckboxes(state, createCheckboxesKey(path)),
  totalCheckboxes: getTotalNumberOfCheckboxes(state, createCheckboxesKey(path)),
});

const mapDispatchToProps = {
  setCheckbox,
  setLastLesson
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, contentStyles)(Lesson));
