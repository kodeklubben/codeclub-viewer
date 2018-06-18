import memoize from 'fast-memoize';
import {getPlaylistLessons} from '../playlists';
import {isLessonTranslated} from '../lessonFrontmatter';

/**
 * Returns whether or not all lessons in the playlist is translated to the given language.
 * @param {string} course E.g. 'scratch'
 * @param {string} playlist E.g. 'playlist1'
 * @param {string} language E.g. 'nb'
 * @returns {boolean}
 */
export const areAllLessonsInPlaylistTranslated = memoize(
  (course, playlist, language) => {
    console.debug(`DEBUG: resources/utils/playlistLessons.js:areAllLessonsInPlaylistTranslated` +
      `(${course},${playlist},${language})`);
    const lessons = getPlaylistLessons(course, playlist);
    const lessonTranslatedReducer = (result, lesson) => result && isLessonTranslated(course, lesson, language);
    return lessons.reduce(lessonTranslatedReducer, true);
  }
);
