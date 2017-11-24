/**
 * @param {object} state
 * @returns {function} with params (captionPath, replacements), where
 *   param {string} captionPath A dot-separated path to the caption, e.g. 'myPage.firstPanel.btnText'
 *   param {object} replacements Key-value pairs of replacements in the caption,
 *     e.g. cap='{{one}} or {{two}}' and replacement={one:'cat', two:'dog'} gives cap='cat or dog'
 */

export const getTranslator = (state) => {
  const captions = require('../constants/captions_' + state.language + '.js').default;
  return (captionPath, replacements) => {
    if (!captionPath || (typeof captionPath !== 'string')) {
      console.error(`ERROR: path should be string (was ${typeof captionPath})`);
      return null;
    }
    const keyArr = captionPath.split('.');
    let cap = captions;
    for(let key of keyArr) {
      if (cap) {
        cap = cap[key];
      }
    }
    if (typeof cap !== 'string' && typeof cap !== 'number') {
      // Non-existent path, return caption=captionPath
      cap = captionPath;
    }

    // Replace {{key}} with replacements[key] in caption
    if (cap && replacements) {
      for (let repKey in replacements) {
        if (replacements.hasOwnProperty(repKey)) {
          const pattern = new RegExp('\\\{\\\{' + repKey + '\\\}\\\}', 'gm'); // g=global, m=multiline
          cap = cap.replace(pattern, replacements[repKey]);
        }
      }
    }
    return cap;
  };
};

//const keys = require('onlyFrontmatter!lessonFiltertags/keys.md').frontmatter;
//console.log('keys', keys);

// XXX: kobinere getTranslateGroup og getTranslateTag til getTranslateFilter?
// Og trenger vi keys.md? Burde vi bruke den til å sjekke at alle keys er skrevet riktig i courses og lessons?
// ...og finn ut hvorfor det bare er programmering og musikk under fag
// ... har det noe med hvor den får hvilke tags den skal vise? Kanskje den prosessen burde bruke keys.md
//     fra oppgaverepo?
// Og så kanskje (evt lage eget issue) lage en egen fil med funksjoner der man kan be om forskjellig innhold fra
// oppgave-repo, slik at man får samlet alle contexts alle steder. Og da kan man lage en "fake" for
// testene.

export const getTranslateGroup = (state) => {
  const captions = require('onlyFrontmatter!lessonFiltertags/translation_' + state.language + '.md').frontmatter;
  return (groupKey) => {
    const translatedGroup = (captions[groupKey] || {}).NAME;
    if (!translatedGroup) {
      console.warn(`Could not translate group with groupKey '${groupKey}'`);
      return '';
    }
    return translatedGroup;
  };
};

export const getTranslateTag = (state) => {
  const captions = require('onlyFrontmatter!lessonFiltertags/translation_' + state.language + '.md').frontmatter;
  console.log('captions', captions);
  return (groupKey, tagKey) => {
    console.log('groupKey, tagKey', groupKey, tagKey);
    const translatedTag = (((captions[groupKey] || {}).TAGS || {})[tagKey] || {}).NAME;
    if (!translatedTag) {
      console.warn(`Could not translate tag with groupKey '${groupKey}' and tagKey '${tagKey}'`);
      return '';
    }
    return translatedTag;
  };
};
