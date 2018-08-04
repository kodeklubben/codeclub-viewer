import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import LessonItem from './LessonItem';
import {getTranslator} from '../../selectors/translate';
import {getPlaylistsForCourse, getPlaylistLessons, getPlaylistTitle} from '../../resources/playlists';
import {areAllLessonsInPlaylistTranslated} from '../../resources/utils/playlistLessons';

const PlaylistNavigation = ({course, language, t}) => {
  const playlists = getPlaylistsForCourse(course);
  const playlistListItems = playlists.map(playlist => {
    const lessons = getPlaylistLessons(course, playlist);
    const title = getPlaylistTitle(course, playlist, language) || t('coursepage.missingtitle');
    const header = <h4 role="presentation">{title}</h4>;
    return (
      <ExpansionPanel key={playlist}>
        <ExpansionPanelSummary>
          {header}
        </ExpansionPanelSummary>
        {areAllLessonsInPlaylistTranslated(course, playlist, language) ?
          lessons.map(lesson => <LessonItem key={lesson} {...{course, lesson, language}}/>) :
          <ExpansionPanelDetails>{t('coursepage.lessonsnottranslated')}</ExpansionPanelDetails>
        }
      </ExpansionPanel>
    );
  });

  return (
    playlists.length > 0 ?
      <div>
        <h3>{t('coursepage.lessoncollections')}</h3>
        {playlistListItems}
      </div> :
      null
  );
};

PlaylistNavigation.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,

  // mapStateToProps
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
  t: getTranslator(state),
});

export default connect(
  mapStateToProps
)(PlaylistNavigation);
