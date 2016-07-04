import React, {PropTypes} from 'react';
import LessonItem from '../LessonList/LessonItem';
import styles from './Playlist.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Badge, Glyphicon} from 'react-bootstrap';

const Playlist = React.createClass({
  getInitialState() {
    return {
      expanded: false
    };
  },
  expand() {
    this.setState({expanded: !this.state.expanded});
  },
  render() {
    const name = this.props.name;
    const lessons = this.props.lessons || [];
    return (
      <div>
        <li className={styles.playlist + ' list-group-item'} onClick={this.expand}>
          <Glyphicon glyph={this.state.expanded ? 'chevron-down' : 'chevron-right'}/>
          &nbsp;<Badge>{lessons.length}</Badge>{name}
        </li>
        <ul className={'list-group'} style={this.state.expanded ? null : {display:'none'}}>
          {lessons.map((lesson, idx) => <LessonItem key={idx} lesson={lesson}/>)}
        </ul>
      </div>
    );
  }
});

Playlist.propTypes = {
  name: PropTypes.string,
  lessons: PropTypes.array
};

export default withStyles(styles)(Playlist);
