export default {
  './scratch/playlists/list1.yml': {
    sortindex: 1,
    title: {
      nb: 'Liste 1 bokmål',
      nn: 'Liste 1 nynorsk',
      en: 'List1 English',
    },
    lessons: ['lessonD', 'lessonA', 'lessonG'],
  },
  './scratch/playlists/list_without_title.yml': {
    sortindex: 2,
    lessons: ['lessonC', 'lessonB'],
  },
  './scratch/playlists/list_without_lessons.yml': {
    sortindex: 3,
    title: {
      nb: 'Title bokmål',
      nn: 'Title nynorsk',
      en: 'Title English',
    },
    lessons: [],
  },
  './scratch/playlists/list_with_same_sortindex.yml': {
    sortindex: 2,
    title: {
      nb: 'Title bokmål',
      nn: 'Title nynorsk',
      en: 'Title English',
    },
    lessons: ['lessonA', 'lessonF'],
  },
  './elm/playlists/listA.yml': {
    sortindex: 2,
    title: {
      nb: 'Title bokmål',
      nn: 'Title nynorsk',
      en: 'Title English',
    },
    lessons: ['lessonA', 'lessonF'],
  },
  './elm/playlists/listB.yml': {
    sortindex: 5,
    title: {
      nb: 'Title bokmål',
      nn: 'Title nynorsk',
      en: 'Title English',
    },
    lessons: ['lessonG', 'lessonF', 'lessonB'],
  },
};
