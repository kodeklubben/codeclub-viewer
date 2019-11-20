import React from 'react';
import {Link, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
    '@media print': {
      display: 'none',
    },
  },
  img: {
    margin: '20px 7px 10px',
    width: 'auto',
    height: '50px',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container justify='center' className={classes.footer}>
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
    </Grid>
  );
};

export default Footer;
