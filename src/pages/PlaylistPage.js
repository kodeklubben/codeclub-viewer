import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';
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
  const lessonLists = levels.map(level => <LessonList key={level} {...{level}} lessons={lessonsByLevel[level]}/>);
  const filter = <LessonFilter courseName={params.course}/>;
  const playlist = <PlaylistNavigation {...{playlists}}/>;
  const jumpTo = <div>{levels.length > 0 ? <LevelNavigation {...{levels}}/> : null}</div>;
  const courseInfo = <CourseInfo courseName={params.course}/>;
  return (
    <DocumentTitle title={capitalize(params.course) + ' | ' + t('title.codeclub')}>
      <Grid fluid={true}>
        <Row>
          <Col xs={12}><h1>{capitalize(params.course)} {t('playlist.lessons')}</h1></Col>
          <Col xs={12}>{courseInfo}</Col>
        </Row>
        <Row>
          <Col xs={12} sm={3} className={lessonLists.length ? styles.topMargin : null}>{jumpTo}</Col>
          <Col xs={12} sm={lessonLists.length ? 9 : 12}>{playlist}</Col>
        </Row>
        <Row>
          <Col xs={12} sm={3} className={lessonLists.length ? styles.topMargin : null}>{filter}</Col>
          <Col xs={12} sm={9}>
            {lessonLists.length ? lessonLists :
              <div className={styles.noMatchingLessons}>{t('playlist.nomatchinglessons')}</div>
            }
          </Col>
        </Row>
      </Grid>
    </DocumentTitle>
  );
};

PlaylistPage.propTypes = {
  // ownProps
  params: PropTypes.shape({
    course: PropTypes.string.isRequired
  }).isRequired,

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
