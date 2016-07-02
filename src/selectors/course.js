import {createSelector} from 'reselect';
import {getFilteredLessons} from './lesson';
import {getPlaylists} from './playlist';
import {capitalize} from '../util';

const getIconContext = (state) => state.context.iconContext;

// Creates a list of courses with lessons that have tags matching the filter
export const getFilteredCourses = createSelector(
  [getFilteredLessons, getPlaylists, getIconContext],
  (lessons = {}, playlists = {}, iconContext) => {

    return Object.keys(lessons).reduce((res, lessonKey) => {
      const lesson = lessons[lessonKey];
      const courseName = lesson.course;
      const name = capitalize(courseName).replace('_', ' ');

      // Append lesson to existing course
      if (res.hasOwnProperty(courseName)) res[courseName].lessons.push(lesson);
        // Or create a new course
      else res[courseName] = {
        iconPath: iconContext('./' + courseName + '/logo-black.png'),
        lessons: [lesson],
        name,
        path: courseName,
        playlists: Object.keys(playlists).reduce((coursePlaylists, playlistName) => {
          const playlist = playlists[playlistName];
          // Get playlists that have lessons by course name
          if(playlist.length > 0 && playlist[0].course.toLowerCase() === name.toLowerCase()) coursePlaylists[playlistName] = playlist;
          return coursePlaylists;
        }, {})
      };

      return res;
    }, {});
    
  }
);
