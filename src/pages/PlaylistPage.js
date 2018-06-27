import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';
import Grid from '@material-ui/core/Grid';
//import cx from 'classnames';
import styles from './PlaylistPage.scss';
import {getLessonsByLevel} from '../selectors/lesson';
import {getTranslator} from '../selectors/translate';
import {getPlaylists, getShowRadiobuttons} from '../selectors/playlist';
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
  return (
    <DocumentTitle title={capitalize(params.course) + ' | ' + t('title.codeclub')} className={styles.container}>
      <Grid container direction='column'>
        <h1>{capitalize(params.course)} {t('playlist.lessons')}</h1>
        {courseInfo}
        {showPlaylists ?
          <Grid container spacing={24}>
            <Grid item xs={12} sm={3} lg={2} xl={1}>{filter}</Grid>
            <Grid item xs={12} sm={9} lg={10} xl={11}><PlaylistNavigation playlists={coursePlaylists}/></Grid>
          </Grid>
          :
          <Grid container spacing={24}>
            <Grid item xs={12} sm={3} lg={2} xl={1}>{filter}</Grid>
            <Grid item xs={12} sm={6} lg={8} xl={10}>
              {lessonLists.length ? lessonLists :
                <div className={styles.noMatchingLessons}>{t('playlist.nomatchinglessons')}</div>
              }
            </Grid>
            <Grid item xs={12} sm={3} lg={2} xl={1}>{jumpTo}</Grid>
          </Grid>
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
  showPlaylists: state.showPlaylists && getShowRadiobuttons(state, params.course),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(PlaylistPage));
