export function buildPDF() {
/*
  var head = document.getElementsByTagName('head')[0];
  var script_pdf = document.createElement('script');
  var script_canvas = document.createElement('script');
  script_canvas.type = 'text/javascript';
  script_pdf.type = 'text/javascript';
  script_pdf.src = '../../node_modules/jspdf/jspdf.debug.js';
  script_canvas.src = '../../node_modules/html2canvas/html2canvas.js';
  head.appendChild(script_pdf);
  head.appendChild(script_canvas);*/

  const jsPDF = require('jspdf');
  const html2canvas = require('html2canvas');


  
  //let html = document.getElementsByTagName("body")[0];
  let html = document.getElementsByTagName("body")[0].querySelectorAll("[class^=Lesson__container]");

  //var canvas = html2canvas(html);


  html2canvas(html, {
    allowTaint: !false,
    onrendered: function(canvas) {
      let converter = new jsPDF('p', 'mm');//, [canvas.width, canvas.height]);
      //converter.fromHTML(`<canvas>${canvas}</canvas>`);
      let image = new Image();
      image.src = canvas.toDataURL('image/jpeg');
      console.log("converted");

      /*image.onload = function() {
        callback(image);
      };

      /*let pageHeight = converter.internal.pageSize.height;
      var height = canvas.height;
      let y = 0 // Height position of new content
      let i = 1;
      while (height>=y*i) {
        if (y >= pageHeight) {
          converter.addImage(image, 'JPEG', 0, y*i, 0, 0);
          converter.addPage();
          y = 0 // Restart height position
          i+=1;
        }
        y+=1;
      }*/

      converter.addImage(image, 'JPEG', 0, 0);//, canvas.width, canvas.height);
      console.log('added');
      document.body.appendChild(canvas);
      console.log('added child');
      converter.save('a4.pdf');
    }
  });


  //let con = document.getElementById('canvas').toDataURL('image/png');
  //converter.addImage(con, 'PNG', 15, 40, 180, 160);


/*
  converter.addHTML(canvas, 15, 15, null, {
    'width': 170,
  }, function() {converter.save('a4.pdf');});

  /*converter.addHTML(html2canvas(html, {
    onrendered: function(canvas) {
      return canvas;
    }
  }), 15, 15, {
    'width': 170,
  },function() {  converter.save('a4.pdf');});*/
}