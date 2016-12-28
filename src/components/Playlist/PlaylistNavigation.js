import React, {PropTypes} from 'react';
import Playlist from './Playlist';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

const PlaylistNavigation = React.createClass({
  render() {
    const playlists = this.props.playlists || {};
    const playlistListItems = Object.keys(playlists).map((playlistName, idx) => (
      playlists[playlistName].length ?
        <Playlist key={idx} name={playlistName} lessons={playlists[playlistName]}/> : null
    ));
    return (
      <div>
        <h3>Oppgavesamlinger</h3>
        <ListGroup>
          {playlistListItems.length ? 
            playlistListItems : <ListGroupItem bsStyle="warning">Ingen samlinger</ListGroupItem>}
        </ListGroup>
      </div>
    );
  }
});

PlaylistNavigation.propTypes = {
  playLists: PropTypes.object
};

export default PlaylistNavigation;
