import React, {PropTypes} from 'react';
import NavLink from '../components/Navigation/NavLink';


const PlaylistPage = React.createClass({
  getLessonPath(path) {
    const lessonPath = /^\.(.*)\.md/.exec(path); // get the '/course/lesson/file' part of the path
    return lessonPath ? lessonPath[1] : null;
  },
  render() {
    // Get all ./*/*/*.md under lessonSrc, e.g. ./scratch/straffespark/straffespark.md
    // Ignorerer alle ./*/*/README.md
    const lessonContext = require.context('onlyFrontmatter!lessonSrc/', true,
      /^\.\/[^\/]*\/[^\/]*\/(?!README\.md$)[^\/]*\.md/);
    //console.log('PlaylistPage lessonContext keys:');
    //console.log(lessonContext.keys());

    const keys = lessonContext.keys().filter(path =>{
      return path.startsWith('./' + this.props.params.course);
    });
    const courseNodes = keys.map((path, idx) => {
      const lesson = lessonContext(path);
      const fm = lesson.frontmatter;
      const lessonPath = this.getLessonPath(path);
      const lessonStr = fm.title + (fm.level ? ` (Level ${fm.level})` : '');
      return (
        <div key={idx}>
          {lessonPath ? <NavLink to={lessonPath}>{lessonStr}</NavLink> : lessonStr }
        </div>
      );
    });
    //console.log(keys);
    return (
      <div>
        PlaylistPage for {this.props.params.course}
        {courseNodes}
      </div>
    );
  }
});

PlaylistPage.propTypes = {
  params: PropTypes.shape({
    course: PropTypes.string.isRequired
  })
};

export default PlaylistPage;
