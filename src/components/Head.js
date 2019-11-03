import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Helmet} from 'react-helmet';
import {getTranslator} from '../selectors/translate';

const Head = ({title, description}) => {
  const language = useSelector(state => state.language);
  const t = useSelector(state => getTranslator(state));

  const headTitle = title ? title  + ' | ' + t('head.title') : t('head.title');
  const descriptionContent = description ? description : t('head.description');
  return (
    <Helmet>
      <html lang={language}/>
      <title>{headTitle}</title>
      <meta charSet='utf-8'/>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
      <meta name='description' content={descriptionContent}/>
    </Helmet>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Head;
