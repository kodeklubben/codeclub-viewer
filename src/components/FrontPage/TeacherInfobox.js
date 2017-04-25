import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {getInfo} from '../../util';
import styles from './TeacherInfobox.scss';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

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
    const url = [
      'http://kidsakoder.no/skole/valgfag/',
      'http://kidsakoder.no/kodeklubben/'
    ];

    const teacherInfoContext = require.context('onlyFrontmatter!lessonSrc/', false, /index\.md/);
    const teacherInfo = getInfo(teacherInfoContext);
    const lang = this.props.language;

    return (
      <div className={styles.center}>
        {!this.props.isStudentMode ?
          <div className={styles.infoBox}>
            <h3 className={styles.center}>{teacherInfo.welcomeTeacher[lang]}</h3>
            <br />
            {teacherInfo.changeModeTeacher[lang]}
            <br />
            <div className={styles.center}>
              <Button className={styles.glyphicon} onClick={() => this.changeState()}>
                <Glyphicon glyph={!this.state.showCourseInfo ? 'plus-sign' : 'minus-sign'}/>
              </Button>
            </div>
            <Collapse in={this.state.showCourseInfo}>
              <div>
                <h3>{teacherInfo.teacherTitle[lang]}</h3>
                {teacherInfo.teacher[lang]}
                <br />
                <a className={styles.link} href={url[0]} target="_blank">{teacherInfo.link1[lang]}</a>
                <br />
                <h3>{teacherInfo.assistantTitle[lang]}</h3>
                {teacherInfo.assistant[lang]}
                <br />
                <a className={styles.link} href={url[1]} target="_blank">{teacherInfo.link2[lang]}</a>
              </div>
            </Collapse>
          </div>
          : null}
      </div>
    );
  }

});

TeacherInfobox.propTypes = {
  isStudentMode: PropTypes.bool,
  language: PropTypes.string
};

function mapStateToProps(state) {
  return {
    language: state.language
  };
}

export default connect(
  mapStateToProps
)(withStyles(styles)(TeacherInfobox));