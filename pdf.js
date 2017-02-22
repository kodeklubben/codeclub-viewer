export function buildPDF() {
  let jspdfLink = document.createElement("script");
  jspdfLink.addEventListener("load", proceed); // pass my hoisted function
  jspdfLink.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.debug.js';
  document.querySelector("head").appendChild(jspdfLink);
  console.log("loaded script");

  function proceed (state) {
    var specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };


    let doc = new jsPDF();

    let html = document.documentElement.innerHTML;
    console.log(html);

    doc.fromHTML(html, 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
      },
      function() {  doc.save('a4.pdf');}
    );
  }
}