// import React, {PropTypes} from 'react';
// import Lesson from '../components/Lesson';
//
// // Get all ./*/*/*.md under lessonSrc, e.g. ./scratch/straffespark/straffespark.md
// const lessonContext = require.context('frontAndContent!lessonSrc/', true, /^\.\/[^\/]*\/[^\/]*\/[^\/]*\.md/);
//
// const LessonPage = React.createClass({
//   render() {
//     //console.log(this.props.lesson.frontmatter);
//     const params = this.props.params;
//     const lessonPath = lessonContext.keys().find(path => {
//       const regexp = new RegExp(`\.\/${params.course}\/${params.lesson}`);
//       return regexp.exec(path);
//     });
//     const lesson = lessonContext(lessonPath);
//     return (
//       <Lesson lesson={lesson}/>
//     );
//   }
// });
//
// LessonPage.PropTypes = {
//   params: PropTypes.shape({
//     course: PropTypes.string.isRequired,
//     lesson: PropTypes.string.isRequired
//   })
// };
//
// export default LessonPage;
