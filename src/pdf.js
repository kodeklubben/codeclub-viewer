export function buildPDF() {

  const jsPDF = require('jspdf');
  const html2canvas = require('html2canvas');
  
  let html = document.getElementsByTagName("body")[0].querySelectorAll("[class^=Lesson__container]");

  html2canvas(html, {
    allowTaint: true,
    onrendered: function(canvas) {
      let converter = new jsPDF('p', 'mm', 'a4');
      let width = converter.internal.pageSize.width;
      let height = converter.internal.pageSize.height;

      let i = new Image();
      i.src = canvas.toDataURL('image/png');
      console.log("converted");
      i.onload = function() {
        callback(i);
      };
      const ratio = (canvas.width/width);

      let canvasTemp = document.createElement('canvas');
      canvasTemp.height = height*ratio;
      canvasTemp.width = canvas.width;

      for (let page = 0; page*ratio<(canvas.height/height); page++) {
        if (page != 0) {
          converter.addPage();
        }
        canvasTemp.getContext('2d').clearRect(0, 0, canvasTemp.width, canvasTemp.height);
        
        canvasTemp.getContext('2d').drawImage(i, 0, page*height*ratio, canvas.width, height*ratio, 0, 0, canvas.width, canvasTemp.height);
        let iTemp = canvasTemp.toDataURL('image/png');
        converter.addImage(iTemp, 'PNG', 0, 0, width, height);
      }
      converter.save('a4.pdf');
    }
  });
}