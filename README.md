# codeclub-viewer
A viewer to display codeclub lessons.

## Getting started
First make sure you have [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/) installed.

### Install node
The easiest way is probably to first install
[nvm](https://github.com/creationix/nvm#installation) or [nvm-windows](https://github.com/coreybutler/nvm-windows).
Then install the version of node specified by the file `.nvmrc` by executing
```
nvm install
```
in the shell.

### Install yarn
Install yarn (preferably without node) as instructed on [the yarn website](https://yarnpkg.com/lang/en/docs/install/).

### Clone and start codeclub-viewer
When node and yarn are installed, just type
```
git clone https://github.com/kodeklubben/codeclub-viewer.git
git clone https://github.com/kodeklubben/oppgaver.git
cd codeclub-viewer
yarn
yarn start
```
Then open http://localhost:8080

NOTE: If you recently changed versions of node, and you get error messages during `yarn start` (or `yarn build`),
try deleting the `node_modules` folder and run `yarn` again to re-install it.

## Redux DevTools
If you want to use Redux DevTools, your best option is to download the
[Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).

## Building and serving
If you want to build and serve the website from static files (which is what is done during deploy), try
```
yarn build
yarn serve
```
for development mode or
```
yarn build:prod
yarn serve
```
for production mode.

## Running tests
To run all the tests, run
```
yarn testall
```
This will run the three commands `yarn eslint`, `yarn stylelint` and `yarn test`, each of which can be run individually.
