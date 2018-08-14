import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {getAvailableLanguages} from '../utils/filterUtils';
import {getCourseIcon} from '../resources/courseIcon';
import {getCourseTitle} from '../resources/courseFrontmatter';

const styles = {
  container: {
    width: '100%',
    minHeight: 50,
  },
  courseIcon: {
    height: 50,
    padding: [10, 10, 15, 15],
  },
  course: {
    fontSize: 20,
  },
};

const PdfHeader = ({classes, course, language}) => {
  const courseTitle = getCourseTitle(course, language);
  return (
    <div className={classes.container}>
      <img className={classes.courseIcon} src={getCourseIcon(course)} alt={courseTitle}/>
      <span className={classes.course}>{courseTitle}</span>
    </div>
  );
};
PdfHeader.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
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
