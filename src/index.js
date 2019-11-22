import renderDynamic from './renderDynamic';
import renderStatic from './renderStatic';
import {Workbox} from 'workbox-window';

if (typeof global.document !== 'undefined') {
  if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
      const wb = new Workbox('/sw.js');
      wb.register();
    });
  }
  renderDynamic();
}

export default renderStatic;
