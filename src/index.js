import './polyfills';

import renderDynamic from './renderDynamic';
import renderStatic from './renderStatic';

if (typeof global.document !== 'undefined') {
  renderDynamic();
}

export default renderStatic;
