import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './Content.scss';
import {processContent} from '../../utils/processContent';
import {renderMicrobit} from '../../utils/renderMicrobit';
import {getLessonContent} from '../../resources/lessonContent';
import {getLessonPath} from '../../resources/lessonFrontmatter';
import {setCheckboxesInDoc} from '../../utils/checkboxUtils';
import {setCheckbox, removeCheckbox} from '../../reducers/checkboxes';
import {getCheckboxesForLesson} from '../../selectors/checkboxes';
import {renderScratchBlocks} from '../../utils/renderScratchblocks';
import {renderToggleButtons} from '../../utils/renderToggleButtons';

const Content = ({course, lesson, language, isReadme, isHydrated, checkboxes, setCheckbox, removeCheckbox}) => {
  useStyles(styles);
  
  useEffect(() => {
    renderToggleButtons();
  }, []);

  // NOTE: Should setCheckboxesInDoc really be in an effect?
  //       Wouldn't it be better to change it so that it processes lessonContent before rendering?
  useEffect(() => {
    if (isHydrated) {
      const path = getLessonPath(course, lesson, language, isReadme);
      setCheckboxesInDoc(path, checkboxes, setCheckbox, removeCheckbox);
    }
  }, [isHydrated, course, lesson, language, isReadme, checkboxes, setCheckbox, removeCheckbox]);

  useEffect(() => {
    if (course === 'microbit' && typeof document !== 'undefined' && isHydrated) {
      renderMicrobit(language);
    }
  }, [course, isHydrated, language]);
  
  let lessonContent = getLessonContent(course, lesson, language, isReadme);
  lessonContent = processContent(lessonContent, styles);
  if (course === 'scratch' && typeof document !== 'undefined' && isHydrated) {
    lessonContent = renderScratchBlocks(lessonContent, styles);
  }
  return <div dangerouslySetInnerHTML={{__html: lessonContent}}/>;
};

Content.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,

  // mapStateToProps
  isHydrated: PropTypes.bool.isRequired, // require isHydrated as a prop to force rerender when it changes
  checkboxes: PropTypes.object,

  // mapDispatchToProps
  setCheckbox: PropTypes.func.isRequired,
  removeCheckbox: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {course, lesson, language, isReadme}) => ({
  isHydrated: state.hydration,
  checkboxes: getCheckboxesForLesson(state, course, lesson, language, isReadme),
});

const mapDispatchToProps = {
  setCheckbox,
  removeCheckbox,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
