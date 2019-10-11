import {hashCode} from './util';
import store from '../store';
import {setCheckbox, removeCheckbox} from '../reducers/checkboxes';

/**
 * Get a string used to store checkboxes in localstorage
 * @param {string} path e.g. './path/to/file.md' or '/path/to/file' or 'path/to/file.md'
 * @returns {string} e.g. 'checkboxes_path/to/file'
 */
export const createCheckboxesKey = (path = 'undefined') => {
  path = path.match(/^\.?\/?(.*?)(?:\.md)?$/)[1]; // Remove . or / or ./ from beginning and .md from end
  return 'checkboxes_' + path;
};

/**
 * Finds every checkbox in the lesson and updates the state of it.
 * @param {string} path path for the lesson
 * @param {object} checkboxes checkbox object in state
 */
export const setCheckboxesInDoc = (path, checkboxes) => {
  const hashes = new Set(Object.keys(checkboxes));
  const labels = [...document.getElementsByTagName('label')];
  for (let label of labels) {
    const input = document.getElementById(label.htmlFor);
    if (input && input.type === 'checkbox') {
      let hash = hashCode(label.textContent).toString(); // js converts ints to strings in objects, so do it explicitly
      if (hash in checkboxes) {
        input.checked = !!checkboxes[hash];
        hashes.delete(hash);
      } else {
        input.checked = false;
        store.dispatch(setCheckbox(path, hash, false));
      }
      input.onclick = (e) => {
        store.dispatch(setCheckbox(path, hash, !!e.target.checked));
      };
    }
  }
  for (let hash of hashes) {
    // Remove any stored checkboxes that don't exist anymore, e.g. because content changed
    store.dispatch(removeCheckbox(path, hash));
  }
};

/**
 * Checks every checkbox and see if it's checked or not
 * @param {object} checkboxes checkbox object in state
 * @returns {boolean}
 */
export const anyCheckboxTrue = (checkboxes) => {
  for (let i of Object.keys(checkboxes)) {
    if (checkboxes[i] === true) {
      return true;
    }
  }
  return false;
};
