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
Suggestion: See if we can make a template in webpack (with HtmlWebpackPlugin?) that we can serve
as a template via locals to StaticSiteGeneratorPlugin. The point is that we need to load main.js,
vendor.js etc in the html-files.

Update: Getting closer. Think I have Frontpage and Playlist ok. Still need to make lessonpage work, since we implicitly
are doing a require.ensure by using the funky path.
Also still missing css in assets, but see if PR gets pulled in or what...