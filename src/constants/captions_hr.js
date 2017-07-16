export default {
  general: {
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
  frontpage: {
    courses: 'Courses',
    otherwebsitecourses: 'Courses on other webpages',
    welcomebox: {
      header: 'Hello! You are now in studentmode',
      changemode: 'Are you not a student? Click the student / teacher button in the navigation menu to switch mode. ' +
                  'You can also choose to hide this box forever, by pressing X in the corner',
      info: 'Welcome to Kodeklubbens lesson pages! Here you will find many guides that you can use as inspiration ' +
            'to teach you programming and create your own games, apps and web pages. For beginners, we recommend ' +
            'taking a look at the block-based tasks in Code Studio or Scratch. Please use the filters on the left ' +
            'side to find tasks that are right for you!',
      startbutton: 'Start here!',
      buttonlink: '/scratch/astrokatt/astrokatt',
      continuebutton: 'Continue...',
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
      link2: 'Learn more about running a code club'
    },
    showhidefilter: 'Show/hide filter'
  },
  playlist: {
    lessons: 'Lessons',
    courseinfo: 'Information about the course',
    courseinfonotfound: 'Oops, someone forgot to write course information!',
    instructionbutton: 'Teacher Instructions',
    levelnavigation: 'Navigate to',
    lessoncollections: 'Collections of Lessons',
    nomatchinglessons: 'No matching lessons for this combination'
  },
  lessons: {
    writtenby: 'by',
    toteacherinstruction: 'To Teacher Instructions',
    tolesson: 'To Lesson',
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
      showcodebutton: 'Show code and fix yourself'
    }
  },
  filter: {
    group: {
      grade: 'Grade',
      language: 'Language',
      subject: 'Subject',
      topic: 'Topic',
    },
    tags_grade: {
      preschool: 'Preschool',
      primary: 'Primary',
      secondary: 'Secondary',
      junior: 'Junior',
      senior: 'Senior',
    },
    tags_language: {
      nb: 'Norsk bokmål',
      nn: 'Norsk nynorsk',
      sv: 'Svenska',
      da: 'Dansk',
      en: 'English',
      hr: 'Hrvatski',
    },
    tags_subject: {
      mathematics: 'Mathematics',
      science: 'Science',
      programming: 'Programming',
      technology: 'Technology',
      music: 'Music',
      norwegian: 'Norwegian',
      english: 'English',
      arts_and_crafts: 'Arts and crafts',
      social_science: 'Social science',
    },
    tags_topic: {
      app: 'App',
      electronics: 'Electronics',
      step_based: 'Step based',
      block_based: 'Block based',
      text_based: 'Text based',
      minecraft: 'Minecraft',
      web: 'Web',
      game: 'Game',
      robot: 'Robot',
      animation: 'Animation',
    },
    header: 'Filter',
    tooltip: {
      textline1: 'The filter allows you to sort out the lessons you want to solve according to the topics you ' +
                 'want to work with.',
      textline2: 'Behind each choice there are the number of lessons that can be solved, according to the choices ' +
                 'you make in the filter.'
    },
    language: 'Language',
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
    downloadZIP:  'Download all courses as a zip file'
  },
  404: {
    header: 'Something went wrong',
    textline1: 'We can\'t find the page you are looking for.',
    tofrontpage: 'To frontpage'
  }
};
