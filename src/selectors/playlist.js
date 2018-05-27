// import {createSelector} from 'reselect';
// import {getCourseLessons} from './lesson';
// import {capitalize} from '../util';
// import {playlistContext} from '../contexts';
//
// const getPlaylistPaths = (state, courseName = '') => {
//   return playlistContext.keys().filter(key => key.startsWith('./' + courseName));
// };
//
// /**
//  * Creates an object containing playlists
//  * Input props: courseName (string, optional)
//  */
// export const getPlaylists = createSelector(
//   getPlaylistPaths,
//   (playlistPaths) => {
//     const lessons = getCourseLessons();
//     return playlistPaths.reduce((res, path) => {
//
//       // Between './' and second '/'
//       const courseName = path.slice(2, path.indexOf('/', 2)).toLowerCase();
//
//       // Remove '.txt'-extension and replace '_' with space
//       const playlistName = capitalize(path.slice(path.lastIndexOf('/') + 1, path.indexOf('.txt'))).replace(/_/g, ' ');
//
//       // Create an array of paths to lessons in playlist
//       const playlistContent = playlistContext(path);
//
//       // Split on newline and/or carriage return to account for all operating systems
//       const lessonPaths = playlistContent.split(/\r\n|\r|\n/).map(path => './' + courseName.toLowerCase() + '/' + path);
//
//       // Create an array of references to lessons
//       const allLessons = lessonPaths.reduce((res, path) => {
//         const lesson = lessons[path];
//         if(lesson != null) res.push(lesson);
//         return res;
//       }, []);
//
//       return {...res, [playlistName]: allLessons};
//     }, {});
//   }
// );
//
// /**
//  * Returns a boolean that says if the radiobuttons for choosing between playlists and lessons should be displayed
//  * Input props: courseName (string, optional)
//  */
// export const getShowRadiobuttons = (state, courseName) =>
//   state.language === 'nb' && Object.keys(getPlaylists(state, courseName)).length > 0;
//
// /**
//  * Returns a boolean that says if the filtergroups in the filter should be displayed
//  * Input props: courseName (string, optional)
//  */
// export const getShowFiltergroups = (state, courseName) =>
//   !state.showPlaylists || !getShowRadiobuttons(state, courseName);
