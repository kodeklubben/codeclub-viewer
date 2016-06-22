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
      const tags = this.cleanseTagsFromLesson(lessonFrontMatter.tags);
      res = this.mergeTags(tags, res);
      return res;
    }, {});
  },
  getCourses(lessonContext) {
    const paths = lessonContext.keys();

    return paths.reduce((res, path) => {
      const courseName = path.slice(2, path.indexOf('/', 2));
      const lessonFrontMatter = lessonContext(path).frontmatter;
      const tags = this.cleanseTagsFromLesson(lessonFrontMatter.tags);
      const lesson = {name: lessonFrontMatter.title, tags: tags};
      const index = res.findIndex(course => course.name === courseName);
      
      // If course already exists, push the new lesson. Else make a new course
      if(index >= 0) {
        res[index].lessons.push(lesson);
      }else{
        res.push({
          lessons: [lesson],
          name: courseName,
          iconPath: iconContext('./' + courseName + '/logo-black.png'),
          path: path
        });
      }
      
      return res;
    }, []).sort(this.sortCourses);// Sort by number of lessons;

  },
  cleanseTagsFromLesson(lessonTags) {
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
    const filter = checked ? this.addTagToFilter(tag, this.state.filter) : this.removeTagFromFilter(tag, this.state.filter);
    const filteredCourses = this.filterCourses(this.state.allCourses, filter);
    // Update state
    this.setState({
      filter,
      filteredCourses
    });
  },
  addTagToFilter(tag, filter) {
    return this.mergeTags(filter, tag);
  },
  removeTagFromFilter(tag, filter) {
    // Tag has one tagGroup with one tagItem
    const groupName = Object.keys(tag)[0];
    const tagName = tag[groupName].toString();

    return Object.keys(filter).reduce((res, filterGroupName) => {
      const filterTagItems = filter[filterGroupName];
      // Add all items except the one to be removed
      const itemsToAdd = filterTagItems.filter(filterTagName => !(filterGroupName === groupName && filterTagName === tagName));
      if(itemsToAdd.length === 0) return res;
      return this.mergeTags(res, {[filterGroupName]: itemsToAdd});
    }, {});
  },
  filterCourses(courses, filter) {
    const coursesWithFilteredLessons = courses.map(course => {
      const newCourse = Object.assign({}, course);
      newCourse.lessons = this.filterLessons(course.lessons, filter);
      return newCourse;
    });

    // Find and sort courses that have at least one lesson that matches filter
    return coursesWithFilteredLessons.filter((course) => {
      return course.lessons.length > 0;
    }).sort(this.sortCourses);

  },
  filterLessons(lessons, filter) {
    // Find lessons that matches filter
    return lessons.filter((lesson) => {
      return this.lessonHasTags(lesson, filter);
    });
  },
  lessonHasTags(lesson, filterTags) {
    // Filter is empty
    if(Object.keys(filterTags).length === 0) return true;

    const lessonTags = lesson.tags;
    for(let groupName in filterTags){
      if(!lessonTags.hasOwnProperty(groupName) || !filterTags.hasOwnProperty(groupName))return false;
      const filterTagItems = filterTags[groupName];
      const lessonTagItems = lessonTags[groupName];
      // Check if there exist at least one filterTag that the lesson does not have
      if(filterTagItems.find(tagItem => lessonTagItems.indexOf(tagItem) < 0)) return false;
    }
    // Lesson contains all tags in the filter
    return true;
  },
  mergeTags(tagA, tagB) {
    const allTagGroups = Object.keys(tagA).concat(Object.keys(tagB));
    return allTagGroups.reduce((res, groupName) => {
      const tagItemsA = tagA.hasOwnProperty(groupName) ? tagA[groupName] : [];
      const tagItemsB = tagB.hasOwnProperty(groupName) ? tagB[groupName] : [];
      res[groupName] = [...new Set(tagItemsA.concat(tagItemsB))];
      return res;
    }, {});
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
