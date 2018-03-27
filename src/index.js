import './polyfills';

import renderDynamic from './renderDynamic';
import renderStatic from './renderStatic';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

if (typeof global.document !== 'undefined') {
  renderDynamic();
}

export default renderStatic;
