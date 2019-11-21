import React from 'react';
import {useSelector} from 'react-redux';
import {Link, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import {getTranslator} from '../../selectors/translate';

const GithubLink = () => {
  const t = useSelector(state => getTranslator(state));

  return (
    <ListItem>
      <ListItemIcon>
        <GitHubIcon color='primary'/>
      </ListItemIcon>
      <ListItemText
        component={Link}
        href={'https://github.com/kodeklubben/oppgaver/wiki'}
        target='_blank'
        rel='noopener'
        primary={t('navbar.contribute')}/>
    </ListItem>
  );
};

export default GithubLink;
