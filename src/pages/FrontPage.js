import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FrontPage.scss';
import Grid from '@material-ui/core/Grid';
import LessonFilter from '../components/Filter/LessonFilter';
import Courses from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import StartButton from '../components/FrontPage/StartButton';

const FrontPage = ({isStudentMode}) => {
  return (
    <div className={styles.container}>
      {isStudentMode ? <StartButton /> : <TeacherInfobox />}
      <hr/>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4} lg={2}><LessonFilter/></Grid>
        <Grid item xs={12} sm={8} lg={10}><Courses/></Grid>
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
)(withStyles(styles)(FrontPage));
