import {assignDeep} from '../util';

// lessonSrc/*/playlists/*.txt
export const playlistContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/]playlists[/][^.]+[.]yml/);

let cachedPlaylists = null;
// An example of the structure of cachedPlaylists:
// let cachedPlaylists = {
//   scratch: {
//     playlist1: {
//       sortindex: 1,
//       title: 'The playlist1 title',
//       lessons: ['astrokatt', 'straffespark'],
//     },
//     playlist2: {
//       sortindex: 2,
//       title: 'The playlist2 title',
//       lessons: ['scratchLesson1', 'scratchLesson2'],
//     },
//     /* ... */
//   },
//   python: {
//     /* ... */
//   }
// };
const getCachedPlaylists = () => {
  if (cachedPlaylists == null) {
    cachedPlaylists = {};
    for (const key of playlistContext.keys()) {
      const [/* ignore */, course, playlist] = key.match(/^[.][/]([^/]+)[/]playlists[/]([^.]+)[.]yml$/);
      const {sortindex = 0, title = {}, lessons = []} = playlistContext(key);
      assignDeep(cachedPlaylists, [course, playlist], {sortindex, title, lessons});
    }
  }
  return cachedPlaylists;
};

const cachedSortedPlaylists = {};
// An example of the structure of cachedPlaylists:
// const cachedSortedPlaylists = {
//   scratch: ['scratchPlaylist1', 'scratchPlaylist2'],
//   python: ['pythonPlaylist1', 'pythonPlaylist2'],
//   /* ... */
// };
/**
 * Return all playlists for a course
 * @param {string} course E.g. 'scratch'
 * @return {string[]} An array with the (file)name of all the playlists (without extension),
 *                    e.g. ['playlist1', 'playlist2']
 */
export const getSortedPlaylists = (course) => {
  if (!cachedSortedPlaylists[course]) {
    const coursePlaylists = getCachedPlaylists()[course] || {};
    const playlists = Object.keys(coursePlaylists);
    const sortFunc = (p1, p2) => coursePlaylists[p1].sortindex - coursePlaylists[p2].sortindex;
    playlists.sort(sortFunc);
    cachedSortedPlaylists[course] = playlists;
  }
  return cachedSortedPlaylists[course];
};

const getPlaylist = (course, playlist) => (getCachedPlaylists()[course] || {})[playlist] || {};

/**
 * Return all the lessons in a playlist
 * @param {string} course E.g. 'scratch'
 * @param {string} playlist The filename of the playlist (without extension) e.g. 'playlist1'
 * @return {string[]} An array with all the lessons in the playlist, e.g. ['astrokatt', 'straffespark']
 */
export const getPlaylistLessons = (course, playlist) =>
  getPlaylist(course, playlist).lessons || [];

// /**
//  * Get the sortindex of the playlist. Playlists should be shown in ascending sortindex order, i.e. 1 before 2.
//  * @param {string} course E.g. 'scratch'
//  * @param {string} playlist E.g. The filename of the playlist (without extension) e.g. 'playlist1'
//  * @return {number} The sortindex of the playlist
//  */
// // TODO: Might not need this function, instead return playlists sorted
// export const getPlaylistSortindex = (course, playlist) =>
//   getPlaylist(course, playlist).lessons || 0;

/**
 *
 * @param {string} course E.g. 'scratch'
 * @param {string} playlist E.g. The filename of the playlist (without extension) e.g. 'playlist1'
 * @param {string} language E.g. 'nb'
 * @return {string} The title of the playlist in the given language
 */
export const getPlaylistTitle = (course, playlist, language) =>
  (getPlaylist(course, playlist).title || {})[language] || '';
