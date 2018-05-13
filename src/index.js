import renderDynamic from './renderDynamic';
import renderStatic from './renderStatic';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if (typeof global.document !== 'undefined') {
  // Set !== for https: when debugging service worker and remember to delete the SW afterwards
  if (window.location.protocol === 'https:' && 'serviceWorker' in navigator) {
    runtime.register();
  }
  renderDynamic();
}

export default renderStatic;
