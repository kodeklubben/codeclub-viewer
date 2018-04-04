import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './RadioButtons.scss';
import {getTranslator} from '../../selectors/translate';
import {showOnlyPlaylists} from '../../reducers/playlists';


const RadioButtons = ({playlists, language, t, showOnlyPlaylists}) => {
  return language !== 'nb' ? null : (
    <form>
      <label>
        <input
          type='radio'
          name='radioGroup'
          checked={playlists}
          onChange={() => showOnlyPlaylists(true)}
        />
        {t('filter.radio.playlists')}
      </label>
      <label>
        <input
          type='radio'
          name='radioGroup'
          checked={!playlists}
          onChange={() => showOnlyPlaylists(false)}
        />
        {t('filter.radio.lessons')}
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
};

const mapStateToProps = (state) => ({
  playlists: state.playlists,
  language: state.language,
  t: getTranslator(state),
});

const mapDispatchToProps = {
  showOnlyPlaylists
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RadioButtons));
