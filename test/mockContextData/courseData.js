export default {
  './codecademy/data.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'step_based', 'web'],
      grade: ['junior', 'senior'],
    },
  },
  './khan_academy/data.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'step_based', 'web', 'game', 'animation'],
      grade: ['secondary', 'junior', 'senior'],
    },
  },
  './kodegenet/data.yml': {
    isExternal: true,
    tags: {
      topic: ['electronics', 'block_based', 'text_based', 'web', 'game', 'robot'],
      grade: ['secondary', 'junior', 'senior'],
    },
  },
  './kodeknekkerne/data.yml': {
    isExternal: true,
    tags: {
      topic: ['block_based', 'step_based'],
      grade: ['primary', 'secondary', 'junior'],
    },
  },
  './raspberry_pi/data.yml': {
    isExternal: true,
    tags: {
      topic: ['block_based', 'text_based', 'electronics', 'game'],
      grade: ['secondary', 'junior', 'senior'],
    },
  },
  './sonic_pi/data.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'sound'],
      subject: ['music', 'programming'],
      grade: ['primary', 'secondary', 'junior'],
    },
  },
  './fake_course_without_tags/data.yml': {
    isExternal: true,
  },
  './fake_internal_course/data.yml': {
    isExternal: false,
    tags: {
      topic: ['text_based', 'step_based', 'web', 'game', 'animation'],
      subject: ['music', 'arts_and_crafts'],
      grade: ['secondary', 'junior', 'senior'],
    },
  },
};
