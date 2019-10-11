import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './ResetButton.scss';
import {getTranslator} from '../../selectors/translate';
import {setCheckboxesInDoc} from '../../utils/checkboxUtils';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const ResetButton = ({path}) => {
  useStyles(styles);

  const {t} = useSelector(state => ({
    t: getTranslator(state),
  }));

  const options = {
    bsStyle: 'warning',
    bsSize: 'small',
    className: styles.container,
    'aria-label': t('lessons.reset'),
    onClick: () => setCheckboxesInDoc(path, {}),
  };
  return (
    <Button {...options}>
      <Glyphicon className={styles.icon} glyph={'remove'}/>
      <span className={styles.textMargin}>{t('lessons.reset')}</span>
    </Button>
  );
};

ResetButton.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ResetButton;
