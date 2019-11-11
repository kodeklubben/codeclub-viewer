import React from 'react';
import {useSelector} from 'react-redux';
import {Paper, Collapse, Typography, Grid, IconButton, Link} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {getTranslator} from '../../selectors/translate';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 700,
    marginBottom: theme.spacing(5),
    padding: theme.spacing(2),
    background: theme.palette.secondary.main,
  },
  moreInfo: {
    padding: theme.spacing(2),
  }
}));

const TeacherInfobox = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const t = useSelector(state => getTranslator(state));

  return (
    <Paper classes={{ root: classes.root }}>
      <Grid container justify='center' spacing={4}>
        <Grid item>
          <Typography variant='h4' component='h1'>
            {t('frontpage.teacherinfobox.header')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component='p'>
            {t('frontpage.teacherinfobox.changemode')}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label='plus-sign' onClick={handleOpen}>
            {open ?
              <RemoveCircleIcon color='primary' fontSize='large'/>
              :
              <AddCircleIcon color='primary' fontSize='large'/>
            }
          </IconButton>
        </Grid>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <Grid className={classes.moreInfo} container spacing={1}>
            <Grid item>
              <Typography variant='h5' component='h2'>
                {t('frontpage.teacherinfobox.teacher')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component='p'>
                {t('frontpage.teacherinfobox.info1')}
              </Typography>
              <Link
                color='inherit'
                href={'https://kidsakoder.no/skole/valgfag/'}
                target='_blank'
                rel='noopener'
              >
                {t('frontpage.teacherinfobox.link1')}
              </Link>
            </Grid>
            <Grid item>
              <Typography variant='h5' component='h2'>
                {t('frontpage.teacherinfobox.assistant')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component='p'>
                {t('frontpage.teacherinfobox.info2')}
              </Typography>
              <Link 
                color='inherit'
                href={'https://kidsakoder.no/kodeklubben/'}
                target='_blank'
                rel='noopener'
              >
                {t('frontpage.teacherinfobox.link2')}
              </Link>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Paper>
  );
};

export default TeacherInfobox;
