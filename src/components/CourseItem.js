import React, {PropTypes} from 'react';
import capitalize from '../util';

const CourseItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  onClick(path) {
    const basePath = /^\.(\/[^\/]*)/.exec(path);
    if (basePath) {
      this.context.router.push(basePath[1]);
    }
  },
  render() {
    const course = this.props.course;
    const name = capitalize(course.name).replace('_', ' ');
    return (
      <div style={{display:'inline-block'}} onClick={this.onClick.bind(null, course.path)}>
        <img src={course.iconPath}
             style={{width:'80px', margin:'20px'}}/>
        <p>{name}</p>
        <p>Oppgaver: {course.lessons.length}</p>
      </div>
    );
  }
});

CourseItem.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    iconPath: PropTypes.string,
    lessons: PropTypes.array
  })
};

export default CourseItem;
