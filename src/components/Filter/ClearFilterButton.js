import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ClearFilterButton.scss';
import Button from 'react-bootstrap/lib/Button';
import {getTranslator} from '../../selectors/translate';
import {somethingCheckedInFilter} from '../../selectors/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import {resetAllFilters} from '../../reducers/filter';

class ClearFilterButton extends React.PureComponent {
  handleClick = () => {
    this.props.resetAllFilters('language', this.props.language);
    this.props.collapseAllFilterGroups(true);
  };

  render() {
    const {t, somethingChecked} = this.props;
    return somethingChecked ?
      <Button block onClick={this.handleClick} className={styles.marginBottom} bsStyle={'white-grey-lighter'}>
        {t('filter.removefilter')}
      </Button>
      : null;
  }
}

ClearFilterButton.propTypes = {
  // mapStateToProps
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  resetAllFilters: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
  somethingChecked: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  language: state.language,
  t: getTranslator(state),
  somethingChecked: somethingCheckedInFilter(state)
});

const mapDispatchToProps = {
  resetAllFilters,
  collapseAllFilterGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ClearFilterButton));
