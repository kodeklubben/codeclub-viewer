import React from 'react';

import Teacher from './TeacherPage';
import style from './buttons.scss';

const FrontPageButton = React.createClass({

  getInitialState() {
    return {
      info: null
    };
  },

  displayTeacherContent(info) {
    this.setState({info});
  },

  navigate() {
    this.props.history.pushState(null, '/scratch/flagg/README');
  },

  render() {
    return (
      <div className={style.container}>
          <div className={style.sectionButton}>
            <button className={style.buttonStudent} onClick={() => this.navigate}>
              Kom i gang!
            </button>

            <button className={style.buttonTeacher} onClick={() => this.displayTeacherContent(<Teacher />)}>
              Lærer/Veileder
            </button>
          </div>

          <div>
            <div className={style.sectionInfo}>
              {this.state.info}
            </div>
          </div>
      </div>
    );
  }

});

export default FrontPageButton;
