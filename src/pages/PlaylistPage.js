import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentMeta from 'react-document-meta';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import styles from './PlaylistPage.scss';
import {getLessonsByLevel} from '../selectors/lesson';
import {getTranslator} from '../selectors/translate';
import {getPlaylists} from '../selectors/playlist';
import {capitalize} from '../util';
import LessonFilter from '../components/Filter/LessonFilter';
import LessonList from '../components/PlaylistPage/LessonList';
import LevelNavigation from '../components/PlaylistPage/LevelNavigation';
import PlaylistNavigation from '../components/PlaylistPage/PlaylistNavigation';
import CourseInfo from '../components/PlaylistPage/CourseInfo';

const PlaylistPage = ({params, lessonsByLevel, playlists, t}) => {
  const levels = Object.keys(lessonsByLevel);

  const lessonLists = levels.map(level =>
    <LessonList key={level} {...{level}} id={'level-' + level} lessons={lessonsByLevel[level]}/>);

  const filter = <LessonFilter courseName={params.course}/>;

  const playlistsAndLessons =
    <div>
      <PlaylistNavigation {...{playlists}}/>
      {lessonLists.length ? lessonLists : t('playlist.nomatchinglessons')}
    </div>;

  const jumpTo =
    <div>
      {levels.length > 0 ? <LevelNavigation {...{levels}}/> : null}
    </div>;

  const courseInfo =
    <CourseInfo courseName={params.course}/>;

  const meta = {
    title: capitalize(params.course) + ' | ' + t('title.codeclub'),
    description: 'Have something from constants for every course?'
  };

  // Title with course name and get started button
  const heading =
    <Row>
      <Col xs={12} sm={6} smOffset={3}>
        <h1>{capitalize(params.course)} {t('playlist.lessons')}</h1>
      </Col>
    </Row>;

  const body =
    <Row>
      {/*Filter desktop*/}
      <Col xsHidden>
        <Col sm={3} className={styles.topMargin}>{filter}</Col>
        <Col sm={6}>
          {courseInfo}
          {playlistsAndLessons}
        </Col>
        <Col sm={3} className={styles.topMargin}>{jumpTo}</Col>
      </Col>

      {/*Filter mobile*/}
      <Col smHidden mdHidden lgHidden>
        <Col xs={12}>{courseInfo}</Col>
        <Col xs={12}>{filter}</Col>
        {/*<Col xs={12}>{jumpTo}</Col>*/}
        <Col xs={12}>{playlistsAndLessons}</Col>
      </Col>
    </Row>;

  return (
    <DocumentMeta {...meta}>
      <Grid fluid={true}>
        {heading}
        {body}
      </Grid>
    </DocumentMeta>
  );
};

PlaylistPage.propTypes = {
  // ownProps
  params: PropTypes.shape({
    course: PropTypes.string.isRequired
  }).isRequired,
  meta: PropTypes.object,

  // mapStateToProps
  lessonsByLevel: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state, {params}) => ({
  lessonsByLevel: getLessonsByLevel(state, params.course),
  playlists: getPlaylists(state, params.course),
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(PlaylistPage));
