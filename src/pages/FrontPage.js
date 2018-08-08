import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LessonFilter from '../components/Filter/LessonFilter';
import Courses from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';

const styles = theme => ({
  container: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
});

const FrontPage = ({classes, isStudentMode}) => (
  <div className={classes.container} role='main'>
    <Grid container justify='center'>
      {isStudentMode ? null : <TeacherInfobox />}
    </Grid>
    <Grid container spacing={40}>
      <Grid item xs={12} sm={4} lg={2}><LessonFilter/></Grid>
      <Grid item xs={12} sm={8} lg={10}><Courses/></Grid>
    </Grid>
  </div>
);

FrontPage.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,

  // mapStateToProps
  isStudentMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode,
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(FrontPage));
