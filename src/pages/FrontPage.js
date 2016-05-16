import React from 'react';
//import LessonPage from './LessonPage';
import CourseList from '../components/CourseList';

//const lessonContext = require.context('lessonSrc/', true, /^\.\/.*\.md/);
// console.log(lessonContext.keys());

const FrontPage = React.createClass({
  render() {
    //const scratchPage = lessonContext('./scratch/straffespark/straffespark.md');
    return (
      <div>
        <CourseList/>
        {/*<LessonPage lesson={scratchPage}/>*/}
      </div>
    );
  }
});

export default FrontPage;
