import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './RadioButtons.scss';
import {getTranslator} from '../../selectors/translate';
import {showOnlyPlaylists} from '../../reducers/playlists';
import {resetFilter} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';

const RadioButtons = ({playlists, language, t, showOnlyPlaylists, resetFilter, collapseAllFilterGroups}) => {
  return language !== 'nb' ? null : (
    <form>
      <label className={styles.label}>
        <input
          type='radio'
          name='radioGroup'
          checked={playlists}
          onChange={() => {
            showOnlyPlaylists(true);
            resetFilter('language', language);
            collapseAllFilterGroups(true);
          }}
        />
        <span className={styles.marginLeft}>{t('filter.radio.playlists')}</span>
      </label>
      <label className={styles.label}>
        <input
          type='radio'
          name='radioGroup'
          checked={!playlists}
          onChange={() => showOnlyPlaylists(false)}
        />
        <span className={styles.marginLeft}>{t('filter.radio.lessons')}</span>
      </label>
    </form>
  );
};

RadioButtons.propTypes = {
  // mapStateToProps
  playlists: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,

  // mapDispatchToProps
  showOnlyPlaylists: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playlists: state.playlists,
  language: state.language,
  t: getTranslator(state),
});

const mapDispatchToProps = {
  showOnlyPlaylists,
  resetFilter,
  collapseAllFilterGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(RadioButtons));
