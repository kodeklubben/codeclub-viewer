import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {LessonFilterContainer} from '../components/Filter/LessonFilter';
import LessonList from '../components/LessonList/LessonList';
import LevelNavigation from '../components/LessonList/LevelNavigation';
import PlaylistNavigation from '../components/Playlist/PlaylistNavigation';
import {getFilteredAndIndexedLessons} from '../selectors/lesson';
import {getPlaylists} from '../selectors/playlist';
import HeadRow from '../components/PlaylistPage/HeadRow';
import MobileComponents from '../components/PlaylistPage/MobileComponents';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

export const PlaylistPage = React.createClass({
  getLessonsByLevel(lessons) {
    if (lessons == null) return {};

    // Get lessons grouped by level
    return Object.keys(lessons).reduce((res, lessonId) => {
      const lesson = lessons[lessonId];
      const level = lesson.level;

      // Ignore lessons without level
      if (level != null) {
        if (res.hasOwnProperty(level)) res[level].push(lesson);
        else res[level] = [lesson];
      }

      return res;
    }, {});
  },
  render() {
    const lessons = this.props.filteredAndIndexedLessons;
    const playlists = this.props.filteredPlaylists;
    const lessonsIndexedByLevel = this.getLessonsByLevel(lessons);
    const levels = Object.keys(lessonsIndexedByLevel);
    const lessonLists = levels.map((level, idx) => (
      <div key={idx} className='col-xs-12'>
        <LessonList id={'level-' + level} level={level} lessons={lessonsIndexedByLevel[level]}/>
      </div>
    ));
    const showLevelNavigationMobile = Object.keys(lessons).length > 10 && levels.length > 1;
    const showLevelNavigationDesktop = Object.keys(lessons).length > 15 && levels.length > 1;
    return (
      <Grid fluid={true}>

        {/*Title with course name*/}
        <HeadRow courseName={this.props.params.course}/>
        
        {/*Components only visible on mobile that can be toggled hidden/visible*/}
        <MobileComponents {...this.props} 
          playlists={playlists} levels={levels} showLevelNavigation={showLevelNavigationMobile}/>

        <Row>
          {/*Filter desktop*/}
          <Col sm={3} lg={2} xsHidden>
            <LessonFilterContainer/>
          </Col>

          {/*List of lessons grouped by level*/}
          <Col xs={12} sm={6} lg={5} lgOffset={1}>
            {lessonLists.length ? lessonLists : 'Ingen oppgaver passer til filteret'}
          </Col>

          <Col sm={3} lgOffset={1} xsHidden>
            {/*Desktop level navigation*/}
            {showLevelNavigationDesktop ? <LevelNavigation levels={levels}/> : null}

            {/*Desktop playlists*/}
            <PlaylistNavigation playlists={playlists}/>
          </Col>

        </Row>
      </Grid>
    );
  }
});

PlaylistPage.propTypes = {
  filteredPlaylists: PropTypes.object,
  filteredAndIndexedLessons: PropTypes.object,
  params: PropTypes.shape({
    course: PropTypes.string.isRequired
  })
};

function mapStateToProps(state, props) {
  return {
    filteredAndIndexedLessons: getFilteredAndIndexedLessons(state, props.params.course),
    filteredPlaylists: getPlaylists(state, props.params.course)
  };
}

export const PlaylistPageContainer = connect(
  mapStateToProps
)(PlaylistPage);
