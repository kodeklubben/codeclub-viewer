# codeclub-viewer
A viewer to display codeclub lessons

## Getting started
First make sure you have [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/) installed.

The easiest way is probably to first install
[nvm](https://github.com/creationix/nvm#installation) or [nvm-windows](https://github.com/coreybutler/nvm-windows).
Then install node version 7 by writing `nvm install 7`.
Finally install yarn as instructed on [the yarn website](https://yarnpkg.com/lang/en/docs/install/).

When yarn is installed, just type
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
Download [Chrome Extension here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## Building and serving
Is you want to build and serve the website from static files, try
```
yarn build
yarn serve
```

If you want to build the website as it is in production, switch `yarn build` with `yarn build:prod`.

### Building and serving without using static html-files
No real reason to do this, but possible. Here the files are served using a node express server.
It should work both when only doing `yarn run buildjs` and then doing the full `yarn run build`:
```
yarn buildjs
yarn servejs
```

## Running tests
To run all the tests, run
```
yarn testall
```
This will run the three commands `yarn eslint`, `yarn stylelint` and `yarn test`, each of which can be run individually.

## Publish website (to beta)
To publish the website to the [beta repository](https://github.com/kodeklubben/beta),
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


## TODO
We are now generating staticsite.static.[hash].js and all the images one more time during generation
of html files in `yarn build:static`, which is unnecessary. The js-file is not used, since this code
already exists in main, vendor, etc., and the images already exist (all of this created during the first
part of the build, `yarn build`).
It doesn't matter, but more elegant if we didn't emit/produce these files during static html generation.

Perhaps we could merge this with the serving-lazy-branch, so that it is possible to run this on a node-server as well?

Of course, we still need to create (or transfer) css and functionality from codeclub_lesson_builder, and/or
create the new design.

