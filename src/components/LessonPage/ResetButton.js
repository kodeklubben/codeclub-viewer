import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
import ClearIcon from '@material-ui/icons/Clear';
import {getTranslator} from '../../selectors/translate';
import {setCheckbox} from '../../reducers/checkboxes';
import {setCheckboxes} from '../../utils/checkboxUtils';
import {fontFamilyDyslexic} from '../../styles/fonts';

const styles = theme => ({
  button: {
    color: theme.palette.getContrastText(purple[700]),
    backgroundColor: purple[700],
    '&:hover': {
      backgroundColor: purple[900],
    },
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
  dyslexicText: {
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    fontFamily: fontFamilyDyslexic,
  },
});

const ResetButton = ({classes, path, t, setCheckbox, showDyslexicFont}) => {
  const options = {
    onClick: () => setCheckboxes(path, {}, setCheckbox),
    'aria-label': t('lessons.reset'),
    classes: {root: classes.button},
    variant: 'outlined',
    color: 'default',
    size: 'small',
  };
  return (
    <Button {...options}>
      <ClearIcon/>
      <span className={showDyslexicFont ? classes.dyslexicText : classes.text}>{t('lessons.reset')}</span>
    </Button>
  );
};

ResetButton.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  showDyslexicFont: PropTypes.bool.isRequired,

  // mapDispatchToProps
  setCheckbox: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  showDyslexicFont: state.showDyslexicFont,
});

const mapDispatchToProps = {
  setCheckbox
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ResetButton));
