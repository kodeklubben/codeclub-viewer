import renderDynamic from './renderDynamic';
import renderStatic from './renderStatic';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if (typeof global.document !== 'undefined') {
  // Checks to see if the service worker API is available and we don't want to run this (or do we?) at localhost
  // Register service worker every time the site is loaded, and that's not a problem cause
  // The browser will figure out if the service worker is already registered or not and handle it accordingly
  // If it's already registered, it will check if the site has new content, then update the service serviceWorker
  // And the page is reloaded. Later this should be something the user should do if he/she wants to.
  new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
      runtime.register().then(reg => {
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
