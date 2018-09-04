import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import grey from '@material-ui/core/colors/grey';
import {getTranslator} from '../../selectors/translate';
import {somethingCheckedInFilter} from '../../selectors/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import {resetAllFilters} from '../../reducers/filter';

const styles = theme => ({
  button: {
    color: theme.palette.getContrastText(grey[700]),
    backgroundColor: grey[700],
    '&:hover': {
      backgroundColor: grey[900],
    },
  },
  text: {
    marginLeft: theme.spacing.unit,
  },
});

class ClearFilterButton extends React.PureComponent {
  handleClick = () => {
    this.props.resetAllFilters('language', this.props.language);
    this.props.collapseAllFilterGroups(true);
  };

  render() {
    const {classes, t, somethingChecked} = this.props;
    const options = {
      variant: 'outlined',
      color: 'default',
      onClick: this.handleClick,
      fullWidth: true,
      className: classes.button,
    };
    return somethingChecked ?
      <Button {...options}>
        <ClearIcon/>
        <span className={classes.text}>{t('filter.removefilter')}</span>
      </Button>
      : null;
  }
}

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
