import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import {getTranslator} from '../../selectors/translate';
import {setShowPlaylists} from '../../reducers/showPlaylists';
import {resetAllFilters} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';

const styles = {
  container: {
    marginLeft: 6,
  },
  label: {
    fontSize: 18,
  },
  radioSize: {
    fontSize: 20,
  },
  radio: {
    width: 40,
    heigth: 40,
  },
};

class RadioButtons extends React.PureComponent {
  handleChangeToPlaylists = () => {
    this.props.setShowPlaylists(true);
    this.props.resetAllFilters('language', this.props.language);
    this.props.collapseAllFilterGroups(true);
  };

  handleChangeToLessons = () => this.props.setShowPlaylists(false);

  render() {
    const {classes, showPlaylists, t} = this.props;
    return (
      <RadioGroup aria-label='RadioButtonGroup' className={classes.container}>
        <FormControlLabel classes={{label: classes.label}} label={t('filter.radio.playlists')} control={
          <Radio
            checked={showPlaylists}
            onChange={this.handleChangeToPlaylists}
            name='radioGroup'
            color='default'
            className={classes.radio}
            icon={<RadioButtonUncheckedIcon className={classes.radioSize}/>}
            checkedIcon={<RadioButtonCheckedIcon className={classes.radioSize}/>}
          />}
        />
        <FormControlLabel classes={{label: classes.label}} label={t('filter.radio.lessons')} control={
          <Radio
            checked={!showPlaylists}
            onChange={this.handleChangeToLessons}
            name='radioGroup'
            color='default'
            className={classes.radio}
            icon={<RadioButtonUncheckedIcon className={classes.radioSize}/>}
            checkedIcon={<RadioButtonCheckedIcon className={classes.radioSize}/>}
          />}
        />
      </RadioGroup>
    );
  }
}

RadioButtons.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,

  // mapStateToProps
  showPlaylists: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  setShowPlaylists: PropTypes.func.isRequired,
  resetAllFilters: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  showPlaylists: state.showPlaylists,
  language: state.language,
  t: getTranslator(state),
});

const mapDispatchToProps = {
  setShowPlaylists,
  resetAllFilters,
  collapseAllFilterGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(RadioButtons));
