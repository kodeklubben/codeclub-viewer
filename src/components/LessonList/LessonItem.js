import React from 'react';
import NavLink from '../Navigation/NavLink';
import styles from './LessonItem.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const LessonItem = React.createClass({
  render() {
    const lesson = this.props.lesson;

    // Check if indexed is set to false
    if(lesson.hasOwnProperty('indexed') && lesson.indexed != null && !lesson.indexed) return null;

    const constraints = this.props.constraints || [];
    return (
      <li className='list-group-item'>
        {lesson.path ? <NavLink to={lesson.path}>
          <div className={styles.lessonItem}>
            {lesson.title}
            
            { // Temporary constraint mocks are used until they are implemented
              constraints.indexOf('internet-explorer') === -1 ? null :
              <i className='fa fa-internet-explorer' 
                 style={{float: 'right', color: 'gray', fontSize: '1.2em', paddingRight: '5px'}}/>}
            {constraints.indexOf('tablet') === -1 ? null :
            <i className='fa fa-tablet' 
               style={{float: 'right', color: 'gray', fontSize: '1.2em', paddingRight: '5px'}}/>}
            {constraints.indexOf('money') === -1 ? null :
            <i className='fa fa-money' 
               style={{float: 'right', color: 'green', fontSize: '1.2em', paddingRight: '5px'}}/>}
            
          </div>
        </NavLink> : null}
      </li>
    );
  }
});

export default withStyles(styles)(LessonItem);
