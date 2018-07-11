import jsdom from 'jsdom';
import mock from 'mock-require';
import mockFiltertagKeys from './mockData/filtertagKeys';
import mockCourseData from './mockContextData/courseData';
import mockCourseFrontmatter from './mockContextData/courseFrontmatter';
import mockLessonData from './mockContextData/lessonData';
import mockLessonFrontmatter from './mockContextData/lessonFrontmatter';
import mockPlaylists from './mockContextData/playlists';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});


///////////////////////////////
// Mock data from oppgave-repo:

mock('lessonFiltertags/keys.yml', mockFiltertagKeys);

// Fake webpack's require.context()
const createFakeContext = (mockData) => {
  const req = (path) => {
    if (mockData[path]) { return mockData[path]; }
    else throw Error(`Cannot find module '${path}'`);
  };
  req.keys = () => Object.keys(mockData);
  return req;
};

Object.getPrototypeOf(require).context = (directory, useSubdirectories = false, regExp = /^\.\//) => {
  //console.log(`directory:${directory}, useSubdirectories:${useSubdirectories}, regExp:${regExp}`);
  // NOTE: The regexps need to match the corresponding real contexts in src/resources/
  const mockDataObj = {
    [/^[.][/][^/]+[/]data[.]yml$/]: mockCourseData,
    [/^[.][/][^/]+[/]index[^.]*[.]md$/]: mockCourseFrontmatter,
    [/^[.][/][^/]+[/][^/]+[/]data[.]yml$/]: mockLessonData,
    [/^[.][/][^/]+[/](?!playlists[/])[^/]+[/][^.]+[.]md$/]: mockLessonFrontmatter,
    [/^[.][/][^/]+[/]playlists[/][^.]+[.]yml/]: mockPlaylists,
  };
  return createFakeContext(mockDataObj[regExp] || {});
};
