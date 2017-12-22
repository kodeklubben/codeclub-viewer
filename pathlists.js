const {lessonSrc, lessonFiltertags} = require('./buildconstants');
const path = require('path');
const yamlFront = require('yaml-front-matter');
const glob = require('glob');

// Need to replace backslashes with forward slashes on Windows, since glob keeps forward slashes
const lessonSrcPath = lessonSrc.replace(/\\/g, '/');


module.exports.coursePaths = (ending) => {
  if (typeof ending === 'undefined') { ending = ''; }
  return glob.sync(path.join(lessonSrcPath, '*/index.md'), {dot: true})
    .map(p => p.replace(new RegExp(`^${lessonSrcPath}/(.*)/index\\.md$`), '$1' + ending));
};

module.exports.lessonPaths = (verbose, ending) => {
  if (typeof verbose === 'undefined') { verbose = true; }
  if (typeof ending === 'undefined') { ending = ''; }
  const availableLanguages = yamlFront.loadFront(path.join(lessonFiltertags, 'keys.md')).language;
  console.log('Available languages:', availableLanguages);
  return glob.sync(path.join(lessonSrcPath, '*/*/*.md'))
    .filter(p => !p.endsWith('index.md'))
    .filter(p => {
      try {
        const {title, external, language} = yamlFront.loadFront(p);
        if (external) {
          if (verbose) {
            console.log('Skipping external course "' + title + '" (' + p + ')');
          }
          return false;
        }
        if (!language) {
          if (verbose) {
            console.warn('WARNING: Course "' + title + '" (' + p + ') has no language, skipping.');
          }
          return false;
        }
        if (availableLanguages.indexOf(language) === -1) {
          if (verbose) {
            console.log('NOTE: Course "' + title + '" (' + p + ') uses the language ' + language +
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
};
