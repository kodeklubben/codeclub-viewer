import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './Content.scss';
import {processContent} from '../../utils/processContent';
import {renderMicrobit} from '../../utils/processMicrobit';
import {getLessonContent} from '../../resources/lessonContent';
import {getLessonPath} from '../../resources/lessonFrontmatter';
import {setCheckboxesInDoc} from '../../utils/checkboxUtils';
import {setCheckbox, removeCheckbox} from '../../reducers/checkboxes';
import {getCheckboxesForLesson} from '../../selectors/checkboxes';

const Content = ({course, lesson, language, isReadme, isHydrated, checkboxes, setCheckbox, removeCheckbox}) => {
  useStyles(styles);
  useEffect(() => {
    if (isHydrated) {
      const path = getLessonPath(course, lesson, language, isReadme);
      setCheckboxesInDoc(path, checkboxes, setCheckbox, removeCheckbox);
    }
  }, [course, lesson, language, isReadme, isHydrated, checkboxes, setCheckbox, removeCheckbox]);

  useEffect(() => {
    if (course === 'microbit') { renderMicrobit(language); }
  }, [course, language]);

  const lessonContent = getLessonContent(course, lesson, language, isReadme);

  return <div dangerouslySetInnerHTML={{__html: processContent(lessonContent, styles, isHydrated)}}/>;
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
