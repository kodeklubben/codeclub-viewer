import React from 'react';
import CourseList from '../components/CourseList';
import LessonFilter from '../components/filter/LessonFilter';
import styles from './FrontPage.scss';

const iconContext = require.context('lessonSrc/', true, /^\.\/[^\/]*\/logo-black\.png/);
const lessonContext = require.context('onlyFrontmatter!lessonSrc/', true,
  /^\.\/[^\/]*\/[^\/]*\/(?!README\.md$)[^\/]*\.md/);

const FrontPage = React.createClass({
  getInitialState() {
    return {
      filter: [],
      tagGroups: [],
      allCourses: [],
      filteredCourses: []
    };
  },
  componentWillMount() {
    let allCourses = [];
    let allTagGroups = [];
    const paths = lessonContext.keys();

    // Loop over all lessons. Create a list of all courses and a list of all tags.
    paths.forEach(function (path) {
      const courseName = path.slice(2, path.indexOf('/', 2));
      const lessonFrontMatter = lessonContext(path).frontmatter;
      const tagGroups = this.getTagGroupsFromLessonTags(lessonFrontMatter.tags);
      const lesson = {name: lessonFrontMatter.title, tagGroups: tagGroups};

      allTagGroups = allTagGroups.concat(tagGroups);
      allCourses.push({
        lessons: [lesson],
        name: courseName,
        iconPath: iconContext('./' + courseName + '/logo-black.png'),
        path: path
      });

    }, this);

    // Merge all tags that have same the name
    // (e.g. platform: [not windows, only iPad] + platform: [not minecraft] =>
    // platform: [not windows, only iPad, not minecraft])
    const tagGroups = this.getListWithDistinctObjects(allTagGroups, this.mergeTagGroups);

    // Merge all courses that have the same name by adding all lessons to the course
    let courses = this.getListWithDistinctObjects(allCourses, function(existingCourse, newCourse){
      existingCourse.lessons = existingCourse.lessons.concat(newCourse.lessons);
    });

    // Sort by number of lessons
    courses = courses.sort(this.sortCourses);

    // Update state
    this.setState({
      allCourses: courses,
      filteredCourses: courses,
      tagGroups: tagGroups
    });
  },
  getTagGroupsFromLessonTags(lessonTagGroups) {
    const tagGroups = [];
    /* Tag structure:
     lessonTagGroups = {
      TagGroup1: [tagItem1, tagItem2, tagItem3],
      TagGroup2: [tagItem4, tagItem5],
      TagGroup3: [tagItem6]
     } */
    for (let groupName in lessonTagGroups) {
      let tags = lessonTagGroups[groupName];

      // Ignore tagGroups with no tags
      if (tags == null) continue;

      // Fix non-array tag lists.
      // This happens if tags is created as string or numbers (e.g. someTagGroupName: tag1, tag2, 12345)
      // instead of list (e.g. someTagGroupName: [tag1, tag2, 12345]) in YAML
      if (typeof  tags === 'number') tags = tags.toString();
      if (typeof tags === 'string') tags = tags.split(/,\s*/);

      tagGroups.push({
        name: groupName,
        tags: tags
      });
    }

    return tagGroups;
  },
  handleOnCheck(tag, checked) {
    if(checked){
      this.addFilter(tag);
    }else{
      this.removeFilter(tag);
    }
  },
  addFilter(tag) {
    let filter = this.state.filter;
    filter.push({name: tag.groupName, tags: [tag.name]});
    // Merge tagGroups with same name
    filter = this.getListWithDistinctObjects(filter, this.mergeTagGroups);

    const filteredCourses = this.filterCourses(this.state.allCourses, filter);
    this.setState({
      filter,
      filteredCourses
    });
  },
  removeFilter(tag) {
    const filter = this.state.filter;

    // Find the tagGroup and remove tag from it
    const tagGroupFound = filter.find(tagGroup => tagGroup.name === tag.groupName);
    if(tagGroupFound) {
      const tags = tagGroupFound.tags;
      if(tags.length < 2) {
        // Remove the tagGroup if it only has one tag
        filter.splice(filter.indexOf(tagGroupFound), 1);
      } else if(tags.indexOf(tag.name) >= 0){
        // Remove tag from tagGroup
        tags.splice(tags.indexOf(tag.name), 1);
      }
    }
    const filteredCourses = this.filterCourses(this.state.allCourses, filter);
    this.setState({
      filteredCourses
    });
  },
  filterCourses(courses, filter) {
    // Clone all courses to prevent side-effects
    courses = JSON.parse(JSON.stringify(courses));

    // Find and sort courses that have at least one lesson that matches filter
    return courses.filter((course) => {
      // Remove lessons from course that doesn't match filter
      course.lessons = this.filterLessons(course.lessons, filter);
      return course.lessons.length > 0;
    }).sort(this.sortCourses);

  },
  filterLessons(lessons, filter) {
    // Find lessons that matches filter
    return lessons.filter((lesson) => {
      for(var i = 0; i < filter.length; i++) {
        const filterTagGroup = filter[i];
        if( !this.lessonHasTag(lesson, filterTagGroup) )return false;
      }
      return true;
    });
  },
  lessonHasTag(lesson, filterTagGroup) {
    const lessonTagGroups = lesson.tagGroups;
    if(lessonTagGroups.length == 0 && filterTagGroup !== null) return false;
    for(var i = 0; i < lessonTagGroups.length; i++){
      const lessonTagGroup = lessonTagGroups[i];
      //TODO: Clean
      if(lessonTagGroup.name.toLowerCase() == filterTagGroup.name.toLowerCase() && this.isSubArray(filterTagGroup.tags, lessonTagGroup.tags))return true;
    }
    return false;
  },
  mergeTagGroups(tagGroupA, tagGroupB) {
    tagGroupB.tags.forEach(function (tag) {
      // Add the new tag to the existing tagGroup if it does not already have it
      if (tagGroupA.tags.indexOf(tag) < 0)tagGroupA.tags.push(tag);
    });
  },
  sortCourses(a, b) {
    return b.lessons.length - a.lessons.length;
  },
  isSubArray(subArr, arr) {
    for(var i = 0; i < subArr.length; i++){
      var subEle = subArr[i];
      var found = arr.find(arrEle => arrEle.toLowerCase() == subEle.toLowerCase());
      if( !found )return false;
    }
    return true;
  },
  /**
   * Returns a new array where objects with identical 
   * name (property) have been merged
   * 
   * @param {Array} objects Array of objects that have the name property
   * @param {function} mergeWithExistingObject define how objects with identical names will be merged
   * @returns {Array} A new array where all object have distinct names (property)
   */
  getListWithDistinctObjects(objects, mergeWithExistingObject) {
    // Clone objects to prevent side-effects
    objects = JSON.parse(JSON.stringify(objects));

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
  render() {
    return (
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <LessonFilter onCheck={this.handleOnCheck} tagGroups={this.state.tagGroups}/>
        </div>
        <div className={styles.rightColumn}>
          <CourseList courses={this.state.filteredCourses}/>
        </div>
      </div>
    );
  }
});

export default FrontPage;
