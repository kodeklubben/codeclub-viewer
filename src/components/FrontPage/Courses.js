import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {getFilteredCourses, getFilteredExternalCoursesWithLanguages} from '../../selectors/course';
import {getTranslator} from '../../selectors/translate';
import {getCoursesWithPlaylists} from '../../resources/playlists';
import CourseList from '../CourseList/CourseList';
import ExternalCourseList from '../CourseList/ExternalCourseList';

const Courses = ({t, courses, externalCourses}) => (
  <div>
    {courses.length > 0 ?
      <div>
        <Typography variant='headline'>{t('frontpage.courses')}</Typography>
        <CourseList {...{courses}}/>
      </div>
      : null}
    {externalCourses.length > 0 ?
      <div>
        <Typography variant='headline'>{t('frontpage.otherwebsitecourses')}</Typography>
        <ExternalCourseList coursesWithLanguage={externalCourses}/>
      </div>
      : null}
    {courses.length + externalCourses.length !== 0 ? null :
      <Typography variant='headline'>{t('coursepage.nomatchinglessons')}</Typography>}
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
