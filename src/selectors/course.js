import {createSelector} from 'reselect';
import {getFilteredLessons} from './lesson';
import {getPlaylists} from './playlist';
import {capitalize, tagsContainAllTagsInFilter, cleanseTags} from '../util';

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
          // Get playlists that have at least one lesson by course name
          if(playlist.length > 0 && playlist[0].course.toLowerCase() === name.toLowerCase()) {
            coursePlaylists[playlistName] = playlist;
          }
          return coursePlaylists;
        }, {})
      };

      return res;
    }, {});

  }
);

const getCourseContext = (state) => state.context.courseContext;
const getFilter = (state) => state.filter;

export const getFilteredExternalCourses = createSelector(
  [getCourseContext, getIconContext, getFilter],
  (courseContext, iconContext, filter = {}) => {
    return courseContext.keys().reduce((res, path) => {
      const coursePath = path.slice(0, path.indexOf('/', 2));
      const fm = courseContext(path).frontmatter;
      if(fm.external != null){
        const course = {
          externalLink: fm.external,
          iconPath: iconContext(coursePath + '/logo-black.png'),
          name: fm.title,
          tags: fm.tags == null ? {} : cleanseTags(fm.tags)
        };
        return tagsContainAllTagsInFilter(course.tags, filter) ? {...res, [fm.title]: course} : res;
      }
      return res;
    },{});
  }
);
