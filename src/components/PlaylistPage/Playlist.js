import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Badge from 'react-bootstrap/lib/Badge';

import LessonItem from './LessonItem';
import {getTranslator} from '../../selectors/translate';
import {getPlaylistLessons, getPlaylistTitle} from '../../resources/playlists';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Playlist.scss';
import {areAllLessonsInPlaylistTranslated} from '../../resources/utils/playlistLessons';

const Playlist = ({course, playlist, title, language, t}) => {
  const lessons = getPlaylistLessons(course, playlist);

  const header = <h4 role="presentation">
    <Badge pullRight>{lessons.length}</Badge>
    <span className={styles.link}>{title}</span>
  </h4>;
  return (
    <Panel key={name} {...{header}} eventKey={name}>
      {
        areAllLessonsInPlaylistTranslated(course, playlist, language) ?
          <ListGroup fill>
            {lessons.map(lesson => <LessonItem key={lesson} {...{course, lesson, language}}/>)}
          </ListGroup> :
          <span>{t('playlist.lessonsnottranslated')}</span>
      }
    </Panel>
  );
};
Playlist.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,
  playlist: PropTypes.string.isRequired,

  // mapStateToProps
  title: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {course, playlist}) => {
  const t = getTranslator(state);
  return {
    //allLessonsTranslated: getPlaylistLessons(course, playlist),
    title: getPlaylistTitle(course, playlist, state.language) || t('playlist.missingtitle'),
    language: state.language,
    t,
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(Playlist));
