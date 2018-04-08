import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import AutoAffix from 'react-overlays/lib/AutoAffix';
import cx from 'classnames';
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

const PlaylistPage = ({params, lessonsByLevel, coursePlaylists, t, showPlaylists}) => {
  const levels = Object.keys(lessonsByLevel);
  const lessonLists = levels.map(level => <LessonList key={level} {...{level}} lessons={lessonsByLevel[level]}/>);
  const filter = <LessonFilter courseName={params.course}/>;
  const jumpTo = levels.length > 0 ? <div><LevelNavigation {...{levels}}/></div> : null;
  const courseInfo = <CourseInfo courseName={params.course}/>;
  let thispage = null;
  const jumpToAffixed = jumpTo ?
    <Col xsHidden sm={3} className={cx(styles.jumpTo, {[styles.topMargin]: lessonLists.length})}>
      <AutoAffix viewportOffsetTop={15} container={() => thispage}>
        {jumpTo}
      </AutoAffix>
    </Col> : null;
  return (
    <DocumentTitle title={capitalize(params.course) + ' | ' + t('title.codeclub')}>
      <Grid fluid={true} ref={grid => thispage = grid}>
        <Row>
          <Col xs={12}><h1>{capitalize(params.course)} {t('playlist.lessons')}</h1></Col>
          <Col xs={12}>{courseInfo}</Col>
        </Row>
        {showPlaylists ?
          <Row>
            <Col xs={12} sm={3} className={cx({[styles.topMargin]: lessonLists.length})}>{filter}</Col>
            <Col xs={12} sm={9}><PlaylistNavigation playlists={coursePlaylists}/></Col>
          </Row>
          :
          <Row>
            <Col xs={12} sm={3} className={cx({[styles.topMargin]: lessonLists.length})}>{filter}</Col>
            <Col xs={12} smHidden mdHidden lgHidden>{jumpTo}</Col>
            <Col xs={12} sm={6}>
              {lessonLists.length ?
                lessonLists :
                <div className={styles.noMatchingLessons}>{t('playlist.nomatchinglessons')}</div>
              }
            </Col>
            {jumpToAffixed}
          </Row>
        }
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
  coursePlaylists: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  showPlaylists: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {params}) => ({
  lessonsByLevel: getLessonsByLevel(state, params.course),
  coursePlaylists: getPlaylists(state, params.course),
  t: getTranslator(state),
  showPlaylists: state.showPlaylists,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(PlaylistPage));
