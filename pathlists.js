const {lessonSrc, lessonFiltertags} = require('./buildconstants');
const path = require('path');
const fs = require('fs');
const yaml = require('yamljs');
const yamlFront = require('yaml-front-matter');
const glob = require('glob');

// Need to replace backslashes with forward slashes on Windows, since glob keeps forward slashes
const lessonSrcPath = lessonSrc.replace(/\\/g, '/');

/**
 * Get paths to all courses. Currently based on all "src/ * /index.md"
 * @param ending Optional ending to be added at the end of the paths
 * @returns {string[]} The paths without a leading /
 */
const coursePaths = (ending) => {
  if (typeof ending === 'undefined') { ending = ''; }
  return glob.sync(path.join(lessonSrcPath, '*/index.md'), {dot: true})
    .map(p => p.replace(new RegExp(`^${lessonSrcPath}/(.*)/index\\.md$`), '$1' + ending));
};

/**
 * Get paths to all lessons. Currently based on all "src / * / * /data.yml"
 * @param {string} ending Optional ending to be added at the end of the paths
 * @param {boolean} verbose Set to true for debug info
 * @returns {string[]} The paths without a leading /
 */
const lessonPaths = (ending, verbose) => {
  if (typeof ending === 'undefined') { ending = ''; }
  if (typeof verbose === 'undefined') { verbose = false; }
  const availableLanguages = yaml.load(path.join(lessonFiltertags, 'keys.yml')).language;
  if (verbose) {
    console.log('Available languages:', availableLanguages);
  }

  // Get list of all lessons as paths like 'scratch/astrokatt'
  const lessons = glob.sync(path.join(lessonSrcPath, '*/*/data.yml')).map(p => path.dirname(p));

  let paths = [];
  for (const lesson of lessons) {
    const lessonTranslations = glob.sync(path.join(lesson, '*.md'))
      .filter(p => !p.endsWith('index.md'))
      .filter(p => {
        try {
          const {title, external, language} = yamlFront.loadFront(fs.readFileSync(p));
          if (external) {
            if (verbose) {
              console.log('Skipping external lesson "' + title + '" (' + p + ')');
            }
            return false;
          }
          if (!language) {
            if (verbose) {
              console.warn('WARNING: Lesson "' + title + '" (' + p + ') has no language, skipping.');
            }
            return false;
          }
          if (!availableLanguages.includes(language)) {
            if (verbose) {
              console.log('NOTE: Lesson "' + title + '" (' + p + ') uses the language ' + language +
                ', which is not currently available, skipping.');
            }
            return false;
          }
          //console.log('OK:', language, title, p);
          return true;
        }
        catch (e) {
          console.error('Error while processing', p, ':', e);
          return false;
        }
      })
      .map(p => p.replace(new RegExp(`^(${lessonSrcPath}/)(.*)(\\.md)$`), '$2' + ending));
    paths = paths.concat(lessonTranslations);
  }
  return paths;
};

const getStaticSitePaths = (verbose) => {
  if (typeof verbose === 'undefined') { verbose = false; }

  // The '/' will render to '/index.html'
  const paths = [
    '/',  // '/' is the same as '/index.html'
    '/404.html',
  ];
  const courses = coursePaths('.html').map(p => '/' + p);
  const lessons = lessonPaths('.html').map(p => '/' + p);

  const staticPaths = paths.concat(courses).concat(lessons);

  if (verbose) {
    console.log('Static paths:');
    console.log(staticPaths);
  }

  return staticPaths;
};

module.exports.coursePaths = coursePaths;
module.exports.lessonPaths = lessonPaths;
module.exports.getStaticSitePaths = getStaticSitePaths;
