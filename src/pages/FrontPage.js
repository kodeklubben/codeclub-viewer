import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import LessonFilter from '../components/Filter/LessonFilter';
import {CoursesContainer} from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import WelcomeBox from '../components/FrontPage/WelcomeBox';

export const  FrontPage = ({isStudentMode}) => {
  return (
    <Grid fluid={true}>
      {/*WelcomeBox and TeacherInfobox*/}
      {isStudentMode ? <WelcomeBox /> : <TeacherInfobox />}

      <hr/>
      {/* Filter and courses */}
      <Row>
        <Col sm={4} md={3} lg={2}>
          <LessonFilter/>
        </Col>
        <CoursesContainer/>
      </Row>
    </Grid>
  );
};

FrontPage.propTypes = {
  // mapStateToProps
  isStudentMode: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isStudentMode: state.isStudentMode
});

export const FrontPageContainer = connect(
  mapStateToProps
)(FrontPage);
