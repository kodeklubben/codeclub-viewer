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
import {removeHtmlFileEnding, setCheckboxes, anyCheckboxTrue, createCheckboxesKey} from '../../util';
import {setCheckbox, setLastLesson} from '../../action_creators';
import MarkdownRenderer from '../MarkdownRenderer';
import LessonOrReadmeButton from './LessonOrReadmeButton';
import ResetButton from './ResetButton';

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
  if (typeof document !== 'undefined') {
    return ({__html: removeHtmlFileEnding(processContent(lessonContent, contentStyles))});
  }
  return;
};

const Lesson = React.createClass({
  componentDidMount() {
    const {path, checkboxes, setCheckbox, setLastLesson} = this.props;
    setCheckboxes(path, checkboxes, setCheckbox);
    rememberLastLesson(path, setLastLesson);
    renderToggleButtons();
  },
  render() {
    const {t, path, lessons, checkboxes, params, lesson} = this.props;
    const title = lesson.frontmatter.title || params.file;
    const level = lesson.frontmatter.level || 0;
    const authorName = lesson.frontmatter.author || '';
    const translatorName = lesson.frontmatter.translator || '';
    const author = authorName ?
      <p><i>{t('lessons.writtenby')} <MarkdownRenderer src={authorName} inline={true} /></i></p> :
      null;
    const translator = translatorName ?
        <p><i>{t('lessons.translatedby')} <MarkdownRenderer src={translatorName} inline={true} /></i></p> :
        null;
    const instructionButton = <LessonOrReadmeButton {...{path, lessons, t}}/>;
    const resetButton = anyCheckboxTrue(checkboxes) === true ?
      <ResetButton {...{path}}/> : null;
    return (
      <DocumentTitle title={title + ' | ' + t('title.codeclub')}>
        <div className={styles.container}>
          <h1>
            <LevelIcon {...{level}}/>
            {title}
          </h1>
          {author}
          {translator}
          {resetButton}
          {instructionButton}
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
    file: PropTypes.string.isRequired
  }).isRequired,
  lesson: PropTypes.shape({
    frontmatter: PropTypes.object,
    content: PropTypes.string
  }),

  // mapStateToProps
  t: PropTypes.func.isRequired,
  lessons: PropTypes.object.isRequired,
  checkboxes: PropTypes.object,

  // mapDispatchToProps
  setCheckbox: PropTypes.func.isRequired,
  setLastLesson: PropTypes.func.isRequired
};

const mapStateToProps = (state, {path}) => ({
  t: getTranslator(state),
  lessons: state.lessons,
  checkboxes: state.checkboxes[createCheckboxesKey(path)] || {}
});

const mapDispatchToProps = {
  setCheckbox,
  setLastLesson
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(withStyles(styles, contentStyles)(Lesson));
