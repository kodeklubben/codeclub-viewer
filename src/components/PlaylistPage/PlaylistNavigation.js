import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Badge from 'react-bootstrap/lib/Badge';
import {LessonItemContainer} from './LessonItem';
import {getTranslator} from '../../selectors/translate';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './PlaylistNavigation.scss';

const PlaylistNavigation = React.createClass({
  render() {
    const {t} = this.props;
    const playlists = this.props.playlists || {};
    const playlistListItems = Object.keys(playlists).map((playlistName, idx) => {
      const panelHeader = <h4 role="presentation" className={styles.header + ' panel-title'}>
        <Badge pullRight>{playlists[playlistName].length}</Badge>
        <span className={styles.link}>{playlistName}</span>
      </h4>;
      //const panelHeader = playlistName;
      return <Panel key={idx} eventKey={idx} header={panelHeader}>
        <ListGroup fill>
          {
            playlists[playlistName].map((lesson, idx) => {
              return <LessonItemContainer key={idx} lesson={lesson}/>;
            })
          }
        </ListGroup>
      </Panel>;
    });

    return playlistListItems.length ?
      <div>
        <h3>{t('playlist.lessoncollections')}</h3>
        <Accordion>
          {playlistListItems}
        </Accordion>
      </div>
      :
      null;
  }
});

PlaylistNavigation.propTypes = {
  playLists: PropTypes.object,
  t: PropTypes.func
};

function mapStateToProps(state) {
  return {
    t: getTranslator(state)
  }
}
export default connect(mapStateToProps)(withStyles(styles)(PlaylistNavigation));
