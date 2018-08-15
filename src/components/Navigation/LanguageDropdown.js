import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {setLanguage} from '../../reducers/language';
import {resetOneFilter} from '../../reducers/filter';
import {collapseAllFilterGroups} from '../../reducers/filterGroupsCollapsed';
import {getAvailableLanguages} from '../../utils/filterUtils';
import {getTranslateFilter} from '../../selectors/translate';
import Flag from '../Flag';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    padding: 9,
  },
  text: {
    marginLeft: 8,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  menuItemText: {
    marginLeft: 8,
  },
  popper: {
    zIndex: 1,
  },
});

const availableLanguages = getAvailableLanguages();

class LanguageDropdown extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({open: !state.open}));
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {
      classes,
      language, translateFilter,
      resetOneFilter, setLanguage, collapseAllFilterGroups
    } =  this.props;
    const {open} = this.state;
    const options = {
      'aria-owns': open ? 'language-menu' : null,
      'aria-haspopup': true,
      variant: 'outlined',
      size: 'small',
      onClick: this.handleToggle,
      className: classes.button,
      buttonRef: node => {this.anchorEl = node;},
    };
    return (
      <div>
        <Button {...options}>
          <Flag {...{language}}/>
          <span className={classes.text}>{translateFilter('language', language)}</span>
        </Button>
        <Popper {...{open}} anchorEl={this.anchorEl} transition disablePortal className={classes.popper}>
          {({TransitionProps, placement}) => (
            <Grow {...TransitionProps} id='language-menu' style={{transformOrigin: 'center top'}}>
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
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
                        <span className={classes.menuItemText}>{translateFilter('language', languageKey)}</span>
                      </MenuItem>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
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

  // mapDispatchToProps:
  setLanguage: PropTypes.func.isRequired,
  resetOneFilter: PropTypes.func.isRequired,
  collapseAllFilterGroups: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
  translateFilter: getTranslateFilter(state),
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
