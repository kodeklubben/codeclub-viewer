import React from 'react';
import CourseList from '../components/CourseList';

import FrontPageButton from '../components/FrontPageButton';

const FrontPage = React.createClass({
  render() {
    return (
      <div>
        <FrontPageButton />
        <CourseList/>
      </div>
    );
  }
});

export default FrontPage;
