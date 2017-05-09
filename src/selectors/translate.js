/**
 * @param captionPath (string) A dot-separated path to the caption, e.g. 'myPage.firstPanel.btnText'
 * @param replacements (object) Key-value pairs of replacements in the caption,
 *   e.g. cap='{{one}} or {{two}}' and replacement={one:'cat', two:'dog'} gives cap='cat or dog'
 * @returns {*}
 */

export const getTranslator = (state) => {
  return (captionPath, replacements) => {
    const captions = require('../constants/captions_' + state.language + '.js').default;
    const caps = captions;
    if (!captionPath || (typeof captionPath !== 'string')) {
      console.error(`ERROR: path should be string (was ${typeof captionPath})`);
      return null;
    }
    const keyArr = captionPath.split('.');
    let cap = caps;
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
  }
};
