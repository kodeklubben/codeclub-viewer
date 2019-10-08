import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './ResetButton.scss';
import {getTranslator} from '../../selectors/translate';
import {setCheckbox} from '../../reducers/checkboxes';
import {setCheckboxesInDoc} from '../../utils/checkboxUtils';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const ResetButton = ({path, t, setCheckbox}) => {
  useStyles(styles);

  const options = {
    bsStyle: 'warning',
    bsSize: 'small',
    className: styles.container,
    'aria-label': t('lessons.reset'),
    onClick: () => setCheckboxesInDoc(path, {}, setCheckbox),
  };
  return (
    <Button {...options}>
      <Glyphicon className={styles.icon} glyph={'remove'}/>
      <span className={styles.textMargin}>{t('lessons.reset')}</span>
    </Button>
  );
};

ResetButton.propTypes = {
  // ownProps
  path: PropTypes.string.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  setCheckbox: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});

const mapDispatchToProps = {
  setCheckbox
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetButton);
