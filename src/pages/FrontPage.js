import React from 'react';
import {useSelector} from 'react-redux';
import {Grid, Container} from '@material-ui/core';
import LessonFilter from '../components/Filter/LessonFilter';
import Courses from '../components/FrontPage/Courses';
import TeacherInfobox from '../components/FrontPage/TeacherInfobox';

const FrontPage = () => {
  const isStudentMode = useSelector(state => state.isStudentMode);

  return (
    <Container>
      <Grid container justify='center'>
        {isStudentMode ? null : <TeacherInfobox/>}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <LessonFilter/>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Courses/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FrontPage;
