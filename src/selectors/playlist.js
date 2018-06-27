import {getCoursesWithPlaylists, getPlaylistsForCourse} from '../resources/playlists';

/**
 * Returns a boolean that says if the radiobuttons for choosing between playlists and lessons should be displayed
 * @param {object} state The redux state object
 * @param {string} course E.g. 'scratch' (optional)
 */
export const getShowRadiobuttons = (state, course) =>
  course ? getPlaylistsForCourse(course).length > 0 : getCoursesWithPlaylists().length > 0;

/**
 * Returns a boolean that says if the filtergroups in the filter should be displayed
 * Input props: courseName (string, optional)
 */
export const getShowFiltergroups = (state, course) =>
  !state.showPlaylists || !getShowRadiobuttons(state, course);
