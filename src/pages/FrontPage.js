import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import LessonFilter from '../components/Filter/LessonFilter';
import Courses from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import StartButton from '../components/FrontPage/StartButton';

const FrontPage = ({isStudentMode}) => {
  return (
    <div>
      {isStudentMode ? <StartButton /> : <TeacherInfobox />}
      <hr/>
      <Grid container justify='center'>
        <Grid item xs={12} sm={3} lg={2} xl={1}><LessonFilter/></Grid>
        <Grid item xs={12} sm={9} lg={10} xl={11}><Courses/></Grid>
      </Grid>
    </div>
  );
};

FrontPage.propTypes = {
  // mapStateToProps
  isStudentMode: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode
});

export default connect(
  mapStateToProps
)(FrontPage);
