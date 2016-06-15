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
npm run buildall
npm serve
```

## Building for production (and serving)
```
npm run buildall:prod
npm serve
```

## Running tests
```
npm run test -s
```
The `-s` is to remove npm-errors and just show errors from the test.

## Running eslint
To check that the code is formatted correctly, run
```
npm run eslint -s
```
The `-s` is to remove npm-errors and just show errors from the test.

## Running both eslint and tests
```
npm run testall -s
```
The `-s` is to remove npm-errors and just show errors from the test.


## TODO
We are now generating staticsite.static.[hash].js and all the images one more time during generation
of html files in `npm run build:static`, which is unnecessary. The js-file is not used, since this code
already exists in main, vendor, etc., and the images already exist (all of this created during the first
part of the build, `npm run build`).
It doesn't matter, but more elegant if we didn't emit/produce these files during static html generation.

Perhaps we could merge this with the serving-lazy-branch, so that it is possible to run this on a node-server as well?

Of course, we still need to create (or transfer) css and functionality from codeclub_lesson_builder, and/or
create the new design.
