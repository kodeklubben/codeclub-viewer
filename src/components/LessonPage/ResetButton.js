import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ResetButton.scss';
import {getTranslator} from '../../selectors/translate';
import {setCheckbox} from '../../reducers/checkboxes';
import {setCheckboxesInDoc} from '../../utils/checkboxUtils';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const ResetButton = ({path, t, setCheckbox}) => {
  const handleClick = useCallback(() => setCheckboxesInDoc(path, {}, setCheckbox), [path, setCheckbox]);

  const options = {
    bsStyle: 'warning',
    bsSize: 'small',
    className: styles.container,
    'aria-label': t('lessons.reset'),
    onClick: handleClick,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResetButton));
