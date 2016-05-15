import React from 'react';
import LessonPage from './LessonPage';
import CoursePage from './CoursePage';
import CourseList from '../components/CourseList';

const lessonContext = require.context('lessonSrc/', true, /^\.\/.*\.md/);
//  console.log(lessonContext.keys());

const FrontPage = React.createClass({
  render() {
    const scratchPage = lessonContext('./scratch/straffespark/straffespark.md');
    return (
      <div>
        <CourseList/>
        <CoursePage/>
        <LessonPage lesson={scratchPage}/>
      </div>
    );
  }
});

export default FrontPage;
