import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import {getTranslator} from '../../selectors/translate';
import {setCheckbox} from '../../reducers/checkboxes';
import {setCheckboxes} from '../../utils/checkboxUtils';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    '@media print': {
      display: 'none',
    },
  },
  text: {
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});

const ResetButton = ({classes, path, t, setCheckbox}) => {
  const options = {
    onClick: () => setCheckboxes(path, {}, setCheckbox),
    'aria-label': t('lessons.reset'),
    className: classes.button,
    variant: 'outlined',
    color: 'default',
    size: 'small',
  };
  return (
    <Button {...options}>
      <ClearIcon/>
      <span className={classes.text}>{t('lessons.reset')}</span>
    </Button>
  );
};

ResetButton.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
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
