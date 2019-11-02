/* eslint-env node */

import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './PdfButton.scss';
import {getTranslator} from '../../selectors/translate';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getLessonPath} from '../../resources/lessonFrontmatter';

const PdfButton = ({course, lesson, language, isReadme}) => {
  useStyles(styles);
  
  const t = useSelector(state => getTranslator(state));

  const path = getLessonPath(course, lesson, language, isReadme);
  const options = {
    href: `${process.env.PUBLICPATH}${path.slice(1)}.pdf`,
    bsStyle: 'pdf',
    bsSize: 'small',
    className: styles.container,
    download: true,
  };
  // Note that we need to use href in button, and not LinkContainer,
  // since we don't want to go through React Router when getting the pdf.
  return (
    <Button {...options} aria-label={t('lessons.pdf')}>
      <Glyphicon className={styles.icon} glyph={'cloud-download'}/>
      <span className={styles.textMargin}>{t('lessons.pdf')}</span>
    </Button>
  );
};

PdfButton.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default PdfButton;
