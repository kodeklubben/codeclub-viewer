import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TeacherInfo from './TeacherInfo';
import { Collapse } from 'react-bootstrap';
import styles from './ButtonGroup.scss';

import ButtonItem from './ButtonItem';

const ButtonGroup = React.createClass({

  getInitialState() {
    return {
      show: false
    };
  },

  displayInfo() {
    this.setState({show: !this.state.show});
  },

  displayExercise() {
    // TODO (fredaas)
    // This function gets called when the user clicks the 'Get Started' button.
    // When the button is clicked the user should be taken to a 'Hello World' Scratch exercise.
  },

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sectionButton}>
          <ButtonItem color='green' handleClick={this.displayExercise}>
            Kom i gang!
          </ButtonItem>
          <ButtonItem color='blue' handleClick={this.displayInfo}>
            Lærer/Veileder
          </ButtonItem>
        </div>
        <Collapse in={this.state.show}>
          <div>
            <div className={styles.sectionInfo}>
              <TeacherInfo />
            </div>
          </div>
        </Collapse>
      </div>
    );
  }

});

export default withStyles(styles)(ButtonGroup);
