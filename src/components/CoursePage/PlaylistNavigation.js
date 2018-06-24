import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Accordion from 'react-bootstrap/lib/Accordion';
import Playlist from './Playlist';
import {getTranslator} from '../../selectors/translate';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PlaylistNavigation.scss';
import {getPlaylistsForCourse} from '../../resources/playlists';

const PlaylistNavigation = ({t, course}) => {
  const playlists = getPlaylistsForCourse(course);
  // TODO: Fix Accordion, seems like the current implementation got broken when upgrading to react-bootstrap 0.31.1
  return (
    playlists.length > 0 ?
      <div className={styles.container}>
        <h3>{t('coursepage.lessoncollections')}</h3>
        <Accordion>
          {playlists.map(playlist => <Playlist key={playlist} {...{course, playlist}} />)}
        </Accordion>
      </div> :
      null
  );
};

PlaylistNavigation.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(PlaylistNavigation));
