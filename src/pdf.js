const jsPDF = require('jspdf');

export function buildPDF() {

    let converter = new jsPDF('p', 'pt', 'letter');
        let html = document.documentElement.innerHTML;

        converter.fromHTML(html, 15, 15, {
                'width': 170,
            },
            function() {  converter.save('a4.pdf');}
        );
}