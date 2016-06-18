import React from 'react';
import CourseList from '../components/CourseList';

const iconContext = require.context('lessonSrc/', true, /^\.\/[^\/]*\/logo-black\.png/);
const lessonContext = require.context('onlyFrontmatter!lessonSrc/', true,
  /^\.\/[^\/]*\/[^\/]*\/(?!README\.md$)[^\/]*\.md/);

const FrontPage = React.createClass({
  getListWithDistinctObjects(objects, mergeWithExistingObject) {
    const list = [];
    objects.forEach(function (obj){
      // Check if the object is already in the list
      const objFound = list.find((objInList) => {
        return objInList.name.toLowerCase() === obj.name.toLowerCase();
      });

      if(objFound) {
        mergeWithExistingObject(objFound, obj);
      } else {
        list.push(obj);
      }
    });
    return list;
  },
  getTagObjectsFromLessonTags(lessonTags) {
    const tags = [];
    /* Tag structure:
     lessonTags = {
      LessonTag1: [tagItem1, tagItem2, tagItem3],
      LessonTag2: [tagItem4, tagItem5],
      LessonTag3: [tagItem6]
     } */
    for (let tagName in lessonTags) {
      let tagItems = lessonTags[tagName];

      // Ignore tags with no tagItems
      if (tagItems == null) continue;

      // Fix non-array tagItem lists.
      // This happens if tags is defined as string (e.g. someTagName: tag1, tag2, tag3)
      // instead of list (e.g. someTagName: [tag1, tag2, tag3]) in YAML
      if (typeof tagItems === 'string') {
        tagItems = tagItems.split(/,\s*/);
      }

      tags.push({
        name: tagName,
        tagItems: tagItems
      });
    }

    return tags;
  },
  render() {
    let allCourses = [];
    let allTags = [];
    const paths = lessonContext.keys();
    
    paths.forEach(function (path) {
      const courseName = path.slice(2, path.indexOf('/', 2));
      const lessonFrontMatter = lessonContext(path).frontmatter;
      const tags = this.getTagObjectsFromLessonTags(lessonFrontMatter.tags);
      const lessonObj = {name: lessonFrontMatter.title, tags: tags};
      
      allTags = allTags.concat(tags);
      allCourses.push({
        lessons: [lessonObj],
        name: courseName,
        iconPath: iconContext('./' + courseName + '/logo-black.png'),
        path: path
      });

    }, this);

    // Merge all tags that have same the name
    // (e.g. platform: [not windows, only iPad] + platform: [not minecraft] =>
    // platform: [not windows, only iPad, not minecraft])
    const tags = this.getListWithDistinctObjects(allTags, function(existingTag, newTag){
      newTag.tagItems.forEach(function (tagItem) {
        // Add the new tagItem to the existing tag if it does not already have it
        if (existingTag.tagItems.indexOf(tagItem) < 0)existingTag.tagItems.push(tagItem);
      });
    });

    // Merge all courses that have the same name by adding all lessons to the course
    let courses = this.getListWithDistinctObjects(allCourses, function(existingCourse, newCourse){
      existingCourse.lessons.push(newCourse.lessons);
    });

    // Sort by number of lessons
    courses = courses.sort((a, b) => {
      return b.lessons.length - a.lessons.length;
    });

    return (
      <div>
        <LessonFilter tags={tags}/>
        <CourseList courses={courses}/>
      </div>
    );
  }
});

export default FrontPage;
