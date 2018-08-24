import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
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
    const header = (
      <div>
        <Badge pullRight>{lessons.length}</Badge>
        <span className={styles.link}>{title}</span>
      </div>
    );
    return (
      <Panel key={playlist} eventKey={playlist} className={styles.title}>
        <Panel.Heading><Panel.Title toggle>{header}</Panel.Title></Panel.Heading>
        <Panel.Collapse role='tab'>
          <ListGroup>
            {areAllLessonsInPlaylistTranslated(course, playlist, language) ?
              lessons.map(lesson => <LessonItem key={lesson} {...{course, lesson, language}}/>) :
              <span>{t('coursepage.lessonsnottranslated')}</span>
            }
          </ListGroup>
        </Panel.Collapse>
      </Panel>
    );
  });

  return (
    playlists.length > 0 ?
      <div className={styles.container}>
        <h2 className={styles.headerText}>{t('coursepage.lessoncollections')}</h2>
        <PanelGroup accordion id='PanelGroup'>
          {playlistListItems}
        </PanelGroup>
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
