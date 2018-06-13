/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';
import styles from './LessonPage.scss';
import LevelIcon from '../components/LevelIcon';
import ToggleButton from '../components/LessonPage/ToggleButton';
import ImprovePage from '../components/LessonPage/ImprovePage.js';
import Row from 'react-bootstrap/lib/Row';
import {getTranslator, getTranslateTag, getTranslateGroup} from '../selectors/translate';
import {capitalize, setCheckboxes, anyCheckboxTrue, createCheckboxesKey} from '../util';
import {getTitle, getLevel, getTags, getAuthorName, getTranslatorName} from '../selectors/frontmatter';
import {getNumberOfCheckedCheckboxes, getTotalNumberOfCheckboxes} from '../selectors/checkboxes';
import {setCheckbox} from '../reducers/checkboxes';
import {setLastLesson} from '../reducers/lastLesson';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Progress from '../components/LessonPage/Progress';
import LessonButton from '../components/LessonPage/LessonButton';
import ReadmeButton from '../components/LessonPage/ReadmeButton';
import ResetButton from '../components/LessonPage/ResetButton';
import PdfButton from '../components/LessonPage/PdfButton';
import MainLanguageButton from '../components/LessonPage/MainLanguageButton';
import {lessonReadmePaths} from '../contexts';
import Content from '../components/LessonPage/Content';

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

const PrintInfo = ({t, translateTag, translateGroup, course, tags}) =>
  <div className={styles.box}>
    <div>{t('lessons.course')} {capitalize(course)}</div>
    {Object.keys(tags).map( group =>
      <div key={group}>
        {translateGroup(group) + ': ' + tags[group].map(tag => translateTag(group, tag)).join(', ')}
      </div>
    )}
  </div>;

PrintInfo.PropTypes = {
  t: PropTypes.func.isRequired,
  translateTag: PropTypes.func.isRequired,
  translateGroup: PropTypes.func.isRequired,
  course: PropTypes.string.isRequired,
  tags: PropTypes.object.isRequired,
};

class LessonPage extends React.Component {
  componentDidMount() {
    const {path, checkboxes, setCheckbox, setLastLesson} = this.props;
    setCheckboxes(path, checkboxes, setCheckbox);
    setLastLesson(path);
    renderToggleButtons();
  }

  render() {
    const {
      path, params,
      checkboxes, t, translateTag, translateGroup, checkedCheckboxes, totalCheckboxes,
      title, level, tags, authorName, translatorName, isReadme, isStudentMode
    } = this.props;
    const author = authorName ?
      <p><i>{t('lessons.writtenby')} <MarkdownRenderer src={authorName} inline={true} /></i></p> : null;
    const translator = translatorName ? <p><i>{t('lessons.translatedby')} {translatorName}</i></p> : null;
    const resetButton = anyCheckboxTrue(checkboxes) === true ? <ResetButton {...{path}}/> : null;
    const instructionButton = isReadme ? <LessonButton {...{path}}/> :
      isStudentMode ? null : <ReadmeButton {...{path}}/>;
    const pdfButton = <PdfButton lessonfile={params.file}/>;
    const progress = (checkedCheckboxes > 0 && !isReadme) ?
      <Progress {...{checkedCheckboxes, totalCheckboxes}}/> : null;
    return (
      <DocumentTitle title={title + ' | ' + t('title.codeclub')}>
        <div className={styles.container}>
          <h1>
            <LevelIcon {...{level}}/>
            {title}
          </h1>
          {author}
          {translator}
          <PrintInfo {...{t, translateTag, translateGroup, course: params.course, tags}}/>
          <MainLanguageButton {...{path}}/>
          {resetButton}
          {instructionButton}
          {pdfButton}
          {progress}
          <Content {...{path}}/>
          <Row>
            <ImprovePage courseLessonFileProp={params}/>
          </Row>
        </div>
      </DocumentTitle>
    );
  }
}

LessonPage.propTypes = {
  // ownProps
  params: PropTypes.shape({
    course: PropTypes.string.isRequired,
    lesson: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
  }).isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  translateTag: PropTypes.func.isRequired,
  translateGroup: PropTypes.func.isRequired,
  checkboxes: PropTypes.object,
  title: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  tags: PropTypes.object.isRequired,
  authorName: PropTypes.string.isRequired,
  translatorName: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
  isStudentMode: PropTypes.bool.isRequired,
  checkedCheckboxes: PropTypes.number.isRequired,
  totalCheckboxes: PropTypes.number.isRequired,
  path: PropTypes.string,

  // mapDispatchToProps
  setCheckbox: PropTypes.func.isRequired,
  setLastLesson: PropTypes.func.isRequired
};

const mapStateToProps = (state, {params}) => {
  const path = `/${params.course}/${params.lesson}/${params.file}`;
  return {
    t: getTranslator(state),
    translateTag: getTranslateTag(state),
    translateGroup: getTranslateGroup(state),
    checkboxes: state.checkboxes[createCheckboxesKey(path)] || {},
    title: getTitle(state, params),
    level: getLevel(state, params),
    tags: getTags(state, params),
    authorName: getAuthorName(state, params),
    translatorName: getTranslatorName(state, params),
    isReadme: lessonReadmePaths.includes(path),
    isStudentMode: state.isStudentMode,
    checkedCheckboxes: getNumberOfCheckedCheckboxes(state, createCheckboxesKey(path)),
    totalCheckboxes: getTotalNumberOfCheckboxes(state, createCheckboxesKey(path)),
    path,
  };
};

const mapDispatchToProps = {
  setCheckbox,
  setLastLesson
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LessonPage));
