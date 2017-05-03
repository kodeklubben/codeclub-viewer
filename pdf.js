function buildPdf(dir) {
  var oppg = getFileName(dir);
  var cssPath = "./pdf/pdf.css";
  var markdownpdf = require("markdown-pdf")
    , fs = require("fs")
    , through = require("through")
    , split = require("split")
    , duplexer = require("duplexer")
  let block = 0;
  let inBlock = false;
  let temp = [];

  var options = {
    cssPath: cssPath,
    cwd: dir,
    preProcessMd: preProcessMD,
    preProcessHtml: preProcessHTML,
    remarkable: {
        html: true,
        breaks: true,
        plugins: [ require('remarkable-classy') ],
    syntax: [ 'footnote', 'sup', 'sub' ]
    }
  }

  for (o in oppg) {
    //console.log(o)
    if (typeof(oppg[o]) === "undefined") {
      console.log(oppg[o])
    }
    else {
      var to = "./pdf/test/" + oppg[o].split(".")[0] + ".pdf";
      console.log(dir+"/"+oppg[o])
      markdownpdf(options)
        .from(dir+"/"+oppg[o])
        .to(to, function () { console.log("Done") })
      }
    }

  function preProcessMD () {
    var splitter = split()
    var replacer = through(function (data) {
      console.log(data)
      if (data.match("```blocks") && inBlock === false) {
        console.log("dataMatch");
        temp[block] = "";
        inBlock = true;
      }
      else if (data.match(/---/)) {
        this.queue(data.replace(/---/, '') +'\n')
      }
      else if (data.match(/title: /)) {
        this.queue(data.replace(/(title: )([æøåÆØÅa-zA-Z])/, '$2') +'{title}\n\n')
      } 
      else if (data.match(/level: /)) {
        this.queue(data.replace(/(level: )([0-9])/, 'Level $2{icon-$2}') +'\n\n')
      } 
      else if (data.match(/author: /)) {
        this.queue(data.replace(/(author: )/, 'av ') +'{author}\n')
      } 
      else if (data.match(/language:/)) {
        this.queue(data.replace(/(language: [a-zA-Z]*)/, '') +'\n')
      }
      else if (inBlock) {
        if (!data.match("```blocks") && data.match("```")) {
          console.log("renderScratchBlocks")
          //temp[block] += data+"\n";
          this.queue(renderScratchBlocks(temp[block]));
          block += 1;
          inBlock = false;
        } else {
          temp[block] += data+"\n";
        }
      }
      else if (data.match(/\{\.protip\}/)) {
        this.queue(data.replace(/\{.protip\}/, "")+"\n")
      }
      else if (data.match(/\{\.check\}/)) {
	      this.queue(data.replace(/\{\.check\}/, "")+'\n');
      }
      else if (data.match(/({)\.([a-zA-Z]*})/)) {
        this.queue(data.replace(/({)\.([a-zA-Z]*})/g, '$1$2')+'\n')
      }
      else {
        this.queue(data+'\n');
      }
    })
    splitter.pipe(replacer)
    return duplexer(splitter, replacer)
  }
  
  function preProcessHTML () {
    var splitter = split()
    block = 0;
    var replacer = through(function (data) {
      //console.log(data);
      if (data.match(/<code>[æøåÆØÅa-zA-Z\s]*<\/code>\{block[a-z]*\}/g)) {
        console.log(data);
        this.queue(data.replace(/(<code>)([æøåÆØÅa-zA-Z\s]*)(<\/code>\{)(block[a-z]*)\}/g, '<code class="$4">$2</code>') + '\n');
      }
       else {
        this.queue(data);
      }
    })
    splitter.pipe(replacer)
    return duplexer(splitter, replacer)
  }
}

function renderScratchBlocks(content) {
  var scratchblocks = require('scratchblocks');
  var svg = scratchblocks(content);

  return svg;
}

function init() {
  const rootDir = "../oppgaver/src/"
  const dirs = getDirectories(rootDir);

  for (d in dirs) {
    subDirs = getDirectories(rootDir+dirs[d])
    for (sd in subDirs){
      buildPdf(rootDir+dirs[d]+"/"+subDirs[sd]);
      //console.log(dirs[d]+"/"+subDirs[sd]);
    }
  }
}

function getDirectories (rootDir) {
  const fs = require('fs')
  const path = require('path')
  return fs.readdirSync(rootDir)
    .filter(file => fs.statSync(path.join(rootDir, file)).isDirectory())
}

function getFileName(dir) {
  let subDirName = dir.split("/").pop().toLowerCase();
  const re = new RegExp(subDirName + "[0-9]*\.md")
  const fs = require('fs');

  return fs.readdirSync(dir)
    .filter(file => file.toLowerCase().match(re))
}

init();
