import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {setLanguage} from '../../reducers/language';
import {resetOneFilter} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import {getAvailableLanguages} from '../../utils/filterUtils';
import {getTranslateFilter} from '../../selectors/translate';
import Flag from '../Flag';
import {fontFamilyDyslexic} from '../../styles/fonts';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    padding: '9px',
  },
  text: {
    marginLeft: '8px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  dyslexicText: {
    marginLeft: '8px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    fontFamily: fontFamilyDyslexic,
  },
  menuItemText: {
    marginLeft: '8px',
  },
  menuItemDyslexicText: {
    marginLeft: '8px',
    fontFamily: fontFamilyDyslexic,
  },
});

const availableLanguages = getAvailableLanguages();

class LanguageDropdown extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = event => {
    this.setState({anchorEl: null});
  };

  render() {
    const {
      classes,
      language, translateFilter, showDyslexicFont,
      resetOneFilter, setLanguage, collapseAllFilterGroups
    } =  this.props;
    const {anchorEl} = this.state;
    const options = {
      'aria-owns': anchorEl ? 'language-menu' : null,
      'aria-haspopup': true,
      variant: 'outlined',
      size: 'small',
      onClick: this.handleClick,
      className: classes.button,
    };
    return (
      <div>
        <Button {...options}>
          <Flag {...{language}}/>
          <span className={showDyslexicFont ? classes.dyslexicText : classes.text}>
            {translateFilter('language', language)}
          </span>
        </Button>
        <Menu
          id='language-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {availableLanguages.map(languageKey =>
            <MenuItem
              key={languageKey}
              selected={language === languageKey}
              onClick={() => {
                resetOneFilter('language', languageKey);
                setLanguage(languageKey);
                collapseAllFilterGroups(true);
                this.handleClose();
              }}
            >
              <Flag language={languageKey}/>
              <span className={showDyslexicFont ? classes.menuItemDyslexicText : classes.menuItemText}>
                {translateFilter('language', languageKey)}
              </span>
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }
}

LanguageDropdown.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,

  // mapStateToProps:
  language: PropTypes.oneOf(availableLanguages).isRequired,
  translateFilter: PropTypes.func.isRequired,
  showDyslexicFont: PropTypes.bool.isRequired,

  // mapDispatchToProps:
  setLanguage: PropTypes.func.isRequired,
  resetOneFilter: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
  translateFilter: getTranslateFilter(state),
  showDyslexicFont: state.showDyslexicFont,
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
