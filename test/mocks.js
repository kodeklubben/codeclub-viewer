import mock from 'mock-require';

mock('onlyFrontmatter!lessonFiltertags/keys.md', {
  frontmatter: {
    language: ['nb', 'nn', 'en'],
    topic: ['app', 'electronics', 'web'],
    subject: ['mathematics', 'science', 'programming', 'physics'],
    grade: ['preschool', 'primary', 'secondary', 'junior', 'senior'],
    platform: ['windows', 'mac', 'browser'],
    category: ['create game', 'create app'],
    created: ['2016'],
    noting: [],
    sometag: ['tag1', 'tag2'],
  }
});
