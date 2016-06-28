import React from 'react';

import TeacherInfo from './TeacherInfo';
import style from './buttons.scss';
import { Collapse } from 'react-bootstrap';

const ButtonGroup = React.createClass({

  getInitialState() {
    return {
      show: false
    };
  },

  navigate() {
    // TODO (fredaas)
    // This function gets called when the user clicks the 'Get Started' button.
    // When the button is clicked the user should be taken to a 'Hello World' Scratch exercise.
  },

  render() {
    return (
      <div className={style.container}>
        <div className={style.sectionButton}>
          <button className={style.buttonStudent} onClick={() => this.navigate}>
            Kom i gang!
          </button>
          <button
            className={style.buttonTeacher}
            onClick={() => this.setState({ show: !this.state.show })}>
              Lærer/Veileder
          </button>
        </div>
        <Collapse in={this.state.show}>
          <div>
            <div className={style.sectionInfo}>
              <TeacherInfo />
            </div>
          </div>
        </Collapse>
      </div>
    );
  }

});

export default ButtonGroup;
