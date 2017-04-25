import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PlaylistPage.scss';

import {getFilteredAndIndexedLessons} from '../selectors/lesson';
import {getPlaylists} from '../selectors/playlist';

import {LessonFilterContainer} from '../components/Filter/LessonFilter';
import LessonList from '../components/PlaylistPage/LessonList';
import LevelNavigation from '../components/PlaylistPage/LevelNavigation';
import PlaylistNavigation from '../components/PlaylistPage/PlaylistNavigation';
import HeadRow from '../components/PlaylistPage/HeadRow';
import MobileComponents from '../components/PlaylistPage/MobileComponents';
import CourseInfo from '../components/PlaylistPage/CourseInfo';

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

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
  getInitialState() {
    return {
      showCourseInfo: false
    };
  },
  changeState() {
    this.setState({['showCourseInfo']: !this.state['showCourseInfo']});
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

        {/*Title with course name and course info button*/}
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className={styles.headerRow}>
              <HeadRow courseName={this.props.params.course}/>
              <Button bsStyle="guide" className={styles.courseInfoBtn} onClick={() => this.changeState()}>
                <Glyphicon className={styles.glyph} glyph={!this.state.showCourseInfo ? 'plus-sign' : 'minus-sign'}/>
                Informasjon om kurset</Button>
            </div>
          </Col>
        </Row>  

        <Row>
          {/*Filter desktop*/}
          <Col xsHidden sm={3}>
            <div className={styles.filter}>
              <LessonFilterContainer/>
            </div>
          </Col>

          {/*Show both CourseInfo and Playlist if showCourseInfo is clicked*/}
          {this.state.showCourseInfo ?
            <Col xs={12} sm={6}>
              {/*Course Info*/}            
              <Collapse in={this.state.showCourseInfo}>
                <CourseInfo courseName={this.props.params.course} isStudentMode={this.props.isStudentMode}/>
              </Collapse>

              {/*Components only visible on mobile that can be toggled hidden/visible*/}
              <MobileComponents levels={levels} showLevelNavigation={showLevelNavigationMobile}/>

              {/*Desktop playlists*/}
              <PlaylistNavigation playlists={playlists}/>
              {/*List of lessons grouped by level*/}
              {lessonLists.length ? lessonLists : 'Ingen oppgaver passer til filteret'}
            </Col>           
            :
            <Col xs={12} sm={6}>

              {/*Components only visible on mobile that can be toggled hidden/visible*/}
              <MobileComponents levels={levels} showLevelNavigation={showLevelNavigationMobile}/>

              {/*Desktop playlists*/}
              <PlaylistNavigation playlists={playlists}/>
              {/*List of lessons grouped by level*/}
              {lessonLists.length ? lessonLists : 'Ingen oppgaver passer til filteret'}
            </Col>         
          }

          {/*Level Navigation*/}
          <Col xsHidden sm={3}>
            <div className={styles.scrollable}>
              {/*Desktop level navigation*/}
              {showLevelNavigationDesktop ? <LevelNavigation levels={levels}/> : null}
            </div>
          </Col>

        </Row>
      </Grid>
    );
  }
});

PlaylistPage.propTypes = {
  isStudentMode: PropTypes.bool,
  filteredPlaylists: PropTypes.object,
  filteredAndIndexedLessons: PropTypes.object,
  params: PropTypes.shape({
    course: PropTypes.string.isRequired
  })
};

function mapStateToProps(state, props) {
  return {
    isStudentMode: state.isStudentMode,
    filteredAndIndexedLessons: getFilteredAndIndexedLessons(state, props.params.course),
    filteredPlaylists: getPlaylists(state, props.params.course)
  };
}

export const PlaylistPageContainer = connect(
  mapStateToProps
)(withStyles(styles)(PlaylistPage));
