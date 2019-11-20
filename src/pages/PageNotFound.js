import React from 'react';
import {Container, Typography, Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router';
import {getTranslator} from '../selectors/translate';
import Head from '../components/Head';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  topMargin: {
    marginTop: theme.spacing(10),
  },
}));

const PageNotFound = () => {
  const classes = useStyles();

  const t = useSelector(state => getTranslator(state));

  return (
    <Container role='main'>
      <Head title={'404'}/>
      <Grid className={classes.topMargin} container direction='column' alignItems='center'>
        <Typography variant='h4'>{t('404.header')}</Typography>
        <Typography>{t('404.textline')}</Typography>
        <Typography component={RouterLink} to='/'>{t('404.tofrontpage')}</Typography>
      </Grid>
    </Container>
  );
};

export default PageNotFound;
