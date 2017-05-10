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
  let blockType = "";

  var options = {
    cssPath: cssPath,
    cwd: dir,
    preProcessMd: preProcessMD,
    preProcessHtml: preProcessHTML,
    remarkable: {
      preset: "commonmark",
      linkify: true,
      html: true,
      breaks: true,
      plugins: [ require('remarkable-classy') ],
      syntax: [ 'footnote', 'sup', 'sub' ]
    }
  }

  for (o in oppg) {
    //console.log(o)
    if (typeof(oppg[o]) === "undefined") {
      //console.log(oppg[o])
    }
    else {
      var to = "./pdf/test/" + oppg[o].split(".")[0] + ".pdf";
      //console.log(dir+"/"+oppg[o])
      markdownpdf(options)
        .from(dir+"/"+oppg[o])
        .to(to, function () { console.log("Done") })
    }
  }

  function preProcessMD () {
    var splitter = split()
    var replacer = through(function (data) {
      //console.log(data)
      if (inBlock) {
        if (data.match(/\s*```/)){
          this.queue(codeBlock(data)+'\n');
          block += 1;
          inBlock = false;
        }
        else {
          codeBlock(data);
        }
      }
      else if (data.match(/\s*```[a-zA-Z]+/) && !data.match(/```[a-zA-Z0-9\.:/]+```/) && inBlock === false) {
        blockType = data.replace(/(\s*)```([a-zA-Z]+)/, "$2");
        if (blockType != "blocks") {
          temp[block] = data.replace(/\s*(```[a-zA-Z]+)/, '$1')+" \n";
        }
        else {
          temp[block] = "\n"
        }
        inBlock = true;
      }

      else if (data.match(/---/)) {
        this.queue(data.replace(/---/, '') +'\n')
      }
      else if (data.match(/title: /)) {
        this.queue(data.replace(/(title: )\"?([^"]+)\"?/, '$2{title}') +'\n\n')
      }
      else if (data.match(/level: /)) {
        this.queue(data.replace(/(level: )\"?([0-9])\"?/, 'Level $2{icon-$2}') +'\n\n')
      }
      else if (data.match(/author: /)) {
        this.queue(data.replace(/(author: )\"?/, 'av ') +'{author}\n\n')
      }
      else if (data.match(/language:/)) {
        this.queue(data.replace(/(language: [a-zA-Z-]*)/, '') +'\n\n')
      }
      else if (data.match(/logo: /)) {
          this.queue(data.replace(/(logo: .*)/, '') +'\n\n')
      }
      else if (data.match(/license: /)) {
          this.queue(data.replace(/(license: .*)/, '') +'\n\n')
      }
      else if (data.match(/translator: /)) {
          this.queue(data.replace(/(translator: [a-zA-Z\s]*)/, '') +'\n\n')
      }

      // find a solution for any tag/ line with format
      // /#\s\{\.[a-zA-Z]*\}/
      else if (data.match(/#\sIntroduksjon\s\{\.intro\}/)) {
        this.queue(data.replace(/\{.intro\}/, "{intro} \n")+'\n');
      }
      else if (data.match(/#+\s?\{\.(pro)?tip\}/)) { //needs work
        this.queue(data.replace(/(#+\s?)\{.((pro)?tip)\}/, "$1\u0000 {$2}")+ "\n")
      }
      else if (data.match(/#+\s\{\.check\}/)) { //needs work
        this.queue(data.replace(/(#+)\s\{\.check\}/, "$1 \u0000 {check} ") +'\n');
      }
      else if (data.match(/#+[a-zA-ZæøåÆØÅ\s]\{\.[a-zA-Z]+\}/)) {
        this.queue(data.replace(/([a-zA-ZæøåÆØÅ\s])\{\.([a-zA-Z]*)\}/, "$1{$2} \n")+'\n')
      }

      // Links need some pre-processing
      //[`input()`]: https://docs.python.org/3.4/library/functions.html#input
      // [`split()`]: https://docs.python.org/3/library/stdtypes.html#str.split
      // the two links above broke, both from python huskespill

      // python kryptonøtt link at the end broke
      // [Hemmelige koder]: ../hemmelige_koder/hemmelige_koder.html

      // lopende_strekmann:
      // [`Actor`]: https://pygame-zero.readthedocs.org/en/latest/builtins.html?highlight=actor#actor
      //[Pygame Zero]: https://pygame-zero.readthedocs.org/
      //[`draw()`]: https://pygame-zero.readthedocs.org/en/latest/hooks.html?highlight=draw#draw
      //[`update()`]: https://pygame-zero.readthedocs.org/en/latest/hooks.html?highlight=update#update
      //[`on_key_down()`]: https://pygame-zero.readthedocs.org/en/latest/hooks.html?highlight=on_key_down#on_key_down
      //[`animate()`]: https://pygame-zero.readthedocs.org/en/latest/builtins.html?highlight=rect#animations

      else if (data.match(/\[`?[a-zA-Z\s\._-]+\(?\)?`?\]:\s?https?:\/\/.+/)) {
        console.log("asdfghjkl");
        this.queue(data.replace(/\[(\`?[a-zA-Z\s\._-]+\(?\)?\`?)\]:\s?(https?:\/\/.+)/, "[$1]($2)")+'\n');
      }
      else if (data.match(/\[.+\]:\s?..\/.+/)) {
        this.queue(data.replace(/(\[.+\]):\s(..\/.+)/, "$1$2\n") +'\n')
      }
      //[Gjør oppgaven Hvor er HTML? Jeg ser den ikke!](../../web/hvor_er_html/hvor_er_html.html)


      // lines containing no text after tags (/##\s\n/)

      else if (data == "#" || data == "##" || data == " ##") {
        this.queue(data.replace(/(\s?#{1,4})/, "$1 \u0000")+'\n')
      }

      else if (data.match(/(\{)\.([a-zA-Z]*\})/)) {
        this.queue(data.replace(/(\{)\.([a-zA-Z]*\})/g, '$1$2')+'\n')
      }
      else {
        this.queue(data+'\n');
      }
    })
    splitter.pipe(replacer)
    return duplexer(splitter, replacer)
  }

  function codeBlock(data) {
    if (blockType == "blocks" && data.match("```")) {
      return(renderScratchBlocks(temp[block]))
    }
    else if (!data.match(/```[a-zA-Z]+/) && data.match(/\s*```/)) {
      temp[block] += data;
      return(temp[block]);
    }
    else {
      temp[block] += data+'\n';
    }
  }

  function preProcessHTML () {
    var splitter = split();
    let section = false;
    let headingType = 0;
    inBlock = false;
    block = 0;
    var replacer = through(function (data) {
      console.log(data);
      if (section && headingType >= Number(data.replace(/<h([1-4]).*/, '$1'))) {
        section = false;
        data = '</section>\n\n'+data;
      }
      if (data.match(/<code>[æøåÆØÅa-zA-Z\s]*<\/code>\{block[a-z]*\}/g)) {
        //console.log(data);
        this.queue(data.replace(/(<code>)([æøåÆØÅa-zA-Z\s]*)(<\/code>\{)(block[a-z]*)\}/g, '<code class="$4">$2</code>') + '\n');
      }
      else if (data.match('<pre><code class="language-')) {
        inBlock = true;
        this.queue(data.replace(/\n/g, '<br>')+'\n');
      }
      else if (inBlock && !data.match("</code></pre>")) {
        this.queue(data.replace(/\n/g, '<br>')+'\n');
      }
      else if (inBlock && data.match("</code></pre>")) {
        this.queue(data);
        inBlock = false;
      }
      else if (data.match(/```[a-zA-Z]+/)) {
        this.queue(data.replace(/```([a-zA-Z]+)/, '<pre><code class="language-$1">'));
      }
      else if (data == "```") {
        this.queue(data.replace("```", "</code></pre>"))
      }
      else if (generateSection(data) != "") {
        section = true;
        headingType = Number(data.replace(/<h([1-4]).*/, '$1'));
        this.queue(generateSection(data));
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
  console.log("scratch render: " + content);
  var scratchblocks = require('scratchblocks');
  var svg = scratchblocks(content);

  return svg;
}

function generateCodeBlock(content) {
  console.log("CB: " + content);
  return content;
}

function generateSection(data) {
  if (data.match(/<h[1-4] class=\"(pro)?tip\">/)) {
    return(data.replace(/(<h[1-4]) (class=\"(pro)?tip\">)/, '\n<section $2$1>')+'\n');
  }
  else if (data.match(/<h[1-4] class=\"challenge\">/)) {
    return(data.replace(/(<h[1-4]) (class=\"challenge\">)/, '\n<section $2$1>')+'\n');
  }
  else if (data.match(/<h[1-4] class=\"try\">/)) {
    return(data.replace(/(<h[1-4]) (class=\"try\">)/, '\n<section $2$1>')+'\n');
  }
  return "";
}

function init() {
  const rootDir = "../oppgaver/src/"
  const dirs = getDirectories(rootDir);
  //buildPdf(rootDir+dirs);

  for (d in dirs) {
    subDirs = getDirectories(rootDir+dirs[d])
    for (sd in subDirs){
      buildPdf(rootDir+dirs[d]+"/"+subDirs[sd]);
      //console.log(dirs[d]+"/"+subDirs[sd]);
    }
  }
}

function getDirectories (rootDir) {
  //return "elm/01_prov_i_nettleser"
  const fs = require('fs')
  const path = require('path')
  return fs.readdirSync(rootDir)
    .filter(file => fs.statSync(path.join(rootDir, file)).isDirectory())
}

function getFileName(dir) {
  let subDirName = dir.split("/").pop().toLowerCase();
  const re = new RegExp(/(?!README(_[a-zA-Z]{2})?\.md$)[^\/]*\.md/);
  const fs = require('fs');

  return fs.readdirSync(dir)
    .filter(file => file.toLowerCase().match(re))
}

init();
