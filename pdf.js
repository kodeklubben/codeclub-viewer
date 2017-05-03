function buildPdf() {
  var oppg = '../oppgaver/src/scratch/astrokatt/astrokatt.md'
  var dir = '../oppgaver/src/scratch/astrokatt/'
  var to = "./pdf/pdf.pdf"
  var cssPath = "./pdf/pdf.css"
  var markdownpdf = require("markdown-pdf")
    , fs = require("fs")
    , through = require("through")
    , split = require("split")
    , duplexer = require("duplexer")
  let block = 0;
  let inBlock = false;
  let temp = [];
  //createDOM();

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

  markdownpdf(options)
    .from(oppg)
    .to(to, function () { console.log("Done") })

  function preProcessMD () {
    var splitter = split()
    var replacer = through(function (data) {
      //console.log(data)
      if (data.match("```blocks") && inBlock === false) {
        console.log("dataMatch");
        temp[block] = "";
        inBlock = true;
      } 
      else if (data.match(/---/)) {
        this.queue(data.replace(/---/, '') +'\n')
      }
      else if (data.match(/title: /)) {
        this.queue(data.replace(/(title: )([a-zA-Z])/, '$2') +'{title}\n\n')
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
      /*else if (data.match(/\`[a-zA-Z\s]*\`\{\.block[a-z]*\}/)) {
        console.log('replaceBlock')
        this.queue(data.replace(/\`([a-zA-Z\s]*)\`\{\.(block[a-z]*)\}/g, '`{$2}$1`') +'\n')
      }*/
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
      } else {
        this.queue(data.replace(/({)\.([a-zA-Z]*})/g, '$1$2')+'\n')
      }
    })
    splitter.pipe(replacer)
    return duplexer(splitter, replacer)
  }
  
  function preProcessHTML () {
    var splitter = split()
    block = 0;
    var replacer = through(function (data) {
      console.log(data);
      if (data.match(/<code>[a-zA-Z\s]*<\/code>\{block[a-z]*\}/g)) {
        //console.log('replaceBlock');
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
  var fs = require('fs');

  var svg = scratchblocks(content);

  return svg;
}

buildPdf();
