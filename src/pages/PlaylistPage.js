import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';

import styles from './PlaylistPage.scss';

import {getFilteredAndIndexedLessons, getLessonsByLevel} from '../selectors/lesson';
import {getTranslator} from '../selectors/translate';
import {getPlaylists} from '../selectors/playlist';
import {capitalize} from '../util';

import Filter from '../components/FrontPage/Filter';
import LessonList from '../components/PlaylistPage/LessonList';
import LevelNavigation from '../components/PlaylistPage/LevelNavigation';
import PlaylistNavigation from '../components/PlaylistPage/PlaylistNavigation';
import HeadRow from '../components/PlaylistPage/HeadRow';
import CourseInfo from '../components/PlaylistPage/CourseInfo';

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Collapse from 'react-bootstrap/lib/Collapse';

export const PlaylistPage = React.createClass({
  getInitialState() {
    return {
      showCourseInfo: false
    };
  },
  changeState() {
    this.setState({['showCourseInfo']: !this.state['showCourseInfo']});
  },
  render() {
    const {
      params,
      isStudentMode,
      lessons,
      lessonsByLevel,
      playlists,
      t
    } = this.props;
    const levels = Object.keys(lessonsByLevel);
    const lessonLists = levels.map((level, idx) => (
      <div key={idx} className='col-xs-12'>
        <LessonList id={'level-' + level} level={level} lessons={lessonsByLevel[level]}/>
      </div>
    ));
    const showLevelNavigationDesktop = Object.keys(lessons).length > 15 && levels.length > 1;

    const filter = <Filter courseName={params.course} isStudentMode={isStudentMode}/>;

    const playlistsAndLessons =
      <div>
        <PlaylistNavigation playlists={playlists}/>
        {lessonLists.length ? lessonLists : t('playlist.nomatchinglessons')}
      </div>;

    const jumpTo =
      <div className={styles.scrollable}>
        {showLevelNavigationDesktop ? <LevelNavigation levels={levels}/> : null}
      </div>;

    const courseInfo =
      <Collapse in={this.state.showCourseInfo}>
        <CourseInfo courseName={params.course} isStudentMode={isStudentMode}/>
      </Collapse>;

    // Title with course name and get started button
    const heading =
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <div className={styles.headerRow}>
            <HeadRow courseName={params.course}/>
            <Button bsStyle="guide" className={styles.courseInfoBtn} onClick={() => this.changeState()}>
              <Glyphicon className={styles.glyph} glyph={!this.state.showCourseInfo ? 'plus-sign' : 'minus-sign'}/>
              {t('playlist.courseinfo')}
            </Button>
          </div>
        </Col>
      </Row>;

    const body =
      <Row>
        {/*Filter desktop*/}
        <Col xsHidden>
          <Col sm={3} className={styles.filter}>{filter}</Col>
          <Col sm={6}>
            {this.state.showCourseInfo ? courseInfo : null}
            {playlistsAndLessons}
          </Col>
          <Col sm={3}>{jumpTo}</Col>
        </Col>

        {/*Filter mobile*/}
        <Col smHidden mdHidden lgHidden>
          <Col xs={12}>
            {this.state.showCourseInfo ? courseInfo : null}
            {filter}
          </Col>
          <Col xs={12}>{jumpTo}</Col>
          <Col xs={12}>{playlistsAndLessons}</Col>
        </Col>
      </Row>;

    return (
      <DocumentTitle title={capitalize(params.course) + ' | ' + t('title.codeclub')}>
        <Grid fluid={true}>
          {heading}
          {body}
        </Grid>
      </DocumentTitle>
    );
  }
});

PlaylistPage.propTypes = {
  isStudentMode: PropTypes.bool,
  lessons: PropTypes.object.isRequired,
  lessonsByLevel: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
  params: PropTypes.shape({
    course: PropTypes.string.isRequired
  }).isRequired,
  t: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  const {course} = props.params;
  return {
    isStudentMode: state.isStudentMode,
    lessons: getFilteredAndIndexedLessons(state, course),
    lessonsByLevel: getLessonsByLevel(state, course),
    playlists: getPlaylists(state, course),
    t: getTranslator(state)
  };
}

export const PlaylistPageContainer = connect(
  mapStateToProps
)(withStyles(styles)(PlaylistPage));
