// NOTE: Putting these contexts in separate files might enable better code splitting.

// lessonSrc/*/logo-black.png
export const iconContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/]logo-black[.]png$/);

// lessonSrc/*/index.md
export const courseContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/]index[.]md$/);

// lessonSrc/*/index*.md
export const courseAllLangsContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/]index[^.]*[.]md$/);

// lessonSrc/*/playlists/*.txt
export const playlistContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/]playlists[/][^/]*[.]txt$/);

// lessonSrc/*/*/*.md, but not files README.md or README_xx.md where xx is any two letters in lower case
export const lessonContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/][^/]*[/](?!README(_[a-z]{2})?[.]md$)[^/]*[.]md$/);

// lessonSrc/*/*/README.md and lessonSrc/*/*/README_xx.md where xx is any two letters in lower case
export const readmeContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/][^/]*[/]README(_[a-z]{2})?[.]md$/);

// lessonSrc/*/*/*.md
export const lessonAllContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/][^/]*[/][^.]*[.]md$/);

////////////////////////////
// Context util functions //
////////////////////////////
export const getCourseIcon = (course) => {
  const path = `./${course}/logo-black.png`;
  return iconContext.keys().includes(path) ? iconContext(path) : null;
};

// Cut off '.' at start and '/index.md' at end:
const extractCoursePath = (course) => course.slice(1).replace(/[/]index\.md$/i, '');

// Cut off '.' at start and '.md' at end:
const extractLessonPath = (course) => course.slice(1).replace(/\.md$/i, '');

const coursePathArray = courseContext.keys().map(extractCoursePath);
const lessonPathArray = lessonContext.keys().map(extractLessonPath);
const readmePathArray = readmeContext.keys().map(extractLessonPath);

export const isValidLessonPath = (path) => lessonPathArray.includes(path);
export const isValidReadmePath = (path) => readmePathArray.includes(path);
export const isValidCoursePath = (path) => coursePathArray.includes(path);
