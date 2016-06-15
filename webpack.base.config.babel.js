////////////////////////////////////////
// DEFINE GLOBAL VARIABLES FOR ESLINT //
////////////////////////////////////////
/* global  __dirname */


//////////////////////
// IMPORT / REQUIRE //
//////////////////////
import path from 'path';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';

import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItHeaderSections from 'markdown-it-header-sections';
import MarkdownItImplicitFigures from 'markdown-it-implicit-figures';


///////////////
// CONSTANTS //
///////////////
const lessonSrc = '../oppgaver/src';

// Loaders for lesson files written in markdown (.md)
const frontmatterLoaders = ['json', 'front-matter?onlyAttributes'];
const contentLoaders = ['html', 'markdown-it', 'front-matter?onlyBody'];


/////////////////////
// THE BASE CONFIG //
/////////////////////

const baseConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      lessonSrc: path.resolve(__dirname, lessonSrc)
    }
  },
  resolveLoader: {
    root: [path.resolve(__dirname, 'node_modules')],
    alias: {
      // Markdown-files are parsed only through one of these three aliases, and are
      // not parsed automatically by adding a loader with test /\.md$/ for two reasons:
      // 1) We don't want to use '!!' in the requires in the modules, and
      // 2) Since the lessons create a lot of data, we want to be sure that we only load
      //    what we need by being explicit in the requires, e.g. require('onlyFrontmatter!./file.md')
      //    It is even more important when using in require.context('onlyFrontmatter!./path', ....)
      'onlyFrontmatter': 'combine?' + JSON.stringify({frontmatter: frontmatterLoaders}),
      'onlyContent': 'combine?' + JSON.stringify({content: contentLoaders}),
      'frontAndContent': 'combine?' + JSON.stringify({
        frontmatter: frontmatterLoaders,
        content: contentLoaders
      })
    }
  },
  'markdown-it': {
    preset: 'commonmark',
    //typographer: true,
    use: [
      MarkdownItAnchor,
      MarkdownItAttrs,
      MarkdownItHeaderSections,
      MarkdownItImplicitFigures
    ]
  },
  plugins: [
    new ForceCaseSensitivityPlugin()
  ]
};

export default baseConfig;
