import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getTranslator} from '../../selectors/translate';
import styles from './FilterItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import PopoverComponent from '../PopoverComponent';
import {filterChecked} from '../../reducers/filter';

class FilterItem extends React.PureComponent {
  handleChange = () => this.props.filterChecked(this.props.groupKey, this.props.itemKey);

  render() {
    const {tagName, checked, popoverContent, t} = this.props;
    const popover = popoverContent ?
      <PopoverComponent {...{popoverContent}}>
        <Button bsSize='xs' className={styles.popButton} aria-label={t('general.glyphicon', {title: tagName})}>
          <span className={styles.tagInfo}><Glyphicon className={styles.glyph} glyph="info-sign"/></span>
        </Button>
      </PopoverComponent>
      : null;
    return (
      <div className={styles.container}>
        <label className={styles.label}>
          <input type='checkbox' onChange={this.handleChange} {...{checked}}/>
          <span className={styles.labelText}>{tagName}</span>
        </label>
        {popover}
      </div>
    );
  }
}

FilterItem.propTypes = {
  // ownProps
  itemKey: PropTypes.string.isRequired,
  groupKey: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  popoverContent: PropTypes.string.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired,

  // mapDispatchToProps:
  filterChecked: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
});

const mapDispatchToProps = {
  filterChecked,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(FilterItem));
