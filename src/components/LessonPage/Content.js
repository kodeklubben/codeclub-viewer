import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {processContent} from '../../utils/processContent';
import {renderMicrobit} from '../../utils/renderMicrobit';
import {getLessonContent} from '../../resources/lessonContent';
import {getLessonPath} from '../../resources/lessonFrontmatter';
import {setCheckboxesInDoc} from '../../utils/checkboxUtils';
import {getCheckboxesForLesson} from '../../selectors/checkboxes';
import {renderScratchBlocks} from '../../utils/renderScratchblocks';
import {renderToggleButtons} from '../../utils/renderToggleButtons';
import {useStyles} from './contentStyling';

const Content = ({course, lesson, language, isReadme}) => {
  const styles = useStyles();

  const isHydrated = useSelector(state => state.hydration);
  const checkboxes = useSelector(state => getCheckboxesForLesson(state, course, lesson, language, isReadme));
  
  React.useEffect(() => {
    renderToggleButtons();
  }, []);

  // NOTE: Should setCheckboxesInDoc really be in an effect?
  //       Wouldn't it be better to change it so that it processes lessonContent before rendering?
  React.useEffect(() => {
    if (isHydrated) {
      const path = getLessonPath(course, lesson, language, isReadme);
      setCheckboxesInDoc(path, checkboxes);
    }
  }, [isHydrated, course, lesson, language, isReadme, checkboxes]);

  React.useEffect(() => {
    if (course === 'microbit' && typeof document !== 'undefined' && isHydrated) {
      renderMicrobit(language);
    }
  }, [course, isHydrated, language]);
  
  let lessonContent = getLessonContent(course, lesson, language, isReadme);
  lessonContent = processContent(lessonContent, styles);
  if (course === 'scratch' && typeof document !== 'undefined' && isHydrated) {
    lessonContent = renderScratchBlocks(lessonContent, styles);
  }
  return <div className={styles.lessonContent} dangerouslySetInnerHTML={{__html: lessonContent}}/>;
};

Content.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default Content;
