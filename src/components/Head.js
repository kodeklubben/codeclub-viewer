import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {getTranslator} from '../selectors/translate';

const Head = ({title, description, t, language}) => {
  return (
    <Helmet>
      <html lang={language}/>
      <title>{title}</title>
      <meta charSet='utf-8'/>
      <meta name='description' content={description}/>
    </Helmet>
  );
};

Head.propTypes = {
  // ownProps
  title: PropTypes.string.isRequired,
  description: PropTypes.string,

  // mapStateToProps
  t: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state),
  language: state.language,
});

export default connect(
  mapStateToProps
)(Head);
