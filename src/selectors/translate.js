/**
 * Get a translator function that gets captions in current language
 * @param {object} state The redux state object
 * @returns {function} with params (captionPath, replacements), where
 *   param {string} captionPath A dot-separated path to the caption, e.g. 'myPage.firstPanel.btnText'
 *   param {object} replacements Key-value pairs of replacements in the caption, e.g. {one:'cat', two:'dog'}
 *   returns {string} e.g. with example above if caption='{{one}} sees {{two}}' gives caption='cat sees dog'
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
          const pattern = new RegExp('{{' + repKey + '}}', 'gm'); // g=global, m=multiline
          cap = cap.replace(pattern, replacements[repKey]);
        }
      }
    }
    return cap;
  };
};

/**
 * Get a translater function to get filter groups, tags, and tooltips in current language
 * @param {object} state The redux state object
 * @returns {function} with params (groupKey, tagKey, showTagTooltip = false), where
 *   param {string} groupKey The name of the filter group, e.g. 'language' or 'topic'
 *   param {string} tagKey The name of the filter tag, e.g. 'en' or 'game'
 *   param {bool} showTagTooltip Set to true to get the tooltip of the tag.
 *   returns {string} The translated filter group, tag og tooltip of the tag, e.g. 'Tema', 'Spill', or 'Lage spill.'
 */
export const getTranslateFilter = (state) => {
  const captions = require('lessonFiltertags/translation_' + state.language + '.yml');
  return (groupKey, tagKey, showTagTooltip = false) => {
    const group = captions[groupKey] || {};
    if (!tagKey) {
      // return the translated group name
      if (!group['NAME']) {
        console.warn(`Could not translate group with groupKey '${groupKey}'`);
      }
      return group['NAME'] || '';
    } else {
      // else return the translated tag or tag tooltip
      const tag = (group['TAGS'] || {})[tagKey] || {};
      if (!tag['NAME'] && !showTagTooltip) {
        console.warn(`Could not translate tag with groupKey '${groupKey}' and tagKey '${tagKey}'`);
      }
      const nameOrTooltip = showTagTooltip ? 'TOOLTIP' : 'NAME';
      return tag[nameOrTooltip] || '';
    }
  };
};

/**
 * Get a translater function to get tooltip of filter tags in current language
 * @param {object} state The redux state object
 * @returns {function} with params (groupKey, tagKey), where
 *   param {string} groupKey The name of the filter group, e.g. 'language' or 'topic'
 *   param {string} tagKey The name of the filter tag, e.g. 'en' or 'game'
 *   returns {string} The translated tooltip of the tag, e.g. 'Engelsk' or 'Spill'
 */
export const getTranslateTooltip = (state) => {
  const captions = require('lessonFiltertags/translation_' + state.language + '.yml');
  return (groupKey, tagKey) => {
    const translatedTooltip = (((captions[groupKey] || {}).TAGS || {})[tagKey] || {}).TOOLTIP;
    if (!translatedTooltip) {
      return '';
    }
    return translatedTooltip;
  };
};
