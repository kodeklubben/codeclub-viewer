import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DarkModeSwitch.scss';
import Switch from 'react-switch';
import {setShowDarkMode} from '../../reducers/showDarkMode';
import {getTranslator} from '../../selectors/translate';

class DarkModeSwtich extends React.PureComponent {
  handleChange = () => this.props.setShowDarkMode(!this.props.showDarkMode);

  render() {
    const {t, showDarkMode} = this.props;
    return (
      <label htmlFor='darkmodeswitch' className={styles.container}>
        <span className={styles.text}>{t('footer.darkmode')}</span>
        <Switch
          onChange={this.handleChange}
          checked={showDarkMode}
          id='darkmodeswitch'
          onColor='#000'
        />
      </label>
    );
  }
}


DarkModeSwtich.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
  showDarkMode: PropTypes.bool.isRequired,

  // mapDispatchToProps
  setShowDarkMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  showDarkMode: state.showDarkMode,
});

const mapDispatchToProps = {
  setShowDarkMode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DarkModeSwtich));
