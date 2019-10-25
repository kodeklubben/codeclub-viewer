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
        <GitHubIcon/>
      </ListItemIcon>
      <ListItemText primary={
        <Link
          color='inherit'
          underline='none'
          href={'https://github.com/kodeklubben/oppgaver/wiki'}
          target='_blank'
          rel='noopener'
        >
          {t('footer.contribute')}
        </Link>
      }/>
    </ListItem>
  );
};

export default GithubLink;
