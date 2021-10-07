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

## Publish website (to beta)
You can publish to the [beta repository](https://github.com/kodeklubben/beta),
first make sure you have a [fork of it](https://help.github.com/articles/fork-a-repo/).
Then make a local clone of the `beta` fork next to `codeclub-viewer` and `oppgaver`
([using SSH URL](https://help.github.com/articles/which-remote-url-should-i-use/)).
For example, if your github username is `gituser` and you have forked the `beta` repo to this user,
and you have a terminal open and you are located in the `codeclub-viewer` folder, type
```
cd ..
git clone git@github.com:gituser/beta.git
```

Now return to the `codeclub-viewer` folder (`cd codeclub-viewer`), type
```
./publish_beta.sh
```
and follow the instructions. If everything is ok, and you answer `y` to all the questions, the newly compiled
website will be pushed to your `beta` fork, and (if your username is `gituser`) you can test the site at
```
gituser.github.io/beta
```
If you are satisfied and want to publish the new website to the official `beta` repo, make a pull request from the `gh-pages` branch
of your `beta` fork to the `gh-pages` branch of `kodeklubben/beta`.
