# codeclub-viewer
A viewer to display codeclub lessons

## Getting started
```
git clone https://github.com/NorwegianKiwi/codeclub-viewer.git
git clone https://github.com/kodeklubben/oppgaver.git
cd codeclub-viewer
npm install
npm start
```

## Building with sourcemaps (and serving)
```
npm run build
npm serve
```

## Building for production (and serving)
```
npm run build:prod
npm serve
```

## Running tests
```
npm run test
```

## Running eslint
To check that the code is formatted correctly, run
```
npm run eslint
```

## TODO
Prøve følgende kode i routes.js:
```
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
```
