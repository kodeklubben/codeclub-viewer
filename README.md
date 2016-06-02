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

## Prototyping
There is a [structor](https://github.com/ipselon/structor) prototype of the new site in the prototype folder.
(It was based on [bootstrap-prepack](https://github.com/ipselon/bootstrap-prepack).)

To look at or modify the prototype, you first have to `cd prototype` and then
```
npm install
```
The following instructions about the prototype assumes you are in the prototype folder.

If you want to just look at the exported prototype, just type
```
node ./server.js
```
Then go to your browser and type `localhost:3000` in the address bar.

If you want to play with the prototype, and make changes, first install structor globally:
```
npm install -g structor
```
Then run it by typing
```
structor
```
Then go to your browser and type `localhost:2222/structor`. Make changes, and preview the site right in the editor.
Don't forget to save your work before quitting. If you want to test it out "for real",
choose `export project` (instead of save), and then go to the commandline and write
```
npm run build
node ./server.js
```
and go to your browser and type `localhost:3000` in your address bar.

If you make changes you are happy about, create a pull-request.
