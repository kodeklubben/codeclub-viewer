import React, {PropTypes} from 'react';
import NavLink from './NavLink';

const NavBar = React.createClass({
  render() {
    const params = this.props.params;
    //console.log(this.props.params);
    const courseLink = params.course ? <NavLink to={`/${params.course}`}>{params.course}</NavLink> : null;
    const lessonLink = params.course && params.lesson && params.file ?
      <NavLink to={`/${params.course}/${params.lesson}/${params.file}`}>{params.file}</NavLink> : null;
    return (
      <div style={{backgroundColor: '#B1DAAE', borderRadius: '5px', height:'40px', padding:'5px'}}>
        <p>
          <NavLink to="/" onlyActiveOnIndex>Front Page</NavLink>
          {courseLink ? <span> / {courseLink}</span> : null}
          {lessonLink ? <span> / {lessonLink}</span> : null}
        </p>
      </div>
    );
  }
});

NavBar.PropTypes = {
  params: PropTypes.shape({
    course: PropTypes.string,
    lesson: PropTypes.string,
    file: PropTypes.string
  })
};

export default NavBar;
