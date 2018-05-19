import renderDynamic from './renderDynamic';
import renderStatic from './renderStatic';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if (typeof global.document !== 'undefined') {
  if ('serviceWorker' in navigator) {
    runtime.register();
  }
  renderDynamic();
}

export default renderStatic;
