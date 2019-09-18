import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './PopoverComponent.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import {hashCode} from '../utils/util';

class PopoverComponent extends React.PureComponent {
  createMarkup = () => ({__html: this.props.popoverContent});

  handleClick = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  render() {
    const {children, popoverContent, showDyslexicFont, showDarkMode} = this.props;
    const className = showDyslexicFont ? styles.contentDyslexia : styles.content;
    const overlay =
      <Popover id={hashCode(popoverContent)} className={showDarkMode ? styles.popoverDark : styles.popoverWhite}>
        <div {...{className}} role='region' dangerouslySetInnerHTML={this.createMarkup()}/>
      </Popover>;
    const options = {
      animation: true,
      rootClose: true,
      trigger: 'click',
      placement: 'bottom',
      onClick: this.handleClick,
      overlay,
    };
    return (
      <OverlayTrigger {...options}>
        {children}
      </OverlayTrigger>
    );
  }
}

PopoverComponent.propTypes = {
  // ownProps
  children: PropTypes.node,
  popoverContent: PropTypes.string,

  // mapStateToProps
  showDyslexicFont: PropTypes.bool.isRequired,
  showDarkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showDyslexicFont: state.showDyslexicFont,
  showDarkMode: state.showDarkMode,
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(PopoverComponent));
