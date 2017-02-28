
export function buildPDF() {
  const jsPDF = require('jspdf');
  const html2canvas = require('html2canvas');
  let converter = new jsPDF('p', 'pt', 'letter');
  let html = document.getElementsByTagName("body")[0];
  console.log(html2canvas);

  converter.addHTML(html2canvas(html), 15, 15, {
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