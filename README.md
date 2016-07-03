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
## Redux DevTools
Download [Chrome Extension here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## Building and serving
This requires that you install http-server globally:
```
npm install -g http-server
```

### Building and serving with sourcemaps
```
npm run build
npm run serve
```

### Building and serving for production
```
npm run build:prod
npm run serve
```

### Building and serving without using static html-files
No real reason to do this, but possible. Here the files are served using a node express server.
It should work both when only doing `npm run buildjs` and when doing the full `npm run build`:
```
npm run buildjs
npm run servejs
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

## State Tree
![State Tree](/State Tree.png)

## Prototyping
A prototype framework for codeclub-viewer can be found at https://github.com/NorwegianKiwi/codeclub-viewer-prototype.

## TODO
We are now generating staticsite.static.[hash].js and all the images one more time during generation
of html files in `npm run build:static`, which is unnecessary. The js-file is not used, since this code
already exists in main, vendor, etc., and the images already exist (all of this created during the first
part of the build, `npm run build`).
It doesn't matter, but more elegant if we didn't emit/produce these files during static html generation.

Perhaps we could merge this with the serving-lazy-branch, so that it is possible to run this on a node-server as well?

Of course, we still need to create (or transfer) css and functionality from codeclub_lesson_builder, and/or
create the new design.

Other things:
* Make last part of breadcrumb unclickable.
* See github issues.
