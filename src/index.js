import renderDynamic from './renderDynamic';
import renderStatic from './renderStatic';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if (typeof global.document !== 'undefined') {
  new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator) {
      runtime.register()
        .then(reg => {
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
              switch (installingWorker.state) {
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
