import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './DarkModeButton.scss';
import {getTranslator} from '../../selectors/translate';
import {setShowDarkMode} from '../../reducers/showDarkMode';

class DarkModeButton extends React.PureComponent {
  handleClick = () => this.props.setShowDarkMode(!this.props.showDarkMode);

  render() {
    const {t, showDarkMode} = this.props;
    const options = {
      bsSize: 'small',
      className: styles.container,
      'aria-label': showDarkMode ? t('lessons.darkmode') : t('lessons.lightmode'),
      onClick: this.handleClick,
    };
    return (
      <Button {...options}>
        <Glyphicon className={styles.icon} glyph={'lamp'}/>
        <span className={styles.textMargin}>
          {showDarkMode ? t('lessons.darkmode') : t('lessons.lightmode')}
        </span>
      </Button>
    );
  }
}

DarkModeButton.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
  showDarkMode: PropTypes.bool.isRequired,

  // mapDispatchToProps
  setShowDarkMode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  showDarkMode: state.showDarkMode,
});

const mapDispatchToProps = {
  setShowDarkMode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DarkModeButton));
