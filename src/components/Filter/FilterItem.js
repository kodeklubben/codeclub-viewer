import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getTranslator} from '../../selectors/translate';
import styles from './FilterItem.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import PopoverComponent from '../PopoverComponent';
import {filterChecked} from '../../reducers/filter';

const FilterItem = ({itemKey, groupKey, tagName, checked, popoverContent, t, filterChecked}) => {
  useStyles(styles);
  const handleChange = () => filterChecked(groupKey, itemKey);

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
        <input type='checkbox' onChange={handleChange} {...{checked}}/>
        <span className={styles.labelText}>{tagName}</span>
      </label>
      {popover}
    </div>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(FilterItem);
