import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import LessonFilter from '../components/Filter/LessonFilter';
import Courses from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';

const FrontPage = () => {
  const {isStudentMode} = useSelector(state => ({
    isStudentMode: state.isStudentMode,
  }));

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of page on mount
  }, []);

  return (
    <Grid fluid={true} role='main'>
      {isStudentMode ? null : <TeacherInfobox/>}
      <Row>
        <Col sm={4} md={3} lg={2}>
          <LessonFilter/>
        </Col>
        <Courses/>
      </Row>
    </Grid>
  );
};

export default FrontPage;
