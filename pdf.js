function buildPdf() {
  var oppg = '../oppgaver/src/scratch/astrokatt/astrokatt.md'
  var dir = '../oppgaver/src/scratch/astrokatt/'
  var to = "./pdf/pdf.pdf"
  var cssPath = "./pdf/pdf.css"
  var scratchblocks = require("scratchblocks/browser/scratchblocks.js")
  var markdownpdf = require("markdown-pdf")
    , fs = require("fs")
    , through = require("through")
    , split = require("split")
    , duplexer = require("duplexer")
  let block = false;
  let temp = "";

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
      if (data.match("```blocks") && block === false) {
        temp = "{blocks}";
        block = true;
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
      else if (block) {
        if (!data.match("```blocks") && data.match("```")) {
          temp += data+"\n";
          console.log(temp);
          processContent(temp, jsonCSS);
          block = false;
        } else {
          temp += data+"\n";
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
    var replacer = through(function (data) {


      /*if (data.match(/\`([a-zA-Z])\`\{\.block.*\}/)) {
        this.queue(data.replace(/\`([a-zA-Z])\`\{\.(block.*\)})/, '<code class="$2">$1') +'</code>\n')
      }*/

      //console.log(hex2a(data.toString("hex")))
      console.log(data);
      if (data.match(/<code>.*<\/code>{block[a-z]*}/)) {
        //console.log('replace');
        this.queue(data.replace(/(<code>)(.*)(<\/code>)\{(block[a-z]*)\}/, '<code class="$4">$2</code>')+'\n')
      } else {
        this.queue(data);
      }
    })
    splitter.pipe(replacer)
    return duplexer(splitter, replacer)
  }
}

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}




const jsonCSS = {
  "blocks": {
    "background-color": "inherit",
    "border": 0
  },
  "b": {
    "background-color": "inherit",
    "border": 0
  }
}

function processContent(content, styles) {
  const parser = require('posthtml-parser');
  const render = require('posthtml-render');

  let parsedContent = parser(content);
  parsedContent = replaceClassRecursively(parsedContent, styles);
  content = render(parsedContent);
  content = renderScratchBlocks(content, styles);
  return content;
}

function replaceTagObject(obj) {
  /*const tag = obj['tag'];
  if (tag in replaceTags) {
    const replacementObj = replaceTags[tag];
    return {
      ...obj,
      tag: replacementObj['tag'],
      attrs: {...obj['attrs'], ...replacementObj['attrs']}
    };
  } else {
    return obj;
  }*/
  return obj;
}

function replaceClassRecursively(obj, styles) {
  if (Array.isArray(obj)) {
    return obj.map((val, idx) => replaceClassRecursively(val, styles));
  } else if (typeof obj === 'object' && obj !== null) {
    const repObj = replaceTagObject(obj);
    let newObj = {};
    for (let k in repObj) {
      if (repObj.hasOwnProperty(k)) {
        if (k === 'class' && repObj[k] in styles) {
          newObj[k] = styles[repObj[k]];
        } else {
          newObj[k] = replaceClassRecursively(repObj[k], styles);
        }
      }
    }
    return newObj;
  } else {
    return obj;
  }
}


/**
 * Render scratchblocks.
 *
 * @param content {string} HTML with <pre class="blocks">...</pre>
 * @returns {string} <pre class="blocks">...</pre> replaced with SVG
 */
function renderScratchBlocks(content, styles) {
  let replace = [];
  if ('blocks' in styles) {
    replace.push({start: '<pre class="' + styles.blocks + '">', end: '</pre>'});
  }
  if ('b' in styles) {
    replace.push({start: '<code class="' + styles.b + '">', end: '</code>', options: {inline: true}});
  }

  let returnContent = content;
  replace.forEach(r => {
    const re = new RegExp(r.start + '[\\s\\S]*?' + r.end, 'g');

    let blocks = content.match(re);
    if (blocks) {
      blocks.forEach(block => {
        let code = block.substring(r.start.length, block.length - r.end.length);
        let SVG = scratchblocks(code, r.options);
        returnContent = returnContent.replace(block, SVG);
      });
    }
  });

  return returnContent;
}


buildPdf();
