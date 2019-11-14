import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {
  Card, CardActionArea, CardMedia, CardHeader, Grid, List, ListItem, ListItemSecondaryAction
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import {makeStyles} from '@material-ui/core/styles';
import {onlyCheckedMainLanguage} from '../../selectors/filter';
import {getCourseIntro} from '../../resources/courseContent';
import {getCourseIcon} from '../../resources/courseIcon';
import {getCourseTitle, getCourseExternalLink} from '../../resources/courseFrontmatter';
import PopoverComponent from '../PopoverComponent';
import Flag from '../Flag';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    background: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
  },
  image: {
    maxHeight: 120,
    width: 'auto',
    marginBottom: theme.spacing(1),
  },
  cardActionArea: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
}));

const ExternalCourseList = ({course, language}) => {
  const classes = useStyles();

  const showDarkMode = useSelector(state => state.showDarkMode);
  const showFlag = useSelector(state => !onlyCheckedMainLanguage(state));

  return (
    <Card classes={{ root: classes.root }}>
      <CardActionArea
        classes={{ root: classes.cardActionArea }}
        component={RouterLink}
        href={getCourseExternalLink(course, language)}
        target='_blank'
        rel='noopener'
      > 
        <CardHeader title={getCourseTitle(course, language)}/>
        <CardMedia
          className={classes.image}
          component='img'
          alt={course}
          src={getCourseIcon(course, showDarkMode ? 'white' : 'black')}
          title={course}
        />
        {showFlag ?
          <Grid container justify='center' spacing={1}>
            <Grid item><Flag key={language} {...{language}}/></Grid>
          </Grid>
          : null}
      </CardActionArea>
      <List>
        <ListItem>
          <LinkIcon color='primary' size='small'/>
          <ListItemSecondaryAction>
            <PopoverComponent popoverContent={getCourseIntro(course, language)}/>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Card>
  );
};

ExternalCourseList.propTypes = {
  course: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default ExternalCourseList;
