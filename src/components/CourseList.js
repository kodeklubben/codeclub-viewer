import React from 'react';

// The icons for the courses, i.e. all ./*/logo-black.png under lessonSrc, e.g. ./scratch/logo-black.png
const iconContext = require.context('lessonSrc/', true, /^\.\/[^\/]*\/logo-black\.png/);
//console.log(iconContext.keys());

const CourseList = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  onClick(path) {
    const basePath = /^\.(\/[^\/]*)/.exec(path);
    //console.log(basePath);
    if (basePath) {
      this.context.router.push(basePath[1]);
    }
  },
  render() {
    const icons = iconContext.keys().map((path, idx) =>{
      return (
        <div key={idx} style={{display:'inline-block'}}>{icons}
          <img src={iconContext(path)}
               onClick={this.onClick.bind(null, path)}
               style={{width:'80px', margin:'20px'}}/>
        </div>
      );
    });
    return (
      <div>
        <h3>Kurs</h3>
        {icons}
      </div>
    );
  }
});
//
// <ul>
//   <li><NavLink to="/" onlyActiveOnIndex>Front Page</NavLink></li>
//   <li><NavLink to="/scratch">Scratch</NavLink></li>
//   <li><NavLink to="/python">Python</NavLink></li>
// </ul>
export default CourseList;
