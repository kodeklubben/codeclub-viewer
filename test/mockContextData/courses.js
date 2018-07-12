export default {
  './codecademy/course.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'step_based', 'web'],
      grade: ['junior', 'senior'],
    },
  },
  './khan_academy/course.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'step_based', 'web', 'game', 'animation'],
      grade: ['secondary', 'junior', 'senior'],
    },
  },
  './kodegenet/course.yml': {
    isExternal: true,
    tags: {
      topic: ['electronics', 'block_based', 'text_based', 'web', 'game', 'robot'],
      grade: ['secondary', 'junior', 'senior'],
    },
  },
  './kodeknekkerne/course.yml': {
    isExternal: true,
    tags: {
      topic: ['block_based', 'step_based'],
      grade: ['primary', 'secondary', 'junior'],
    },
  },
  './raspberry_pi/course.yml': {
    isExternal: true,
    tags: {
      topic: ['block_based', 'text_based', 'electronics', 'game'],
      grade: ['secondary', 'junior', 'senior'],
    },
  },
  './sonic_pi/course.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'sound'],
      subject: ['music', 'programming'],
      grade: ['primary', 'secondary', 'junior'],
    },
  },
  './fake_course_without_tags/course.yml': {
    isExternal: true,
  },
  './fake_internal_course/course.yml': {
    isExternal: false,
    tags: {
      topic: ['text_based', 'step_based', 'web', 'game', 'animation'],
      subject: ['music', 'arts_and_crafts'],
      grade: ['secondary', 'junior', 'senior'],
    },
  },
};
