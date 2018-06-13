import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Accordion from 'react-bootstrap/lib/Accordion';
import Playlist from './Playlist';
import {getTranslator} from '../../selectors/translate';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PlaylistNavigation.scss';

const PlaylistNavigation = ({t, course, playlists}) => {
  return (
    <div className={styles.container}>
      <h3>{t('coursepage.lessoncollections')}</h3>
      <Accordion>
        {playlists.map(playlist => <Playlist {...{course, playlist}} />)}
      </Accordion>
    </div>
  );
};

PlaylistNavigation.propTypes = {
  // ownProps
  course: PropTypes.string.isRequired,

  // mapStateToProps
  playLists: PropTypes.object,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
});

export default connect(
  mapStateToProps
)(withStyles(styles)(PlaylistNavigation));
