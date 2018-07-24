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
 * Get a translater function to get name of filter groups in current language
 * @param {object} state The redux state object
 * @returns {function} with params (groupKey), where
 *   param {string} groupKey The name of the filter group, e.g. 'language' or 'topic'
 *   returns {string} The translated name of the group, e.g. 'Språk' or 'Tema'
 */
export const getTranslateGroup = (state) => {
  const captions = require('lessonFiltertags/translation_' + state.language + '.yml');
  return (groupKey) => {
    const translatedGroup = (captions[groupKey] || {}).NAME;
    if (!translatedGroup) {
      console.warn(`Could not translate group with groupKey '${groupKey}'`);
      return '';
    }
    return translatedGroup;
  };
};

/**
 * Get a translater function to get name of filter tags in current language
 * @param {object} state The redux state object
 * @returns {function} with params (groupKey, tagKey), where
 *   param {string} groupKey The name of the filter group, e.g. 'language' or 'topic'
 *   param {string} tagKey The name of the filter tag, e.g. 'en' or 'game'
 *   returns {string} The translated name of the tag, e.g. 'Engelsk' or 'Spill'
 */
export const getTranslateTag = (state) => {
  const captions = require('lessonFiltertags/translation_' + state.language + '.yml');
  return (groupKey, tagKey) => {
    const translatedTag = (((captions[groupKey] || {}).TAGS || {})[tagKey] || {}).NAME;
    if (!translatedTag) {
      console.warn(`Could not translate tag with groupKey '${groupKey}' and tagKey '${tagKey}'`);
      return '';
    }
    return translatedTag;
  };
};

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
