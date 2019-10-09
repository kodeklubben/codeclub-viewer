import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PdfHeader.scss';
import {getAvailableLanguages} from '../utils/filterUtils';
import {getCourseIcon} from '../resources/courseIcon';
import {getCourseTitle} from '../resources/courseFrontmatter';

const PdfHeader = ({language}) => {
  useStyles(styles);
  const {course} = useParams();
  const courseTitle = getCourseTitle(course, language);
  return (
    <div className={styles.container}>
      <img className={styles.courseIcon} src={getCourseIcon(course)} alt={courseTitle}/>
      <span className={styles.course}>{courseTitle}</span>
    </div>
  );
};
PdfHeader.propTypes = {
  // mapStateToProps
  language: PropTypes.oneOf(getAvailableLanguages()).isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(PdfHeader);
