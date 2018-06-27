import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DocumentTitle from 'react-document-title';
import Grid from '@material-ui/core/Grid';
import styles from './PlaylistPage.scss';
import {getLessonsByLevel} from '../selectors/lesson';
import {getTranslator} from '../selectors/translate';
import {getPlaylists, getShowRadiobuttons} from '../selectors/playlist';
import {capitalize} from '../util';
import LessonFilter from '../components/Filter/LessonFilter';
import LessonList from '../components/PlaylistPage/LessonList';
import PlaylistNavigation from '../components/PlaylistPage/PlaylistNavigation';
import CourseInfo from '../components/PlaylistPage/CourseInfo';

const PlaylistPage = ({params, lessonsByLevel, coursePlaylists, t, showPlaylists}) => {
  const levels = Object.keys(lessonsByLevel);
  const lessonLists = levels.map(level => <LessonList key={level} {...{level}} lessons={lessonsByLevel[level]}/>);
  const filter =
    <div className={styles.topMargin}>
      <LessonFilter courseName={params.course}/>
    </div>;
  return (
    <DocumentTitle title={capitalize(params.course) + ' | ' + t('title.codeclub')} className={styles.container}>
      <div className={styles.container}>
        <Grid container direction='column'>
          <h1>{capitalize(params.course)} {t('playlist.lessons')}</h1>
          <CourseInfo courseName={params.course}/>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4} lg={2}>{filter}</Grid>
            {showPlaylists ?
              <Grid item xs={12} sm={8} lg={10}><PlaylistNavigation playlists={coursePlaylists}/></Grid>
              :
              <Grid item xs={12} sm={8} lg={10}>
                {lessonLists.length ? lessonLists :
                  <h2 className={styles.topMargin}><b>{t('playlist.nomatchinglessons')}</b></h2>
                }
              </Grid>
            }
          </Grid>
        </Grid>
      </div>
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
