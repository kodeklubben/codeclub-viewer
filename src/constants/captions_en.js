export default {
  general: {
    home: 'Home',
    student: 'Student',
    teacher: 'Teacher',
    level: 'Level',
    levels: {
      1: 'Introduction',
      2: 'Beginner',
      3: 'Experienced',
      4: 'Expert'
    }
  },
  head: {
    title: 'Code club',
    description: 'On this page you will find tasks for people of all ages who wants to learn programming. ' +
                  'All content on the site is free to use, ' +
                  'and is often used in the code club and programming subjects at school.',
  },
  frontpage: {
    courses: 'Courses',
    lessoncount: 'Lessons: {{count}}',
    otherwebsitecourses: 'Courses on other webpages',
    button: {
      start: 'Start here!',
      startlink: '/scratch/astrokatt/astrokatt',
      continue: 'Continue...',
    },
    teacherinfobox: {
      header: 'Hello! You are now in teachermode',
      changemode: 'Are you not a teacher or supervisor? Click the student / teacher button in the navigation menu ' +
                  'to switch mode. For more information, click the plus sign below',
      teacher: 'Teacher',
      info1: 'Check out our filters and tutorials. On the left side you can filter on different school subjects, ' +
             'to find relevant lessons for your teaching. Once you have finished checking for subjects, you will ' +
             'only see the lessons that our teachers have considered relevant and you can choose which language ' +
             'you want to teach. Each lesson set has a guide and you will find what specific curriculum goals you ' +
             'can work with in the various subjects.',
      link1: 'Learn more about programming in the classroom',
      assistant: 'Supervisor',
      info2: 'Our assignment sets out make the children work a lot on their own with different projects, ' +
             'but we recommend starting each session with 10-15 minute intro to what to do and what may be ' +
             'new this time. Now you can easily filter tasks on topics, and all assignments have instructions ' +
             'that you can check in preparation for the sessions. For beginners, we recommend block-based ' +
             'programming, where Python / Web / Processing is the most common to proceed with afterwards.',
      link2: 'Learn more about running a code club',
      plus: 'Show more information',
      minus: 'Show less information'
    },
    showhidefilter: 'Show/hide filter',
    forumbutton: 'Go to forum'
  },
  coursepage: {
    courseinfo: 'Information about the course',
    courseinfonotfound: 'Oops, someone forgot to write course information!',
    instructionbutton: 'Teacher Instructions',
    levelnavigation: 'Navigate to',
    lessoncollections: 'Collections of Lessons',
    nomatchinglessons: 'No matching lessons for this combination',
    missingtitle: 'Playlist',
    lessonsnottranslated: 'The lessons in this playlist have not been translated to English yet.',
  },
  lessons: {
    writtenby: 'Written by:',
    translatedby: 'Translated by:',
    course: 'Course:',
    pdf: 'Download PDF',
    print: 'Print',
    toteacherinstruction: 'To Teacher Instructions',
    tolesson: 'To Lesson',
    reset: 'Clear checkboxes',
    tomainlanguage: 'In {{lang}}',
    nottranslated: 'This page does not exist in {{lang}}',
    license: 'License: ',
    improvepage: {
      header: 'Improve this page',
      textline1: 'Found an error? Could anything be better?',
      textline2: 'If yes, please give us feedback by making an issue on Github or fix the error by yourself. ' +
                 'We are grateful for any feedback!',
      newissuebutton: 'Report a problem',
      newissuelink: {
        title: 'Problem with',
        lesson: 'Lesson',
        sourcecode: 'The lesson\'s source code',
        info: 'Describe the problem. Adding your operating system, browser and any code you have written will help.'
      },
      showcodebutton: 'Show code and fix yourself',
      forumbutton: 'Go to forum'
    }
  },
  filter: {
    header: 'Filter',
    tooltip: 'The filter allows you to sort out the lessons you want to solve according to the topics you ' +
      'want to work with.',
    radio: {
      playlists: 'Playlists',
      lessons: 'All lessons'
    },
    removefilter: 'Clear filter'
  },
  navbar: {
    mode: 'Mode',
    lkknav: {
      aboutlkk: 'About LKK',
      news: 'News',
      lessons: 'Lessons',
      findcodeclub: 'Find kodeklubb',
      codeclub: 'Kodeklubben',
      school: 'School',
      codehour: 'Kodetimen',
      contribute: 'Contribute?'
    },
    menu: 'Menu'
  },
  search: {
    placeholder: 'Search'
  },
  footer: {
    contribute: 'Contribute?'
  },
  404: {
    header: 'Sorry',
    textline: 'We can\'t find the page you are looking for.',
    tofrontpage: 'To frontpage'
  }
};
