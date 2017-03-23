/**
 *  The webpack static config file
 *  ------------------------------
 *
 *  Writes index.html files for all courses and all lessons, so that search engines can reach them,
 *  and as an alternative to server side rendering (static html files is possible since we don't
 *  have data in a database). After the initial index.html is loaded, the scripts take over and
 *  make it a single page app.
 *
 *  Note that (identical copies of) all images are output again, which isn't really necessary.
 *  Also the static-bundle.js isn't used for anything.
 *  If we could find a way of not outputting these files (only the html files) during build,
 *  that would be good.
 *
 */


////////////////////////////////////////
// DEFINE GLOBAL VARIABLES FOR ESLINT //
////////////////////////////////////////

/* eslint-env node */


//////////////////////
// IMPORT / REQUIRE //
//////////////////////

import baseConfig, {lessonSrc, buildDir} from './webpack.base.config.babel';
import path from 'path';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';


///////////////
// CONSTANTS //
///////////////

const scope = {window: {}};
const locals = {};


///////////////
// FUNCTIONS //
///////////////

function getStaticSitePaths() {
  const glob = require('glob');
  const absLessonSrc = path.resolve(__dirname, lessonSrc);

  const coursePaths = glob.sync(path.join(absLessonSrc, '*/'), {dot: true})
    .map(p => p.replace(new RegExp(`^(${absLessonSrc}\/)(.*)(\/)$`), '$2'));

  const lessonPaths = glob.sync(path.join(absLessonSrc, '*/*/*.md'))
    .filter(p => !p.endsWith('index.md') && !p.endsWith('README.md'))
    .map(p => p.replace(new RegExp(`^(${absLessonSrc}\/)(.*)(\.md)$`), '$2'));

  const staticPaths = ['/'].concat(coursePaths).concat(lessonPaths);

  console.log('Static paths:');
  console.log(staticPaths);

  // [
  //   '/scratch',
  //    ... (more courses)
  //   'scratch/3d_flakser/3d_flakser_1',
  //    ... (more lessons)
  // ]

  return staticPaths;
}


///////////////////////
// THE ACTUAL CONFIG //
///////////////////////

const config = {
  ...baseConfig,
  entry: {
    staticbundle: './src/index-static.js'
  },
  output: {
    ...baseConfig.output,
    filename: 'static-bundle.js',
    // static-site-generator must have files compiled to UMD or CommonJS
    // so they can be required in a Node context:
    libraryTarget: 'umd'
  },
  resolve: {
    ...baseConfig.resolve,
    alias: {
      ...baseConfig.resolve.alias,
      buildDir: path.resolve(__dirname, buildDir)
    }
  },
  plugins: [
    ...baseConfig.plugins,
    new StaticSiteGeneratorPlugin('staticbundle', getStaticSitePaths(), locals, scope)
  ]
};

export default config;
