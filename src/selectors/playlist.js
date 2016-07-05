import {createSelector} from 'reselect';
import {getFilteredLessons} from './lesson';
import {capitalize} from '../util';

const getPlaylistContext = (state) => state.context.playlistContext;

// Creates an object containing all playlists
export const getPlaylists = createSelector(
  [getFilteredLessons, getPlaylistContext],
  (filteredLessons, playlistContext) => {
    return playlistContext.keys().reduce((res, path) => {
      
      // Between './' and second '/'
      const courseName = path.slice(2, path.indexOf('/', 2)).toLowerCase();

      // Remove '.txt'-extension and replace '_' with space
      const playlistName = capitalize(path.slice(path.lastIndexOf('/') + 1, path.indexOf('.txt'))).replace(/_/g, ' ');

      // Create an array of paths to lessons in playlist
      const playlistContent = playlistContext(path);
      const lessonPaths = playlistContent.split('\n').map(path => './' + courseName.toLowerCase() + '/' + path);

      // Create an array of references to lessons
      const lessons = lessonPaths.reduce((res, path) => {
        const lesson = filteredLessons[path];
        if(lesson != null) res.push(lesson);
        return res;
      }, []);

      return {...res, [playlistName]: lessons};
    }, {});
  }
);
