import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory, matchPath} from 'react-router-dom';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PdfHeader.scss';
import {getCourseIcon} from '../resources/courseIcon';
import {getCourseTitle} from '../resources/courseFrontmatter';

const PdfHeader = () => {
  useStyles(styles);

  const {language} = useSelector(state => ({
    language: state.language,
  }));
  
  const history = useHistory();
  const match = matchPath(history.location.pathname, {path: '/:course'});
  const {course} = match != null ? match.params : '';
  const courseTitle = getCourseTitle(course, language);
  return (
    <div className={styles.container}>
      <img className={styles.courseIcon} src={getCourseIcon(course)} alt={courseTitle}/>
      <span className={styles.course}>{courseTitle}</span>
    </div>
  );
};

export default PdfHeader;
