import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {setShowDyslexicFont} from '../../reducers/showDyslexicFont';
import {getTranslator} from '../../selectors/translate';

const DyslexiaSwitch = ({t, showDyslexicFont, setShowDyslexicFont}) => (
  <FormControlLabel label={t('footer.dyslexia')} control={
    <Switch
      onChange={() => setShowDyslexicFont(!showDyslexicFont)}
      checked={showDyslexicFont}
    />}
  />
);

DyslexiaSwitch.propTypes = {
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
)(DyslexiaSwitch);
