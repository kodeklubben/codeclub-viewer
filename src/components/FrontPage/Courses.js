import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getFilteredCourses, getFilteredExternalCourses} from '../../selectors/course';
import {getTranslator} from '../../selectors/translate';
import CourseList from '../CourseList/CourseList';
import {coursesWithPlaylists} from '../../util';

const Courses = ({t, courses, externalCourses, showPlaylists}) => {
  const coursesLength = Object.keys(courses).length;
  const externalCoursesLength = Object.keys(externalCourses).length;
  return (
    <div>
      {coursesLength > 0 ?
        <div>
          <h2><b>{t('frontpage.courses')}</b></h2>
          <CourseList courses={showPlaylists ? coursesWithPlaylists(courses) : courses}/>
        </div>
        : null}
      {externalCoursesLength > 0 && !showPlaylists ?
        <div>
          <h2><b>{t('frontpage.otherwebsitecourses')}</b></h2>
          <CourseList courses={externalCourses}/>
        </div>
        : null}
      {coursesLength + externalCoursesLength !== 0 ? null :
        <h2><b>{t('playlist.nomatchinglessons')}</b></h2>}
    </div>
  );
};

Courses.propTypes = {
  // mapStateToProps
  courses: PropTypes.object.isRequired,
  externalCourses: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  showPlaylists: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  courses: getFilteredCourses(state),
  externalCourses: getFilteredExternalCourses(state),
  t: getTranslator(state),
  showPlaylists: state.showPlaylists,
});

export default connect(
  mapStateToProps
)(Courses);
