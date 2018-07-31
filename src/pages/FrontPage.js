import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import LessonFilter from '../components/Filter/LessonFilter';
import Courses from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';
import StartButton from '../components/FrontPage/StartButton';

const FrontPage = ({isStudentMode}) => {
  return (
    <Grid fluid={true} role='main'>
      {isStudentMode ? <StartButton /> : <TeacherInfobox />}
      <hr/>
      <Row>
        <Col sm={4} md={3} lg={2}>
          <LessonFilter/>
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
