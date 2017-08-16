import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import LessonFilter from '../components/Filter/LessonFilter';
import Courses from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import WelcomeBox from '../components/FrontPage/WelcomeBox';
import ClearFilterButton from '../components/Filter/ClearFilterButton';

const FrontPage = ({isStudentMode}) => {
  return (
    <Grid fluid={true}>
      {/*WelcomeBox and TeacherInfobox*/}
      {isStudentMode ? <WelcomeBox /> : <TeacherInfobox />}

      <hr/>
      {/* Filter and courses */}
      <Row>
        <Col sm={4} md={3} lg={2}>
          <LessonFilter/>
          <ClearFilterButton/>
        </Col>
        <Courses/>
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

export default connect(
  mapStateToProps
)(FrontPage);
