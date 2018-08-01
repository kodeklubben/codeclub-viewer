import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Badge from 'react-bootstrap/lib/Badge';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import LessonItem from './LessonItem';
import {getTranslator} from '../../selectors/translate';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PlaylistNavigation.scss';
import {getPlaylistsForCourse, getPlaylistLessons, getPlaylistTitle} from '../../resources/playlists';
import {areAllLessonsInPlaylistTranslated} from '../../resources/utils/playlistLessons';

const PlaylistNavigation = ({course, language, t}) => {
  const playlists = getPlaylistsForCourse(course);

  const playlistListItems = playlists.map(playlist => {
    const lessons = getPlaylistLessons(course, playlist);
    const title = getPlaylistTitle(course, playlist, language) || t('coursepage.missingtitle');
    const header = <h4 role="presentation">
      <Badge pullRight>{lessons.length}</Badge>
      <span className={styles.link}>{title}</span>
    </h4>;
    return (
      <Panel key={playlist} {...{header}} eventKey={playlist}>
        <ListGroup fill>
          {areAllLessonsInPlaylistTranslated(course, playlist, language) ?
            lessons.map(lesson => <LessonItem key={lesson} {...{course, lesson, language}}/>) :
            <span>{t('coursepage.lessonsnottranslated')}</span>
          }
        </ListGroup>
      </Panel>
    );
  });

  return (
    playlists.length > 0 ?
      <div className={styles.container}>
        <h2>{t('coursepage.lessoncollections')}</h2>
        <Accordion>
          {playlistListItems}
        </Accordion>
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
)(withStyles(styles)(PlaylistNavigation));
