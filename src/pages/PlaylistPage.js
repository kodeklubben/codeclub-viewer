import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PlaylistPage.scss';

import {getFilteredAndIndexedLessons} from '../selectors/lesson';
import {getPlaylists} from '../selectors/playlist';

import Filter from '../components/FrontPage/Filter';
import LessonList from '../components/PlaylistPage/LessonList';
import LevelNavigation from '../components/PlaylistPage/LevelNavigation';
import PlaylistNavigation from '../components/PlaylistPage/PlaylistNavigation';
import HeadRow from '../components/PlaylistPage/HeadRow';

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
    const showLevelNavigationDesktop = Object.keys(lessons).length > 15 && levels.length > 1;
    return (
      <Grid fluid={true}>

        {/*Title with course name*/}
        <HeadRow courseName={this.props.params.course}/>

        <Row>
          {/*Filter desktop*/}
          <Col xsHidden>
            <Col sm={3}>
              <div className={styles.filter}>
                <Filter isStudentMode={this.props.isStudentMode}/>
              </div>
            </Col>


            <Col sm={6}>
              {/*Desktop playlists*/}
              <PlaylistNavigation playlists={playlists}/>
              {/*List of lessons grouped by level*/}
              {lessonLists.length ? lessonLists : 'Ingen oppgaver passer til filteret'}
            </Col>

            <Col sm={3}>
              <div className={styles.scrollable}>
                {/*Desktop level navigation*/}
                {showLevelNavigationDesktop ? <LevelNavigation levels={levels}/> : null}
              </div>
            </Col>
          </Col>

          {/*Filter mobile*/}
          <Col smHidden mdHidden lgHidden>
            <Col xs={12}>
              <div className={styles.filter}>
                <Filter isStudentMode={this.props.isStudentMode}/>
              </div>
            </Col>

            <Col xs={12}>
              <div className={styles.scrollable}>
                {showLevelNavigationDesktop ? <LevelNavigation levels={levels}/> : null}
              </div>
            </Col>

            <Col xs={12}>
              <PlaylistNavigation playlists={playlists}/>
              {/*List of lessons grouped by level*/}
              {lessonLists.length ? lessonLists : 'Ingen oppgaver passer til filteret'}
            </Col>

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
  }),
  isStudentMode: PropTypes.bool
};

function mapStateToProps(state, props) {
  return {
    isStudentMode: state.isStudentMode,
    filteredAndIndexedLessons: getFilteredAndIndexedLessons(state, props.params.course),
    filteredPlaylists: getPlaylists(state, props.params.course),
    isStudentMode: state.isStudentMode
  };
}

export const PlaylistPageContainer = connect(
  mapStateToProps
)(withStyles(styles)(PlaylistPage));
