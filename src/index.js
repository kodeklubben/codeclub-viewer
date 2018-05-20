import renderDynamic from './renderDynamic';
import renderStatic from './renderStatic';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if (typeof global.document !== 'undefined') {
  new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
      runtime.register().then(reg => {
        reg.onupdatefound = () => {
          reg.installing.onstatechange = () => {
            switch (reg.installing.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  resolve(true);
                  location.reload();
                }
                else {
                  resolve(false);
                }
                break;
            }
          };
        };
      });
    }
  });
  renderDynamic();
}

export default renderStatic;
