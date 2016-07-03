import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import LessonFilter from '../components/Filter/LessonFilter';
import LessonList from '../components/LessonList/LessonList';
import LevelNavigation from '../components/LessonList/LevelNavigation';
import PlaylistNavigation from '../components/Playlist/PlaylistNavigation';
import {getFilteredCourses} from '../selectors/course';
import * as actionCreators from '../action_creators';
import {capitalize} from '../util';
import {
  Button,
  Col,
  Collapse,
  Grid,
  Row
} from 'react-bootstrap';

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
      <Grid fluid={true}>

        {/*Header*/}
        <Row>
          <Col xs={12} sm={9} md={10} lg={9} smOffset={3} mdOffset={2} lgOffset={3}>
            <h1>{capitalize(this.props.params.course)} Oppgaver &nbsp;
              <Button bsSize="large">Start her!</Button>
            </h1>
          </Col>
        </Row>

        {/*Mobile buttons to show/hide components*/}
        <Row>
          <Col xs={12} smHidden mdHidden lgHidden>
            <Button onClick={() => this.setState({showMobileFilter: !this.state.showMobileFilter})}>Vis/skjul filter
            </Button>

            <Button onClick={() => this.setState({showMobilePlaylists: !this.state.showMobilePlaylists})}>Vis/skjul
              oppgavesamlinger
            </Button>

            {showLevelNavigationMobile ?
              <Button onClick={() => this.setState({showMobileLevelNavigation: !this.state.showMobileLevelNavigation})}>
                Oppgavenavigasjon
              </Button> : null}
          </Col>
        </Row>

        {/*Filter*/}
        <Row>
          {/*Filter desktop*/}
          <Col sm={3} md={2} xsHidden>
            <LessonFilter {...this.props}/>
          </Col>

          {/*Filter mobile*/}
          <Col xs={12} smHidden mdHidden lgHidden>
            <Collapse in={this.state.showMobileFilter}>
              <div>
                <LessonFilter {...this.props}/>
              </div>
            </Collapse>
          </Col>

          <Col xs={12} smHidden mdHidden lgHidden>
            {/*Level navigation mobile*/}
            <Collapse in={this.state.showMobileLevelNavigation}>
              <div>
                {showLevelNavigationDesktop ? <LevelNavigation levels={levels}/> : null}
              </div>
            </Collapse>

            {/*Playlists mobile*/}
            <Collapse in={this.state.showMobilePlaylists}>
              <div>
                <PlaylistNavigation playlists={course.playlists}/>
              </div>
            </Collapse>
          </Col>

          {/*List of lessons grouped by level*/}
          <Col xs={12} sm={6} lg={5} lgOffset={1}>
            {lessonLists.length ? lessonLists : 'Ingen oppgaver passer til filteret'}
          </Col>

          <Col sm={3} mdOffset={1} lgOffset={1}>
            {/*Desktop level navigation*/}
            {(course.lessons || []).length > 15 && levels.length > 1 ? <LevelNavigation levels={levels}/> : null}

            {/*Desktop playlists*/}
            <PlaylistNavigation playlists={course.playlists}/>
          </Col>

        </Row>
      </Grid>
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
