import React, {PropTypes} from 'react';

import NavLink from './NavLink';
import styles from './NavBar.scss';

import ToggleButton from './ToggleButton';

const NavBar = React.createClass({

  getInitialState() {
    return {
      student: true
    };
  },

  render() {
    const params = this.props.params;
    const courseLink = params.course ? <NavLink to={`/${params.course}`}>{params.course}</NavLink> : null;
    const lessonLink = params.course && params.lesson && params.file ?
      <NavLink to={`/${params.course}/${params.lesson}/${params.file}`}>{params.file}</NavLink> : null;
    const lang = {
      nor: {
        s0: {fill: '#ef2b2d'},
        s1: {fill: '#ffffff'},
        s2: {fill: '#002868'}
      },
      swe: {
        s0: {fill: '#006aa7'},
        s1: {fill: '#fecc00'}
      },
      den: {
        s0: {fill: '#c60c30'},
        s1: {fill: '#ffffff'}
      }
    };

    return (

      <div>
        <div className='row'>
          <div className={styles.languageGroup}>
            <a className={styles.languageItem} href="#clicked">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 500 350">
                <rect style={lang.nor.s0} width="500" height="350"/>
                <rect x="136.4" style={lang.nor.s1} width="90.9" height="350"/>
                <rect y="131.3" style={lang.nor.s1} width="500" height="87.5"/>
                <rect x="159.1" style={lang.nor.s2} width="45.5" height="350"/>
                <rect y="153.1" style={lang.nor.s2} width="500" height="43.8"/>
              </svg>
            </a>
            <a className={styles.languageItem} href="#clicked">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 500 350">
                <rect style={lang.swe.s0} width="500" height="350"/>
                <rect x="162.2" style={lang.swe.s1} width="54.1" height="350"/>
                <rect y="150" style={lang.swe.s1} width="500" height="50"/>
              </svg>
            </a>
            <a className={styles.languageItem} href="#clicked">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 500 350">
                <rect style={lang.den.s0} width="500" height="350"/>
                <rect x="156.3" style={lang.den.s1} width="62.5" height="350"/>
                <rect y="140" style={lang.den.s1} width="500" height="70"/>
              </svg>
            </a>
          </div>
        </div>
        <div className='row'>
          <div className={styles.header}>
            <div className={styles.lhs}>
              <NavLink to="/" onlyActiveOnIndex>Front Page</NavLink>
              {courseLink ? <span> / {courseLink}</span> : null}
              {lessonLink ? <span> / {lessonLink}</span> : null}
            </div>
            <div className={styles.rhs}>
              <input type='text' placeholder='Søk' />
              {<ToggleButton from='ELEV' to='LÆRER' onClick={() => this.setState({ student: !this.state.student })} />}
            </div>
          </div>
        </div>
      </div>
    );
  }

});

NavBar.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  })
};

export default NavBar;
