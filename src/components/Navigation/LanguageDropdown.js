import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setLanguage} from '../../reducers/language';
import {resetOneFilter} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import {getAvailableLanguages} from '../../utils/filterUtils';
import styles from './LanguageDropdown.scss';
import Flag from '../Flag';

const availableLanguages = getAvailableLanguages();

const languages = {
  nb: 'Bokmål',
  en: 'English',
  nn: 'Nynorsk',
  is: 'Íslenska',
};

const LanguageItem = ({language, onlyFlag}) => (
  // Note that the block with "float" (the flag) must be first in the containing div
  <div className={styles.languageItemContainer}>
    <Flag {...{language}}/>
    <span className={styles.language + (onlyFlag ? ' ' + styles.onlyFlag : '')}>
      {languages[language] || language}
    </span>
  </div>
);

LanguageItem.propTypes = {
  // ownProps
  onlyFlag: PropTypes.bool.isRequired,

  // mapStateToProps
  language: PropTypes.oneOf(availableLanguages).isRequired,
};

class LanguageDropdown extends React.PureComponent {
  handleSelect = eventKey => {
    this.props.resetOneFilter('language', eventKey);
    this.props.setLanguage(eventKey);
    this.props.collapseAllFilterGroups(true);
  };

  render() {
    const {isStudentMode, language} = this.props;
    const mode = isStudentMode ? 'student' : 'teacher';
    return (
      <div className={styles.gadgetContainer}>
        <DropdownButton id='language-dropdown'
          noCaret
          pullRight
          bsStyle={'language-' + mode}
          title={<LanguageItem onlyFlag={true} {...{language}}/>}
          onSelect={this.handleSelect}
        >

          {
            availableLanguages.map(key =>
              <MenuItem {...{key}} eventKey={key} active={language === key}>
                <LanguageItem onlyFlag={false} language={key}/>
              </MenuItem>
            )
          }
        </DropdownButton>
      </div>
    );
  }
}

LanguageDropdown.propTypes = {
  // mapStateToProps:
  language: PropTypes.oneOf(availableLanguages).isRequired,
  isStudentMode: PropTypes.bool.isRequired,

  // mapDispatchToProps:
  setLanguage: PropTypes.func.isRequired,
  resetOneFilter: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
  isStudentMode: state.isStudentMode,
});

const mapDispatchToProps = {
  setLanguage,
  resetOneFilter,
  collapseAllFilterGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LanguageDropdown));
