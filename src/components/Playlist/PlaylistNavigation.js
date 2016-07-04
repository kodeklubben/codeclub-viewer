import React, {PropTypes} from 'react';
import Playlist from './Playlist';

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
        <ul className='list-group'>
          {playlistListItems.length ? playlistListItems : <li className='list-group-item list-group-item-warning'>Ingen samlinger</li>}
        </ul>
      </div>
    );
  }
});

PlaylistNavigation.propTypes = {
  playLists: PropTypes.object
};

export default PlaylistNavigation;
