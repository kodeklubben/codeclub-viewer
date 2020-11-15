/* eslint-env node */

import React from 'react';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PdfButton.scss';
import {getTranslator} from '../../selectors/translate';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const PdfButton = () => {
  useStyles(styles);
  
  const t = useSelector(state => getTranslator(state));

  const options = {
    onClick: () => window.print(),
    bsStyle: 'pdf',
    bsSize: 'small',
    className: styles.container,
    download: true,
  };

  return (
    <Button {...options} aria-label={t('lessons.pdf')}>
      <Glyphicon className={styles.icon} glyph={'cloud-download'}/>
      <span className={styles.textMargin}>{t('lessons.pdf')}</span>
    </Button>
  );
};

export default PdfButton;
