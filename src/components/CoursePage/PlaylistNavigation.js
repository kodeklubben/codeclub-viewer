import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Badge from 'react-bootstrap/lib/Badge';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import LessonItem from './LessonItem';
import {getTranslator} from '../../selectors/translate';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PlaylistNavigation.scss';
import {setExpandedAccordion} from '../../reducers/expandedAccordion';
import {getPlaylistsForCourse, getPlaylistLessons, getPlaylistTitle} from '../../resources/playlists';
import {areAllLessonsInPlaylistTranslated} from '../../resources/utils/playlistLessons';

const PlaylistNavigation = ({course, language, t, expandedAccordion, setExpandedAccordion}) => {
  useStyles(styles);
  const handleSelect = activeKey => setExpandedAccordion(course, activeKey);

  const playlists = getPlaylistsForCourse(course);
  const playlistListItems = playlists.map((playlist, i) => {
    const lessons = getPlaylistLessons(course, playlist);
    const title = getPlaylistTitle(course, playlist, language) || t('coursepage.missingtitle');
    return (
      <Panel key={playlist} eventKey={i}>
        <Panel.Heading>
          <Panel.Title toggle>
            <Badge pullRight>{lessons.length}</Badge>
            <span className={styles.link}>{title}</span>
          </Panel.Title>
        </Panel.Heading>
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
        <PanelGroup accordion id='PanelGroup' onSelect={handleSelect} activeKey={expandedAccordion[course]}>
          {playlistListItems}
        </PanelGroup>
      </div> :
      null
  );
};

PlaylistNavigation.propTypes = {
  course: PropTypes.string.isRequired,

  // mapStateToProps
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  expandedAccordion: PropTypes.object.isRequired,

  // mapDispatchToProps
  setExpandedAccordion: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  language: state.language,
  t: getTranslator(state),
  expandedAccordion: state.expandedAccordion,
});

const mapDispatchToProps = {
  setExpandedAccordion
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistNavigation);
