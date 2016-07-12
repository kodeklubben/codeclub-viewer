import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import styles from './FrontPage.scss';
import Filter from '../components/FrontPage/Filter';
import Courses from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import ButtonItem from '../components/ButtonItem';
import {changeMode} from '../action_creators';
import {getFilteredCourses, getFilteredExternalCourses} from '../selectors/course';

export const  FrontPage = React.createClass({

  render() {

    return (
      <Grid fluid={true}>
        {/* Front page title */}
        <Row>
          <div className={styles.title}>
            <span className={styles.t1}>kode</span><span className={styles.t2}>klubben_</span>
          </div>
        </Row>

        {/* Buttons */}
        <Row>
          <div className={styles.center}>
            <ButtonItem color='green' onClick={() => this.displayExercise}>
              Kom i gang!
            </ButtonItem>
            <ButtonItem color='blue' onClick={() => this.props.changeMode()}>
              Lærer/Veileder
            </ButtonItem>
          </div>
        </Row>

        {/* Teacher infobox */}
        <Row>
          <TeacherInfobox isStudentMode={this.props.isStudentMode}/>
        </Row>

        {/* Filter and courses */}
        <Row>
          <Filter courses={this.props.courses} externalCourses={this.props.externalCourses}/>
          <Courses courses={this.props.courses} externalCourses={this.props.externalCourses}/>
        </Row>
      </Grid>
    );
  }
});

FrontPage.propTypes = {
  courses: PropTypes.object,
  externalCourses: PropTypes.object
};

function mapStateToProps(state) {
  return {
    courses: getFilteredCourses(state),
    isStudentMode: state.isStudentMode,
    externalCourses: getFilteredExternalCourses(state)
  };
}

export const FrontPageContainer = connect(
  mapStateToProps,
  {
    changeMode
  }
)(withStyles(styles)(FrontPage));
