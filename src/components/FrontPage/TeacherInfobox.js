import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Collapse from '@material-ui/core/Collapse';
import blue from '@material-ui/core/colors/blue';
import {getTranslator} from '../../selectors/translate';

const styles = theme => ({
  infoBox: {
    padding: theme.spacing.unit * 2,
    maxWidth: 600,
    border: `1px solid ${blue[200]}`,
    borderRadius: 10,
    fontWeight: 300,
    position: 'relative',
    marginBottom: 30,
    backgroundColor: blue[50],
  },
  link: {
    color: 'black',
    borderBottom: '1px black dotted',
    '&:hover': {
      color: 'black',
      textDecoration: 'none',
    },
  },
  text: {
    fontSize: 16,
  },
});

class TeacherInfobox extends React.PureComponent {
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
        <Typography variant='headline' align='center' gutterBottom paragraph>
          {t('frontpage.teacherinfobox.header')}
        </Typography>
        <Typography variant='body2' paragraph className={classes.text}>
          {t('frontpage.teacherinfobox.changemode')}
        </Typography>
        <Grid container justify='center'>
          <IconButton onClick={() => this.changeState()} aria-label={ariaLabel}>
            {showCourseInfo ? <RemoveCircleIcon/> : <AddCircleIcon/>}
          </IconButton>
        </Grid>
        <Collapse in={showCourseInfo} mountOnEnter unmountOnExit>
          <Typography variant='headline'>{t('frontpage.teacherinfobox.teacher')}</Typography>
          <Typography variant='body2' paragraph className={classes.text}>
            {t('frontpage.teacherinfobox.info1')}
            <br/>
            <a className={classes.link} href={url.valgfag} target='_blank' rel='noopener'>
              {t('frontpage.teacherinfobox.link1')}
            </a>
          </Typography>
          <Typography variant='headline'>{t('frontpage.teacherinfobox.assistant')}</Typography>
          <Typography variant='body2' paragraph className={classes.text}>
            {t('frontpage.teacherinfobox.info2')}
            <br/>
            <a className={classes.link} href={url.kodeklubb} target='_blank' rel='noopener'>
              {t('frontpage.teacherinfobox.link2')}
            </a>
          </Typography>
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
