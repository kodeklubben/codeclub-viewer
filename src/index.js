let exportFunc = () => {};

// Client render (optional):
if (typeof document !== 'undefined') {
  require('./index-dynamic').default();
} else {
  exportFunc = require('./index-static.js').default;
}

export default exportFunc;
