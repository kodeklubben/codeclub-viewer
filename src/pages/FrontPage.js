import React from 'react';
import CourseList from '../components/CourseList';
import LessonFilter from '../components/filter/LessonFilter';
import {clone, getListWithDistinctObjects, getObjNthKeyVal, isSubArray} from '../util';
import styles from './FrontPage.scss';

const iconContext = require.context('lessonSrc/', true, /^\.\/[^\/]*\/logo-black\.png/);
const lessonContext = require.context('onlyFrontmatter!lessonSrc/', true,
  /^\.\/[^\/]*\/[^\/]*\/(?!README\.md$)[^\/]*\.md/);

const FrontPage = React.createClass({
  getInitialState() {
    return {
      filter: {},
      allCourses: [],
      filteredCourses: []
    };
  },
  componentWillMount() {
    const courses = this.getCourses(lessonContext);

    // Update state
    this.setState({
      allCourses: courses,
      filteredCourses: courses
    });
  },
  getTags(lessonContext) {
    const paths = lessonContext.keys();

    return paths.reduce((res, path) => {
      const lessonFrontMatter = lessonContext(path).frontmatter;
      const tags = this.getTagsFromLessonTags(lessonFrontMatter.tags);
      res = this.mergeTags(tags, res);
      return res;
    }, {});
  },
  getCourses(lessonContext) {
    const paths = lessonContext.keys();

    const courses= paths.reduce((res, path) => {
      const courseName = path.slice(2, path.indexOf('/', 2));
      const lessonFrontMatter = lessonContext(path).frontmatter;
      const tags = this.getTagsFromLessonTags(lessonFrontMatter.tags);
      const lesson = {name: lessonFrontMatter.title, tags: tags};
      res.push({
        lessons: [lesson],
        name: courseName,
        iconPath: iconContext('./' + courseName + '/logo-black.png'),
        path: path
      });
      return res;
    }, []);

    // Merge all courses that have the same name by adding all lessons to the course
    return getListWithDistinctObjects(courses, 'name', function(courseA, courseB){
      const mergedCourse = clone(courseA);
      mergedCourse.lessons = mergedCourse.lessons.concat(courseB.lessons);
      return mergedCourse;
    }).sort(this.sortCourses);// Sort by number of lessons

  },
  getTagsFromLessonTags(lessonTags) {
    if(lessonTags == null) return {};
    /* Tag structure:
     tags = {
     groupName1: [tagItem1, tagItem2, tagItem3],
     groupName2: [tagItem4, tagItem5],
     groupName3: [tagItem6]
     } */
    return Object.keys(lessonTags).reduce((result, groupName) => {
      const tagItems = this.fixNonArrayTagList(lessonTags[groupName]);
      // Ignore tagGroups with no tagItems
      if(tagItems == null) return result;
      result[groupName] = tagItems;
      return result;
    }, {});
  },
  fixNonArrayTagList(tagItems) {
    // Fix non-array tagItem lists.
    // This happens if tags is created as string or numbers (e.g. someGroupName: tag1, tag2, 12345)
    // instead of list (e.g. someGroupName: [tag1, tag2, 12345]) in YAML
    if (typeof  tagItems === 'number') return this.fixNonArrayTagList(tagItems.toString());
    if (typeof tagItems === 'string') return tagItems.split(/,\s*/);
    return tagItems;
  },
  handleOnCheck(tag, checked) {
    if(checked){
      this.addFilter(tag);
    }else{
      this.removeFilter(tag);
    }
  },
  addFilter(tag) {
    const filter = this.mergeTags(this.state.filter, tag);
    const filteredCourses = this.filterCourses(this.state.allCourses, filter);
    this.setState({
      filter,
      filteredCourses
    });
  },
  removeFilter(tag) {
    const [groupName, tagItems] = getObjNthKeyVal(tag, 0);
    const tagName = tagItems[0];
    const filter = this.state.filter;
    const filterTagItems = filter[groupName];
    if(filterTagItems.length <= 1) {
      // Remove the tagGroup if it only has one tag
      delete filter[groupName];
    } else if(filterTagItems.indexOf(tagName) >= 0){
      // Remove tag from tagGroup
      filter[groupName].splice(filterTagItems.indexOf(tagName), 1);
    }

    const filteredCourses = this.filterCourses(this.state.allCourses, filter);
    this.setState({
      filteredCourses
    });
  },
  filterCourses(courses, filter) {
    // Clone all courses to prevent side-effects
    courses = clone(courses);

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
      return this.lessonHasTags(lesson, filter);
    });
  },
  lessonHasTags(lesson, filter) {
    // Filter is empty
    if(Object.keys(filter).length === 0) return true;

    const lessonTags = lesson.tags;
    for(let groupName in filter){
      if(!lessonTags.hasOwnProperty(groupName))return false;
      const filterTagItems = filter[groupName];
      const lessonTagItems = lessonTags[groupName];
      if(!isSubArray(filterTagItems, lessonTagItems)) return false;
    }
    // Lesson contains all tags in the filter
    return true;
  },
  mergeTags(tagA, tagB) {
    const mergedTags = clone(tagB);
    Object.keys(tagA).forEach(function(groupName){
      if(!mergedTags.hasOwnProperty(groupName))mergedTags[groupName] = tagA[groupName];
      else mergedTags[groupName] = [...new Set(mergedTags[groupName].concat(tagA[groupName]))];
    });
    return mergedTags;
  },
  sortCourses(a, b) {
    return b.lessons.length - a.lessons.length;
  },
  render() {
    const tags = this.getTags(lessonContext);
    return (
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <LessonFilter onCheck={this.handleOnCheck} tags={tags}/>
        </div>
        <div className={styles.rightColumn}>
          <CourseList courses={this.state.filteredCourses}/>
        </div>
      </div>
    );
  }
});

export default FrontPage;
