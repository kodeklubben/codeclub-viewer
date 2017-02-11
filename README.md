# codeclub-viewer
A viewer to display codeclub lessons

## Getting started
First make sure you have [node](https://nodejs.org/en/) and
[yarn](https://code.facebook.com/posts/1840075619545360) installed.

The easiest way is probably to first install
[nvm](https://github.com/creationix/nvm#installation). Then install
node version 6 by writing `nvm install 6`. Finally install yarn by
typing `npm install -g yarn`. (Note that if you update to a newer version
of node using nvm, you probably need to install yarn again too).

On OSX, if you have [brew](http://brew.sh/) installed, you could just do
`brew install yarn` (it might be smart to do a `brew update` first).
This will also install node.

When yarn is installed, just type
```
git clone https://github.com/kodeklubben/codeclub-viewer.git
git clone https://github.com/kodeklubben/oppgaver.git
cd codeclub-viewer
yarn
yarn start
```
Then open http://localhost:8080

## Redux DevTools
Download [Chrome Extension here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## Building and serving
This requires that you install local-web-server globally:
```
yarn global add local-web-server
```

### Building and serving with sourcemaps
```
yarn run build
yarn run serve
```

### Building and serving for production
```
yarn run build:prod
yarn run serve
```

### Building and serving without using static html-files
No real reason to do this, but possible. Here the files are served using a node express server.
It should work both when only doing `yarn run buildjs` and then doing the full `yarn run build`:
```
yarn run buildjs
yarn run servejs
```

## Running tests
```
yarn run test
```

## Running eslint
To check that the code is formatted correctly, run
```
yarn run eslint
```

## Running stylelint
To check that the styling is formatted correctly, run
```
yarn run stylelint
```

## Running eslint, stylelint and tests
```
yarn run testall
```

## State Tree
![State Tree](/diagrams/State Tree.png)

## Prototyping
A prototype framework for codeclub-viewer can be found at https://github.com/NorwegianKiwi/codeclub-viewer-prototype.

## TODO
We are now generating staticsite.static.[hash].js and all the images one more time during generation
of html files in `yarn run build:static`, which is unnecessary. The js-file is not used, since this code
already exists in main, vendor, etc., and the images already exist (all of this created during the first
part of the build, `yarn run build`).
It doesn't matter, but more elegant if we didn't emit/produce these files during static html generation.

Perhaps we could merge this with the serving-lazy-branch, so that it is possible to run this on a node-server as well?

Of course, we still need to create (or transfer) css and functionality from codeclub_lesson_builder, and/or
create the new design.

