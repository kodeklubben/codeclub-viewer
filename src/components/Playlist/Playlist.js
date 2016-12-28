import React, {PropTypes} from 'react';
import {LessonItemContainer} from '../LessonList/LessonItem';
import styles from './Playlist.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Badge from 'react-bootstrap/lib/Badge';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

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
        <span className={styles.playlistItem} onClick={this.expand}>
          <ListGroupItem>
            <Glyphicon glyph={this.state.expanded ? 'chevron-down' : 'chevron-right'}/>
            &nbsp;
            <Badge>{lessons.length}</Badge>{name}
          </ListGroupItem>
        </span>
        {
          this.state.expanded
            ?
            <ListGroup>
              {lessons.map((lesson, idx) => <LessonItemContainer key={idx} lesson={lesson}/>)}
            </ListGroup>
            :
            null
        }
      </div>
    );
  }
});

Playlist.propTypes = {
  name: PropTypes.string,
  lessons: PropTypes.array
};

export default withStyles(styles)(Playlist);
