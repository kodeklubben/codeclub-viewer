import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import {getTranslator} from '../../selectors/translate';
import {somethingCheckedInFilter} from '../../selectors/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import {resetAllFilters} from '../../reducers/filter';

const styles = theme => ({
  button: {
    width: '100%',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

const ClearFilterButton = ({classes, t, language, resetAllFilters, collapseAllFilterGroups, somethingChecked}) => {
  const options = {
    variant: 'outlined',
    color: 'default',
    onClick: () => {
      resetAllFilters('language', language);
      collapseAllFilterGroups(true);
    },
    className: classes.button,
  };
  return somethingChecked ?
    <Button {...options}>
      <ClearIcon className={classes.leftIcon}/>
      {t('filter.removefilter')}
    </Button>
    : null;
};

ClearFilterButton.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,

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
