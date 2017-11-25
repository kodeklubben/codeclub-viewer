const {lessonSrc} = require('./buildconstants');
const path = require('path');
const yamlFront = require('yaml-front-matter');
const glob = require('glob');

// Need to replace backslashes with forward slashes on Windows, since glob keeps forward slashes
const lessonSrcPath = lessonSrc.replace(/\\/g, '/');


module.exports.coursePaths = () => {
  return glob.sync(path.join(lessonSrcPath, '*/index.md'), {dot: true})
    .map(p => p.replace(new RegExp(`^${lessonSrcPath}/(.*)/index\\.md$`), '$1/'));
};

module.exports.lessonPaths = (verbose, ending) => {
  if (typeof verbose === 'undefined') { verbose = true; }
  if (typeof ending === 'undefined') { ending = '/'; }
  return glob.sync(path.join(lessonSrcPath, '*/*/*.md'))
    .filter(p => !p.endsWith('index.md'))
    .filter(p => {
      try {
        const {title, external} = yamlFront.loadFront(p);
        if (verbose && external) {
          console.log('Skipping external course "' + title + '" (' + p + ')');
        }
        return !external;
      }
      catch (e) {
        console.log('Error while processing', p, ':', e);
        return false;
      }
    })
    .map(p => p.replace(new RegExp(`^(${lessonSrcPath}/)(.*)(\\.md)$`), '$2' + ending));
};
