import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getFilteredCourses, getFilteredExternalCoursesWithLanguages} from '../../selectors/course';
import {getTranslator} from '../../selectors/translate';
import {getCoursesWithPlaylists} from '../../resources/playlists';
import CourseList from '../CourseList/CourseList';
import ExternalCourseList from '../CourseList/ExternalCourseList';

const Courses = ({t, courses, externalCourses}) => (
  <div>
    {courses.length > 0 ?
      <div>
        <h1>{t('frontpage.courses')}</h1>
        <CourseList {...{courses}}/>
      </div>
      : null}
    {externalCourses.length > 0 ?
      <div>
        <h1>{t('frontpage.otherwebsitecourses')}</h1>
        <ExternalCourseList coursesWithLanguage={externalCourses}/>
      </div>
      : null}
    {courses.length + externalCourses.length !== 0 ? null :
      <h1>{t('coursepage.nomatchinglessons')}</h1>}
  </div>
);

Courses.propTypes = {
  // mapStateToProps
  courses: PropTypes.arrayOf(PropTypes.string).isRequired,
  externalCourses: PropTypes.arrayOf(PropTypes.shape({
    course: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  })).isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  courses: state.showPlaylists ? getCoursesWithPlaylists() : getFilteredCourses(state),
  externalCourses: state.showPlaylists ? [] : getFilteredExternalCoursesWithLanguages(state),
  t: getTranslator(state),
});

export default connect(
  mapStateToProps
)(Courses);
