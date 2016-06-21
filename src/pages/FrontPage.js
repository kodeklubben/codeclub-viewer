import React from 'react';
import CourseList from '../components/CourseList';
import LessonFilter from '../components/filter/LessonFilter';
import {clone, getListWithDistinctObjects, isSubArray} from '../util';
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
    const tagGroups = getListWithDistinctObjects(allTagGroups, 'name', this.mergeTagGroups);

    // Merge all courses that have the same name by adding all lessons to the course
    let courses = getListWithDistinctObjects(allCourses, 'name', function(courseA, courseB){
      courseA = clone(courseA);
      courseA.lessons = courseA.lessons.concat(courseB.lessons);
      return courseA;
    }).sort(this.sortCourses);// Sort by number of lessons

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
    filter = getListWithDistinctObjects(filter, 'name', this.mergeTagGroups);

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
      
      const tagGroupNamesMatches = lessonTagGroup.name.toLowerCase() == filterTagGroup.name.toLowerCase();
      const lessonHasAllFilterTags = isSubArray(filterTagGroup.tags, lessonTagGroup.tags);
      if(tagGroupNamesMatches && lessonHasAllFilterTags)return true;
    }
    // Lesson does not contain all tags in the filter
    return false;
  },
  mergeTagGroups(tagGroupA, tagGroupB) {
    const mergedTagGroup = {name: tagGroupA.name};
    // Give the mergedTagGroup exactly one of all tags in A and B
    mergedTagGroup.tags = [...new Set(tagGroupA.tags.concat(tagGroupB.tags))];
    return mergedTagGroup;
  },
  sortCourses(a, b) {
    return b.lessons.length - a.lessons.length;
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
