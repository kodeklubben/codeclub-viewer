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
import {capitalize, setCheckboxes, createCheckboxesKey} from '../util';
import {getNumberOfCheckedCheckboxes, getTotalNumberOfCheckboxes} from '../selectors/checkboxes';
import {setCheckbox} from '../reducers/checkboxes';
import {setLastLesson} from '../reducers/lastLesson';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Progress from '../components/LessonPage/Progress';
import ButtonRow from '../components/LessonPage/ButtonRow';
import Content from '../components/LessonPage/Content';
import {getLessonFrontmatter} from '../resources/lessonFrontmatter';
import {getLessonTags} from '../resources/lessonData';

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
      course, lesson, language, isReadme,
      t, translateTag, translateGroup,
      title, level, author, translator, tags,
      checkedCheckboxes, totalCheckboxes,
    } = this.props;
    const authorNode = author ?
      <p><i>{t('lessons.writtenby')} <MarkdownRenderer src={author} inline={true} /></i></p> : null;
    const translatorNode = translator ? <p><i>{t('lessons.translatedby')} {translator}</i></p> : null;
    const progress = (checkedCheckboxes > 0 && !isReadme) ?
      <Progress {...{checkedCheckboxes, totalCheckboxes}}/> : null;
    return (
      <DocumentTitle title={title + ' | ' + t('title.codeclub')}>
        <div className={styles.container}>
          <h1>
            <LevelIcon {...{level}}/>
            {title}
          </h1>
          {authorNode}
          {translatorNode}
          <PrintInfo {...{t, translateTag, translateGroup, course, tags}}/>
          <ButtonRow {...{course, lesson, language, isReadme}}/>
          {progress}
          <Content {...{course, lesson, language, isReadme}}/>
          <Row>
            <ImprovePage {...{course, lesson, language, isReadme}}/>
          </Row>
        </div>
      </DocumentTitle>
    );
  }
}

LessonPage.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  translateTag: PropTypes.func.isRequired,
  translateGroup: PropTypes.func.isRequired,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  translator: PropTypes.string.isRequired,
  tags: PropTypes.object.isRequired,
  checkboxes: PropTypes.object,
  checkedCheckboxes: PropTypes.number.isRequired,
  totalCheckboxes: PropTypes.number.isRequired,

  // mapDispatchToProps
  setCheckbox: PropTypes.func.isRequired,
  setLastLesson: PropTypes.func.isRequired
};

const mapStateToProps = (state, {course, lesson, language, isReadme}) => {
  const {path, title, level, author, translator} = getLessonFrontmatter(course, lesson, language, isReadme);
  return {
    t: getTranslator(state),
    translateTag: getTranslateTag(state),
    translateGroup: getTranslateGroup(state),
    title,
    level,
    author,
    translator,
    tags: getLessonTags(course, lesson),
    checkboxes: state.checkboxes[createCheckboxesKey(path)] || {},
    checkedCheckboxes: getNumberOfCheckedCheckboxes(state, createCheckboxesKey(path)),
    totalCheckboxes: getTotalNumberOfCheckboxes(state, createCheckboxesKey(path)),
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
