import {getCoursesWithPlaylists, getPlaylistsForCourse} from '../resources/playlists';

// TODO: Move getShowRadiobuttons() to e.g. src/utils/playlistUtils.js since it is not a selector
/**
 * Whether or not the radiobuttons for choosing between playlists and lessons should be displayed
 * @param {string} course E.g. 'scratch' (optional)
 * @returns {boolean}
 */
export const getShowRadiobuttons = (course) =>
  course ? getPlaylistsForCourse(course).length > 0 : getCoursesWithPlaylists().length > 0;

/**
 * Whether or not the filtergroups in the filter should be displayed
 * @param {object} state The redux state object
 * @param {string} course E.g. 'scratch' (optional)
 * @returns {boolean}
*/
export const getShowFiltergroups = (state, course) =>
  !state.showPlaylists || !getShowRadiobuttons(course);
