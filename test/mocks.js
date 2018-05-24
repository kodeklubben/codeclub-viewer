import mock from 'mock-require';

const keys_yml = {
  language: ['nb', 'nn', 'en'],
  topic: ['app', 'electronics', 'web'],
  subject: ['mathematics', 'science', 'programming', 'physics'],
  grade: ['preschool', 'primary', 'secondary', 'junior', 'senior'],
  platform: ['windows', 'mac', 'browser'],
  category: ['create game', 'create app'],
  created: ['2016'],
  nothing: [],
  sometag: ['tag1', 'tag2'],
};
mock('lessonFiltertags/keys.yml', keys_yml);

const contexts = {
  iconContext: (path) => path,
  courseContext: (path) => path,
  courseAllLangsContext: (path) => path,
  playlistContext: (path) => path,
  lessonContext: (path) => path,
  readmeContext: (path) => path,
  lessonAllContext: (path) => path,
};
mock('../src/contexts.js', contexts);
