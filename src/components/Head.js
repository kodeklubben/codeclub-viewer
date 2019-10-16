import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Helmet} from 'react-helmet';
import {getTranslator} from '../selectors/translate';

const Head = ({title, description}) => {
  const {language, t} = useSelector(state => ({
    language: state.language,
    t: getTranslator(state),
  }));

  const headTitle = title ? title  + ' | ' + t('head.title') : t('head.title');
  const descriptionContent = description ? description : t('head.description');
  return <Helmet
    html={[
      {lang: language}
    ]}
    title={headTitle} 
    meta={[
      {
        charSet: 'utf-8'
      },
      {
        name: 'description',
        content: descriptionContent
      }
    ]}
  />;
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Head;
