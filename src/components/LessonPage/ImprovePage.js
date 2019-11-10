import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router';
import {useSelector} from 'react-redux';
import {Button, Grid, Typography, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import ComputerIcon from '@material-ui/icons/Computer';
import {capitalize} from '../../utils/stringUtils';
import {getTranslator} from '../../selectors/translate';
import {getLessonPath} from '../../resources/lessonFrontmatter';

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 700,
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  }
}));

const ImprovePage = ({course, lesson, language, isReadme}) => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));

  const path = getLessonPath(course, lesson, language, isReadme);
  const linkToSourceCode = `https://github.com/kodeklubben/oppgaver/tree/master/src${path}.md`;
  const linkToLesson = `https://oppgaver.kidsakoder.no${path}`;
  const newIssueFill = '?title=' + t('lessons.improvepage.newissuelink.title') + ' \'' +
                       capitalize(course) + ': ' + capitalize(lesson).replace(/_/g, ' ') + '\'' +
                       '&body=' + t('lessons.improvepage.newissuelink.lesson') + ': ' + linkToLesson +
                       '%0A' + t('lessons.improvepage.newissuelink.sourcecode') + ': ' + linkToSourceCode +
                       '%0A%0A' + t('lessons.improvepage.newissuelink.info') + '%0A';

  const url = {
    // Link to making a new issue + title and body fill
    newIssue: 'https://github.com/kodeklubben/oppgaver/issues/new/' + newIssueFill,
    // Link to source code
    showCode: linkToSourceCode,
    //Link to forum
    forum: 'https://forum.kidsakoder.no/c/oppgaver'
  };

  const ButtonComponent = ({href, icon, text}) => (
    <Button
      className={classes.button}
      variant='outlined'
      component={RouterLink}
      href={href}
      target='_blank'
      rel='noopener'
      startIcon={icon}
    >
      {text}
    </Button>
  );

  return (
    <Paper className={classes.paper}>
      <Grid container alignItems='center' direction='column' spacing={1}>
        <Grid item><Typography variant='h4' component='h2'>{t('lessons.improvepage.header')}</Typography></Grid>
        <Grid item><Typography >{t('lessons.improvepage.textline1')}</Typography></Grid>
        <Grid item><Typography>{t('lessons.improvepage.textline2')}</Typography></Grid>
        <Grid container justify='center'>
          <ButtonComponent href={url.newIssue} text={t('lessons.improvepage.newissuebutton')} icon={<GitHubIcon/>}/>
          <ButtonComponent href={url.forum} text={t('lessons.improvepage.forumbutton')} icon={<ComputerIcon/>}/>
          <ButtonComponent href={url.showCode} text={t('lessons.improvepage.showcodebutton')} icon={<GitHubIcon/>}/>
        </Grid>
      </Grid>
    </Paper>
  );
};

ImprovePage.propTypes = {
  course: PropTypes.string.isRequired,
  lesson: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isReadme: PropTypes.bool.isRequired,
};

export default ImprovePage;
