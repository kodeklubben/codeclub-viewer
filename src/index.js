import './polyfills';
import renderDynamic from './renderDynamic';
import renderStatic from './renderStatic';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

if (typeof global.document !== 'undefined') {
  OfflinePluginRuntime.install();
  renderDynamic();
}

export default renderStatic;
