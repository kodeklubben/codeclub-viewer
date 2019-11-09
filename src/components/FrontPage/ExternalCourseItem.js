import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {Card, CardActionArea, CardMedia, CardHeader, Grid, ListItem} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import {makeStyles} from '@material-ui/core/styles';
import {onlyCheckedMainLanguage} from '../../selectors/filter';
import {getCourseIntro} from '../../resources/courseContent';
import {getCourseIcon} from '../../resources/courseIcon';
import {getCourseTitle, getCourseExternalLink} from '../../resources/courseFrontmatter';
import PopoverComponent from '../PopoverComponent';
import Flag from '../Flag';

const useStyles = makeStyles(theme => ({
  card: {
    width: 240,
  },
  image: {
    maxHeight: 120,
    width: 'auto',
    marginBottom: theme.spacing(1),
  },
}));

const ExternalCourseList = ({course, language}) => {
  const classes = useStyles();

  const showDarkMode = useSelector(state => state.showDarkMode);
  const showFlag = useSelector(state => !onlyCheckedMainLanguage(state));

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardActionArea component={RouterLink} target='_blank' rel='noopener' href={getCourseExternalLink(course, language)}> 
          <Grid container alignItems='center' direction='column'>
            <CardHeader title={getCourseTitle(course, language)}/>
            <CardMedia
              className={classes.image}
              component='img'
              alt={course}
              src={getCourseIcon(course, showDarkMode ? 'white' : 'black')}
              title={course}
            />
          </Grid>
          {showFlag ?
            <Grid container justify='center' spacing={1}>
              <Grid item><Flag key={language} {...{language}}/></Grid>
            </Grid>
          : null}
        </CardActionArea>
        <Grid container alignItems='center' wrap='nowrap'>
          <ListItem>
            <LinkIcon size='small'/>
          </ListItem>
          <PopoverComponent popoverContent={getCourseIntro(course, language)}/>
        </Grid>
      </Card>
    </Grid>
  );
};

ExternalCourseList.propTypes = {
  course: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default ExternalCourseList;
