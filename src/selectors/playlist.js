import {getCoursesWithPlaylists, getPlaylistsForCourse} from '../resources/playlists';

/**
 * Whether or not the radiobuttons for choosing between playlists and lessons should be displayed
 * @param {object} state The redux state object
 * @param {string} course E.g. 'scratch' (optional)
 * @returns {boolean}
 */
export const getShowRadiobuttons = (state, course) =>
  course ? getPlaylistsForCourse(course).length > 0 : getCoursesWithPlaylists().length > 0;

/**
 * Whether or not the filtergroups in the filter should be displayed
 * @param {object} state The redux state object
 * @param {string} course E.g. 'scratch' (optional)
 * @returns {boolean}
*/
export const getShowFiltergroups = (state, course) =>
  !state.showPlaylists || !getShowRadiobuttons(state, course);
