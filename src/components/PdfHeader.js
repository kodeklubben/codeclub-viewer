import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PdfHeader.scss';
import {getAvailableLanguages} from '../util';
import {getCourseIcon} from '../resources/courseIcon';
import {getCourseTitle} from '../resources/courseFrontmatter';

const PdfHeader = ({course, language}) => {
  return (
    <div className={styles.container}>
      <img className={styles.courseIcon} src={getCourseIcon(course)}/>
      <span className={styles.course}>{getCourseTitle(course, language)}</span>
    </div>
  );
};
PdfHeader.PropTypes = {
  // ownProps
  course: PropTypes.string.isRequired,

  // mapStateToProps
  language: PropTypes.oneOf(getAvailableLanguages()).isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(PdfHeader));
