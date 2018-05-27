import {assignDeep} from '../util';

// lessonSrc/*/playlists/*.txt
export const playlistContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/]playlists[/][^.]+[.]yml/);

const playlists = {};
// TODO: Make this a function, and change 'playlists' to 'cachedPlaylists'
for (const key of playlistContext.keys()) {
  const [/* ignore */, course, playlist] = key.match(/^[.][/]([^/]+)[/]playlists[/]([^.]+)[.]yml$/);
  const {sortindex = 0, title = {}, lessons = []} = playlistContext(key);
  assignDeep(playlists, [course, playlist], {sortindex, title, lessons});
}

const getPlaylist = (course, playlist) => (playlists[course] || {})[playlist] || {};

/**
 * Return all playlists for a course
 * @param {string} course E.g. 'scratch'
 * @return {string[]} An array with the (file)name of all the playlists (without extension),
 *                    e.g. ['playlist1', 'playlist2']
 */
  // TODO: Perhaps change this to getSortedPlaylists (using sortindex)?
export const getPlaylists = (course) =>
  Object.keys(playlists[course] || {});

/**
 * Return all the lessons in a playlist
 * @param {string} course E.g. 'scratch'
 * @param {string} playlist The filename of the playlist (without extension) e.g. 'playlist1'
 * @return {string[]} An array with all the lessons in the playlist, e.g. ['astrokatt', 'straffespark']
 */
export const getPlaylistLessons = (course, playlist) =>
  getPlaylist(course, playlist).lessons || [];

/**
 * Get the sortindex of the playlist. Playlists should be shown in ascending sortindex order, i.e. 1 before 2.
 * @param {string} course E.g. 'scratch'
 * @param {string} playlist E.g. The filename of the playlist (without extension) e.g. 'playlist1'
 * @return {number} The sortindex of the playlist
 */
  // TODO: Might not need this function, instead return playlists sorted
export const getPlaylistSortindex = (course, playlist) =>
  getPlaylist(course, playlist).lessons || 0;

/**
 *
 * @param {string} course E.g. 'scratch'
 * @param {string} playlist E.g. The filename of the playlist (without extension) e.g. 'playlist1'
 * @param {string} language E.g. 'nb'
 * @return {string} The title of the playlist in the given language
 */
export const getPlaylistTitle = (course, playlist, language) =>
  (getPlaylist(course, playlist).title || {})[language] || '';
