import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PdfHeader.scss';
import {getCourseIcon} from '../resources/courseIcon';
import {getCourseTitle} from '../resources/courseFrontmatter';

const PdfHeader = () => {
  useStyles(styles);

  const language = useSelector(state => state.language);

  const {course} = useParams();

  const courseTitle = getCourseTitle(course, language);
  return (
    <div className={styles.container}>
      <img className={styles.courseIcon} src={getCourseIcon(course)} alt={courseTitle}/>
      <span className={styles.course}>{courseTitle}</span>
    </div>
  );
};

export default PdfHeader;
