import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import Grid from '@material-ui/core/Grid';
import {getTranslator} from '../selectors/translate';
import Head from '../components/Head';

const PageNotFound = ({t}) => (
  <div>
    <Head title={'404'}/>
    <Grid container direction='column' alignItems='center'>
      <h3>{t('404.header')}</h3>
      <p>{t('404.textline')}</p>
      <p><Link to="/">{t('404.tofrontpage')}</Link></p>
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
