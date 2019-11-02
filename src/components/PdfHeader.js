import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PdfHeader.scss';
import {getCourseIcon} from '../resources/courseIcon';
import {getCourseTitle} from '../resources/courseFrontmatter';

const PdfHeader = ({course}) => {
  useStyles(styles);

  const language = useSelector(state => state.language);
  
  const courseTitle = getCourseTitle(course, language);
  return (
    <div className={styles.container}>
      <img className={styles.courseIcon} src={getCourseIcon(course)} alt={courseTitle}/>
      <span className={styles.course}>{courseTitle}</span>
    </div>
  );
};
PdfHeader.propTypes = {
  course: PropTypes.string.isRequired,
};

export default PdfHeader;
