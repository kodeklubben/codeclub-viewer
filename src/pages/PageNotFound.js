import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {getTranslator} from '../selectors/translate';
import Head from '../components/Head';

const PageNotFound = ({t}) => (
  <div role='main'>
    <Head title={'404'}/>
    <Grid container direction='column' alignItems='center'>
      <Typography gutterBottom variant='headline'>{t('404.header')}</Typography>
      <Typography paragraph>{t('404.textline')}</Typography>
      <Typography component={Link} to={'/'}>{t('404.tofrontpage')}</Typography>
    </Grid>
  </div>
);

PageNotFound.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
});

export default connect(
  mapStateToProps,
)(PageNotFound);
