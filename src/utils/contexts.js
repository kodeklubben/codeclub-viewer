let courseIconContext;
let lessonContext;

// The icons for the courses, i.e. all ./*/logo-black.png under lessonSrc, e.g. ./scratch/logo-black.png
courseIconContext = require.context('lessonSrc/', true, /^\.\/[^\/]*\/logo-black\.png/);

// Get all ./*/*/*.md under lessonSrc, e.g. ./scratch/straffespark/straffespark.md
lessonContext = require.context('lessonSrc/', true, /^\.\/[^\/]*\/[^\/]*\/[^\/]*\.md/);

export {courseIconContext, lessonContext};
