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

class PlaylistNavigation extends React.PureComponent {
  state = {
    activeKey: '0'
  };

  handleSelect = activeKey => this.setState({activeKey});

  render () {
    const {course, language, t} =  this.props;
    const {activeKey} = this.state;
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
          <PanelGroup accordion id='PanelGroup' onSelect={this.handleSelect} {...{activeKey}}>
            {playlistListItems}
          </PanelGroup>
        </div> :
        null
    );
  }
}

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
