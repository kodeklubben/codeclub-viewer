import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setLanguage, resetFilter} from '../../action_creators';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import {getAvailableLanguages} from '../../util';
import styles from './LanguageDropdown.scss';

const languages = Object.keys(getAvailableLanguages());
const modes = ['student', 'teacher'];

function LanguageItem(props) {
  const nativeLanguages = getAvailableLanguages();

  // Note that the block with "float" (the flag) must be first in the containing div
  return (
    <div>
      <img className={styles.flag} src={nativeLanguages[props.language].url}/>
      <div className={styles.language}>{nativeLanguages[props.language].name}</div>
    </div>
  );
}
LanguageItem.propTypes = {
  language: PropTypes.oneOf(languages).isRequired
};

export function LanguageDropdown(props) {
  return <div className={styles.gadgetContainer}>
    <DropdownButton id='language-dropdown'
                    noCaret
                    pullRight
                    bsStyle={'language-' + props.mode}
                    title={<LanguageItem language={props.language}/>}
                    onSelect={(eventKey) => {
                      props.resetFilter('language', eventKey);
                      props.setLanguage(eventKey);
                    }}>
      {
        languages.map(k =>
          <MenuItem key={k} eventKey={k} active={props.language === k}>
            <LanguageItem language={k}/>
          </MenuItem>
        )
      }
    </DropdownButton>
  </div>;
}

LanguageDropdown.propTypes = {
  filter: PropTypes.object,
  mode: PropTypes.oneOf(modes).isRequired,
  language: PropTypes.oneOf(languages).isRequired,
  resetFilter: PropTypes.func,
  setLanguage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    language: state.language,
    filter: state.filter,
  };
}

export const LanguageDropdownContainer = connect(
  mapStateToProps,
  {
    setLanguage,
    resetFilter
  }
)(withStyles(styles)(LanguageDropdown));
