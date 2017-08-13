import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './TeacherInfobox.scss';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {getTranslator} from '../../selectors/translate';

const TeacherInfobox = React.createClass({
  getInitialState() {
    return {
      showCourseInfo: false
    };
  },
  changeState() {
    this.setState({['showCourseInfo']: !this.state['showCourseInfo']});
  },
  render() {
    const {t} = this.props;
    const {showCourseInfo} = this.state;
    const url = [
      'http://kidsakoder.no/skole/valgfag/',
      'http://kidsakoder.no/kodeklubben/'
    ];

    return (
      <div className={styles.center}>
        <div className={styles.infoBox}>
          <h3 className={styles.center}>{t('frontpage.teacherinfobox.header')}</h3>
          <br />
          {t('frontpage.teacherinfobox.changemode')}
          <br />
          <div className={styles.center}>
            <Button className={styles.plusSign} onClick={() => this.changeState()}>
              <Glyphicon glyph={!showCourseInfo ? 'plus-sign' : 'minus-sign'}/>
            </Button>
          </div>
          <Collapse in={showCourseInfo}>
            <div>
              <h3>{t('frontpage.teacherinfobox.teacher')}</h3>
              {t('frontpage.teacherinfobox.info1')}
              <br />
              <a className={styles.link} href={url[0]} target="_blank">
                {t('frontpage.teacherinfobox.link1')}
              </a>
              <br />
              <h3>{t('frontpage.teacherinfobox.assistant')}</h3>
              {t('frontpage.teacherinfobox.info2')}
              <br />
              <a className={styles.link} href={url[1]} target="_blank">
                {t('frontpage.teacherinfobox.link2')}
              </a>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }

});

TeacherInfobox.propTypes = {
  // mapStateToProps
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  t: getTranslator(state)
});


export default connect(
  mapStateToProps
)(withStyles(styles)(TeacherInfobox));
