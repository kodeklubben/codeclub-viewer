import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LessonFilter from '../components/Filter/LessonFilter';
import LessonList from '../components/LessonList/LessonList';
import LevelNavigation from '../components/LessonList/LevelNavigation';
import PlaylistNavigation from '../components/Playlist/PlaylistNavigation';
import {getFilteredCourses} from '../selectors/course';
import * as actionCreators from '../action_creators';
import {capitalize} from '../util';


export const PlaylistPage = React.createClass({
  getInitialState() {
    return {
      showMobileFilter: false,
      showMobilePlaylists: false,
      showMobileLevelNavigation: false
    };
  },
  getCourse() {
    const courses = this.props.courses;
    const courseName = this.props.params.course.toLowerCase();
    return courses[courseName] || {};
  },
  getLessons(course) {
    const lessons = course.lessons;
    if (lessons == null) return {};

    // Get lessons sorted by level
    return Object.keys(lessons).reduce((res, lessonId) => {
      const lesson = lessons[lessonId];
      const level = lesson.level;

      // Check if lesson matches filter and belongs to this course
      if (level != null) {
        if (res.hasOwnProperty(level)) res[level].push(lesson);
        else res[level] = [lesson];
      }

      return res;
    }, {});
  },
  render() {
    const course = this.getCourse();
    const lessons = this.getLessons(course);
    const levels = Object.keys(lessons);
    const lessonLists = Object.keys(lessons).map((level, idx) => (
      <div key={idx} className='col-xs-12'>
        <LessonList id={'level-' + level} level={level} lessons={lessons[level]}/>
      </div>
    ));
    const showLevelNavigationMobile = (course.lessons || []).length > 10 && levels.length > 1;
    const showLevelNavigationDesktop = (course.lessons || []).length > 15 && levels.length > 1;
    return (
      <div className='container-fluid'>

        {/*Header*/}
        <div className='row'>
          <div className='col-xs-12 col-sm-9 col-md-10 col-lg-9 col-sm-offset-3 col-md-offset-2 col-lg-offset-3'>
            <h1>{capitalize(this.props.params.course)} Oppgaver &nbsp;
              <button>Start her!</button>
            </h1>
          </div>
        </div>

        {/*Mobile buttons to show/hide components*/}
        <div className='row visible-xs'>
          <div className='col-xs-12'>
            <button onClick={() => this.setState({showMobileFilter: !this.state.showMobileFilter})}>Vis/skjul filter
            </button>

            <button onClick={() => this.setState({showMobilePlaylists: !this.state.showMobilePlaylists})}>Vis/skjul
              oppgavesamlinger
            </button>

            {showLevelNavigationMobile ?
              <button onClick={() => this.setState({showMobileLevelNavigation: !this.state.showMobileLevelNavigation})}>
                Oppgavenavigasjon
              </button> : null}
          </div>
        </div>

        {/*Filter*/}
        <div className='row'>
          <div className='col-xs-12 col-sm-3 col-md-2 col-lg-2'>
            {/*Filter desktop*/}
            <div className='hidden-xs'>
              <LessonFilter {...this.props}/>
            </div>
            
            {/*Filter mobile*/}
            <div className='visible-xs'>
              <div style={this.state.showMobileFilter ? null : {display: 'none'}}>
                <LessonFilter {...this.props}/>
              </div>
            </div>
          </div>

          <div className='visible-xs col-xs-12'>
            {/*Level navigation mobile*/}
            <div style={this.state.showMobileLevelNavigation ? null : {display: 'none'}}>
              {showLevelNavigationDesktop ? <LevelNavigation levels={levels}/> : null}
            </div>
            
            {/*Playlists mobile*/}
            <div className='clearfix' style={this.state.showMobilePlaylists ? null : {display: 'none'}}>
              <PlaylistNavigation playlists={course.playlists}/>
            </div>
          </div>

          {/*List of lessons grouped by level*/}
          <div className='col-xs-12 col-sm-6 col-md-6 col-lg-5 col-lg-offset-1'>
            {lessonLists.length ? lessonLists : 'Ingen oppgaver passer til filteret'}
          </div>

          <div className='hidden-xs col-sm-3 col-md-3 col-md-offset-1 col-lg-3 col-lg-offset-1'>
            {/*Desktop level navigation*/}
            {(course.lessons || []).length > 15 && levels.length > 1 ? <LevelNavigation levels={levels}/> : null}
            
            {/*Desktop playlists*/}
            <div className='clearfix'>
              <PlaylistNavigation playlists={course.playlists}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
});

PlaylistPage.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string.isRequired
  })
};

function mapStateToProps(state) {
  return {
    courses: getFilteredCourses(state),
    filter: state.filter
  };
}

export const PlaylistPageContainer = connect(
  mapStateToProps,
  actionCreators
)(PlaylistPage);
