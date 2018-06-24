import {getCoursesWithPlaylists, getPlaylistsForCourse} from '../resources/playlists';
import {createSelector} from 'reselect';
import {getCheckedFilterLanguages} from './filter';

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

/**
 * Whether or not to show a flag in the lesson items in the playlist
 * @param {object} state The redux state object
 * @returns {boolean} Whether or not to show a flag in the lesson item in the playlist
 */
export const showLessonItemFlag = createSelector(
  // Input selectors:
  getCheckedFilterLanguages,
  (state) => state.language, // Chosen main language

  // Output selector (resultfunc):
  (checkedFilterLanguages, language) => {
    const checkedExactlyOneLanguage = checkedFilterLanguages.length === 1;
    const hideFlags = checkedExactlyOneLanguage && checkedFilterLanguages[0] === language;
    return !hideFlags;
  }
);
