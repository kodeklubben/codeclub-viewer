import React from 'react';
import {useSelector} from 'react-redux';
import {AppBar, Link, Grid, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {getTranslator} from '../../selectors/translate';

const useStyles = makeStyles(theme => ({
  img: {
    margin: '10px 5px 20px',
    width: 'auto',
    height: '50px',
    transition: 'all 0.075s ease-in-out',
  },
  githubIcon: {
    marginTop: '20px',
    width: '100px',
    height: 'auto',
    transition: 'all 0.075s ease-in-out',
  },
}));

const Footer = () => {
  const classes = useStyles();
  const t = useSelector(state => getTranslator(state));

  return (
    <AppBar position='static' color='inherit'>
      <Toolbar>
        <Grid container justify='center'>
          <Link href={'https://github.com/kodeklubben/oppgaver/wiki'} target='_blank' rel='noopener'>
            <img className={classes.githubIcon} src={require('../../assets/graphics/github.png')} alt={'GitHub'}/>
            <p>{t('footer.contribute')}</p>
          </Link>
          <div>
            <Link href={'https://www.sparebank1.no'} target='_blank' rel='noopener'>
              <img className={classes.img} src={require('../../assets/graphics/smn.jpg')}
                alt={'SpareBank1'}
              />
            </Link>
            <Link href={'https://ibok.no/'} target='_blank' rel='noopener'>
              <img className={classes.img} src={require('../../assets/graphics/ibok.jpg')}
                alt={'Ibok'}
              />
            </Link>
            <Link href={'https://www.teknograd.no/'} target='_blank' rel='noopener'>
              <img className={classes.img} src={require('../../assets/graphics/teknograd.png')}
                alt={'Teknograd'}
              />
            </Link>
            <Link href={'https://www.tekna.no/'} target='_blank' rel='noopener'>
              <img className={classes.img} src={require('../../assets/graphics/tekna.jpg')}
                alt={'Tekna'}
              />
            </Link>
            <Link href={'https://www.ntnu.edu/idi/'} target='_blank' rel='noopener'>
              <img className={classes.img} src={require('../../assets/graphics/ntnu_idi.png')}
                alt={'NTNU institutt for datateknologi og informatikk'}
              />
            </Link>
            <Link href={'http://www.ntnu.edu/web/excited'} target='_blank' rel='noopener'>
              <img className={classes.img} src={require('../../assets/graphics/excITEd.png')}
                alt={'excited'}
              />
            </Link>
            <Link href={'http://www.mn.uio.no/ifi/'} target='_blank' rel='noopener'>
              <img className={classes.img} src={require('../../assets/graphics/uio_ifi.png')}
                alt={'UIO institutt for informatikk'}
              />
            </Link>
            <Link href={'https://www.samsung.com/no/innovation/'} target='_blank' rel='noopener'>
              <img className={classes.img} src={require('../../assets/graphics/samsung.png')}
                alt={'Samsung'}
              />
            </Link>
          </div>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
