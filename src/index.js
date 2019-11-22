import renderDynamic from './renderDynamic';
import renderStatic from './renderStatic';
import {Workbox} from 'workbox-window';

if (typeof global.document !== 'undefined') {
  if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
      const wb = new Workbox('/sw.js');
      const updateButton = document.querySelector('#app-update');
      wb.addEventListener('waiting', event => {
        updateButton.style.display = 'block',
        updateButton.addEventListener('click', () => {
          wb.addEventListener('controlling', event => {
            window.location.reload();
          });
          wb.messageSW({ type: 'SKIP_WAITING' });
        });
      });
      wb.register();
    });
  }
  renderDynamic();
}

export default renderStatic;
