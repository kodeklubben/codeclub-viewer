import React from 'react';

const iconContext = require.context('lessonSrc/', true, /^\.\/[^\/]*\/logo-black\.png/);
//console.log(iconContext.keys());

const CourseList = React.createClass({
  render() {
    return (
      <div>
        {iconContext.keys().map((path, idx) => {
          return <img key={idx} src={iconContext(path)} width="80px"/>;
        })}
      </div>
    );
  }
});

export default CourseList;
