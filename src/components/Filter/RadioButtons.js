import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './RadioButtons.scss';
import {getTranslator} from '../../selectors/translate';
import {setShowPlaylists} from '../../reducers/showPlaylists';
import {resetAllFilters} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';

const RadioButton = ({checked, onChange, text}) => (
  <label className={styles.label}>
    <input type='radio' name='radioGroup' {...{checked, onChange}}/>
    <span className={styles.marginLeft}>{text}</span>
  </label>
);

class RadioButtons extends React.PureComponent {
  handleChangePlaylists = () => {
    this.props.setShowPlaylists(true);
    this.props.resetAllFilters('language', this.props.language);
    this.props.collapseAllFilterGroups(true);
  };

  handleChangeLessons = () => this.props.setShowPlaylists(false);

  render() {
    const {showPlaylists, t} = this.props;
    return (
      <form role='group' aria-label={t('filter.radio.group')}>
        <RadioButton
          checked={showPlaylists}
          onChange={this.handleChangePlaylists}
          text={t('filter.radio.playlists')}
        />
        <RadioButton
          checked={!showPlaylists}
          onChange={this.handleChangeLessons}
          text={t('filter.radio.lessons')}
        />
      </form>
    );
  }
}

RadioButtons.propTypes = {
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
