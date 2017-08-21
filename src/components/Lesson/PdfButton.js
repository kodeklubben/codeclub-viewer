import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Lesson.scss';
import Button from 'react-bootstrap/lib/Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {getTranslator} from '../../selectors/translate';

const PdfButton = ({lesson, t}) => {
  const downloadContent = () => {
    const element = document.getElementById('lessonContainer');
    html2canvas(element, {
      onrendered: function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save(lesson.frontmatter.title + '.pdf');
      }
    });
  };
  const className = styles.buttonMargin;
  const bsStyle = 'danger';
  const bsSize = 'small';
  const onClick = () => downloadContent();
  return <Button {...{className, bsStyle, bsSize, onClick}}>
      {t('lessons.pdf')}
    </Button>;
};

PdfButton.propTypes = {
  // ownProps

  // mapStateToProps
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});

export default connect(
  mapStateToProps
  )(withStyles(styles)(PdfButton));
