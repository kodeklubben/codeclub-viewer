import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DyslexiaSwitch.scss';
import Switch from 'react-switch';
import {setShowDyslexicFont} from '../../reducers/showDyslexicFont';
import {getTranslator} from '../../selectors/translate';

class DyslexiaSwitch extends React.PureComponent {
  handleChange = () => this.props.setShowDyslexicFont(!this.props.showDyslexicFont);

  render() {
    const {t, showDyslexicFont} = this.props;
    return (
      <label htmlFor='switch' className={styles.container}>
        <span className={styles.text}>{t('footer.dyslexia')}</span>
        <Switch
          onChange={this.handleChange}
          checked={showDyslexicFont}
          id='switch'
          onColor='#000'
        />
      </label>
    );
  }
}


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
)(withStyles(styles)(DyslexiaSwitch));
