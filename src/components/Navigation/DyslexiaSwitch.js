import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {setShowDyslexicFont} from '../../reducers/showDyslexicFont';
import {getTranslator} from '../../selectors/translate';

const styles = {
  dyslexicText: {
    fontSize: 20,
    fontFamily: 'OpenDyslexic-Regular',
  },
};

const DyslexiaSwitch = ({classes, t, showDyslexicFont, setShowDyslexicFont}) => {
  const label = <span className={classes.dyslexicText}>{t('footer.dyslexia')}</span>;
  return (
    <FormControlLabel {...{label}} control={
      <Switch
        color='default'
        onChange={() => setShowDyslexicFont(!showDyslexicFont)}
        checked={showDyslexicFont}
      />}
    />
  );
};

DyslexiaSwitch.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  showDyslexicFont: PropTypes.bool.isRequired,

  // mapDispatchToProps
  setShowDyslexicFont: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  showDyslexicFont: state.showDyslexicFont,
});

const mapDispatchToProps = {
  setShowDyslexicFont,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DyslexiaSwitch));
