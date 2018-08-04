import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LessonFilter from '../components/Filter/LessonFilter';
import Courses from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import StartButton from '../components/FrontPage/StartButton';

const styles = {
  container: {
    paddingLeft: '15px',
    paddingRight: '15px',
  },
};

const FrontPage = ({classes, isStudentMode}) => (
  <div className={classes.container}>
    {isStudentMode ? <StartButton /> : <TeacherInfobox />}
    <hr/>
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
