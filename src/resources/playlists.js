import memoize from 'fast-memoize';
import {assignDeep} from './utils/resources';

// lessonSrc/*/playlists/*.txt
export const playlistContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/]playlists[/][^.]+[.]yml/);

/**
 * Get playlist data for all playlists in all courses
 * @returns {object} E.g.
 * {
 *   scratch: {
 *     playlist1: {
 *       sortindex: 1,
 *       title: {
 *         nb: 'Tittel på oppgavesamling1 bokmål',
 *         nn: 'Tittel på oppgavesamling1 nynorsk',
 *         en: 'The playlist1 title',
 *       }
 *       lessons: ['astrokatt', 'straffespark'],
 *     },
 *     playlist2: {
 *       sortindex: 2,
 *       title: {
 *         nb: 'Tittel på oppgavesamling2 bokmål',
 *         nn: 'Tittel på oppgavesamling2 nynorsk',
 *         en: 'The playlist2 title',
 *       }
 *       lessons: ['scratchLesson1', 'scratchLesson2'],
 *     },
 *     ...
 *   },
 *   python: {
 *     ...
 *   }
 * }
 */
const getData = memoize(
  () => {
    const playlists = {};
    for (const key of playlistContext.keys()) {
      const [/* ignore */, course, playlist] = key.match(/^[.][/]([^/]+)[/]playlists[/]([^.]+)[.]yml$/);
      const {sortindex = 0, title = {}, lessons = []} = playlistContext(key);
      assignDeep(playlists, [course, playlist], {sortindex, title, lessons});
    }
    return playlists;
  }
);

/**
 * Return all playlists for a course. The playlists are sorted.
 * @param {string} course E.g. 'scratch'
 * @return {string[]} An array with the (file)name of all the playlists (without extension),
 *                    e.g. ['playlist1', 'playlist2']
 */
export const getPlaylistsForCourse = memoize(
  (course) => {
    const coursePlaylists = getData()[course] || {};
    const playlists = Object.keys(coursePlaylists);
    const sortFunc = (p1, p2) => coursePlaylists[p1].sortindex - coursePlaylists[p2].sortindex;
    playlists.sort(sortFunc);
    return playlists;
  }
);

/**
 * Get data for a specific playlist in a course
 * @param {string} course E.g. 'scratch'
 * @param {string} playlist The filename of the playlist (without extension) e.g. 'playlist1'
 * @returns {object} An object with playlist data for one playlist
 * {
 *   sortindex: 1,
 *   title: {
 *     nb: 'Tittel på oppgavesamling1 bokmål',
 *     nn: 'Tittel på oppgavesamling1 nynorsk',
 *     en: 'The playlist1 title',
 *   }
 *   lessons: ['astrokatt', 'straffespark'],
 * }
 */
const getPlaylist = (course, playlist) => (getData()[course] || {})[playlist] || {};

/**
 * Get a list of all courses that have playlists, sorted alphabetically.
 * @returns {string[]} E.g. ['scratch', 'python', ...]
 */
export const getCoursesWithPlaylists = memoize(
  () => {
    return Object.keys(getData()).sort();
  }
);

/**
 * Return all the lessons in a playlist
 * @param {string} course E.g. 'scratch'
 * @param {string} playlist The filename of the playlist (without extension) e.g. 'playlist1'
 * @return {string[]} An array with all the lessons in the playlist, e.g. ['astrokatt', 'straffespark']
 */
export const getPlaylistLessons = (course, playlist) =>
  getPlaylist(course, playlist).lessons || [];

/**
 *
 * @param {string} course E.g. 'scratch'
 * @param {string} playlist E.g. The filename of the playlist (without extension) e.g. 'playlist1'
 * @param {string} language E.g. 'nb'
 * @return {string} The title of the playlist in the given language
 */
export const getPlaylistTitle = (course, playlist, language) =>
  (getPlaylist(course, playlist).title || {})[language] || '';
