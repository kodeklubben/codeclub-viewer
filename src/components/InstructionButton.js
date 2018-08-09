import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SchoolIcon from '@material-ui/icons/School';
import {getTranslator} from '../selectors/translate';
import {getLessonFrontmatter} from '../resources/lessonFrontmatter';

const styles = theme => ({
  button: {
    color: theme.palette.getContrastText(blue[700]),
    backgroundColor: blue[700],
    '&:hover, &:active, &:focus': {
      backgroundColor: blue[900],
      color: theme.palette.getContrastText(blue[900]),
      textDecoration: 'none',
    },
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    '@media print': {
      display: 'none',
    },
  },
  text: {
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});

const InstructionButton = ({classes, course, lesson, language, isReadme, onlyIcon, insideLink, buttonText}) => {
  const {path} = getLessonFrontmatter(course, lesson, language, isReadme);
  const iconButton = !path ? null :
    <IconButton component={Link} to={path} aria-label={buttonText}>
      <SchoolIcon/>
    </IconButton>;
  const options = {
    component: Link,
    to: path,
    variant: 'outlined',
    color: 'default',
    size: 'small',
    className: classes.button,
  };
  const button = !path ? null :
    <Button {...options}>
      {isReadme ? <SchoolIcon/> : <EditIcon/>}
      <span className={classes.text}>{buttonText}</span>
    </Button>;
  return insideLink ? iconButton : button;
};

InstructionButton.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
  onlyIcon: PropTypes.bool,
  insideLink: PropTypes.bool, // set to true if button is nested inside a <a>...</a>

  // mapStateToProps
  buttonText: PropTypes.string,
};

const mapStateToProps = (state, {isReadme, onlyIcon}) => {
  const t = getTranslator(state);
  return {
    buttonText: onlyIcon ? '' : t(isReadme ? 'lessons.toteacherinstruction' : 'lessons.tolesson'),
  };
};

export default connect(
  mapStateToProps
)(withStyles(styles)(InstructionButton));
