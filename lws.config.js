// See https://github.com/lwsjs/local-web-server/wiki/Configuration-Management

module.exports = {
  port: 8080,
  directory: './dist',
  compress: true,
  verbose: false,
  rewrite: [
    // Fake github's behaviour, that with no extension, assume .html
    { from: /^(.*[/][^.]+)$/, to: '$1.html'},           // .../file       --> .../file.html
    { from: /^(.*[/][^.]+)\?(.+)$/, to: '$1.html?$2'},  // .../file?query --> .../file.html?query
  ],
};
