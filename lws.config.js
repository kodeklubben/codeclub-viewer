// See https://github.com/lwsjs/local-web-server/wiki/Configuration-Management

module.exports = {
  port: 8080,
  directory: './dist',
  compress: true,
  verbose: false,
  rewrite: [
    { from: /^(.*[/][^.]+)$/, to: '$1.html'}, // Fake github's behaviour, that with no extension, assume .html
  ],
};
