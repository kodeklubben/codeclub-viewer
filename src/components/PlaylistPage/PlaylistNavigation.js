import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Badge from 'react-bootstrap/lib/Badge';
import LessonItem from './LessonItem';
import {getTranslator} from '../../selectors/translate';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PlaylistNavigation.scss';

const PlaylistNavigation = ({t, playlists}) => {
  const playlistsObject = playlists || {};
  const playlistListItems = Object.keys(playlistsObject).map((playlistName, key) => {
    const header = <h4 role="presentation">
      <Badge pullRight>{playlistsObject[playlistName].length}</Badge>
      <span className={styles.link}>{playlistName}</span>
    </h4>;
    return playlistsObject[playlistName].length ? <Panel {...{key, header}} eventKey={key}>
      <ListGroup fill>
        {
          playlistsObject[playlistName].map((lesson, key) => {
            return <LessonItem {...{key, lesson}}/>;
          })
        }
      </ListGroup>
    </Panel> : null;
  });

  return playlistListItems.length ?
    <div className={styles.container}>
      <h3>{t('playlist.lessoncollections')}</h3>
      <Accordion>
        {playlistListItems}
      </Accordion>
    </div>
    :
    null;
};

PlaylistNavigation.propTypes = {
  // ownProps
  playLists: PropTypes.object,

  // mapStateToProps
  t: PropTypes.func
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
)(withStyles(styles)(PlaylistNavigation));
