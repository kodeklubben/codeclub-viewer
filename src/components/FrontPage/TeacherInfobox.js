import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Collapse from '@material-ui/core/Collapse';
import {getTranslator} from '../../selectors/translate';

const styles = {
  infoBox: {
    padding: '10px',
    maxWidth: '600px',
    border: '1px solid black',
    borderRadius: '10px',
    fontWeight: 300,
    position: 'relative',
    marginBottom: '30px',
    backgroundColor: '#eff6f6',
  },
  bigHeader: {
    fontSize: '1.9em',
    textAlign: 'center',
  },
  smallHeader: {
    fontSize: '1.5em',
  },
  link: {
    color: 'black',
    borderBottom: '1px black dotted',
    '&:hover': {
      textDecoration: 'none',
    },
  },
};

class TeacherInfobox extends React.Component {
  state = {
    showCourseInfo: false,
  };

  changeState = () => this.setState({['showCourseInfo']: !this.state['showCourseInfo']});

  render() {
    const {classes, t} = this.props;
    const {showCourseInfo} = this.state;
    const url = {
      valgfag: 'http://kidsakoder.no/skole/valgfag/',
      kodeklubb: 'http://kidsakoder.no/kodeklubben/',
    };
    const ariaLabel = showCourseInfo ? t('frontpage.teacherinfobox.minus') : t('frontpage.teacherinfobox.plus');
    return (
      <div className={classes.infoBox}>
        <h1 className={classes.bigHeader}>{t('frontpage.teacherinfobox.header')}</h1>
        {t('frontpage.teacherinfobox.changemode')}
        <Grid container justify='center'>
          <IconButton onClick={() => this.changeState()} aria-label={ariaLabel}>
            {showCourseInfo ? <RemoveCircleIcon/> : <AddCircleIcon/>}
          </IconButton>
        </Grid>
        <Collapse in={showCourseInfo}>
          <h2 className={classes.smallHeader}>{t('frontpage.teacherinfobox.teacher')}</h2>
          {t('frontpage.teacherinfobox.info1')}
          <br />
          <a className={classes.link} href={url.valgfag} target='_blank' rel='noopener'>
            {t('frontpage.teacherinfobox.link1')}
          </a>
          <br />
          <h2 className={classes.smallHeader}>{t('frontpage.teacherinfobox.assistant')}</h2>
          {t('frontpage.teacherinfobox.info2')}
          <br />
          <a className={classes.link} href={url.kodeklubb} target='_blank' rel='noopener'>
            {t('frontpage.teacherinfobox.link2')}
          </a>
        </Collapse>
      </div>
    );
  }
}

TeacherInfobox.propTypes = {
  // ownProps
  classes: PropTypes.object.isRequired,

  // mapStateToProps
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});


export default connect(
  mapStateToProps
)(withStyles(styles)(TeacherInfobox));
