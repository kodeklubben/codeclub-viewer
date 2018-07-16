export default {

  /////////////////////////////
  // Internal/normal courses //
  /////////////////////////////

  './scratch/course.yml': {
    isExternal: false,
  },
  './elm/course.yml': {
    isExternal: false,
  },
  './python/course.yml': {
    isExternal: false,
  },
  './internal_course/course.yml': {
    isExternal: false,
  },
  './internal_course_without_index/course.yml': {
    isExternal: false,
  },
  './internal_course_with_tags/course.yml': {
    isExternal: false,
    tags: {
      topic: ['text_based', 'step_based', 'web', 'game', 'animation'],
      subject: ['music', 'arts_and_crafts'],
      grade: ['secondary', 'junior', 'senior'],
    },
  },
  './course_without_title/course.yml': {
    isExternal: false,
  },
  './course_without_language/course.yml': {
    isExternal: false,
  },
  './course_with_empty_frontmatter/course.yml': {
    isExternal: false,
  },


  //////////////////////
  // External courses //
  //////////////////////

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
  './external_course/course.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'sound'],
      subject: ['music', 'programming', 'arts_and_crafts'],
      grade: ['primary', 'secondary', 'junior'],
    },
  },
  './external_course_without_title/course.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'sound'],
      subject: ['music', 'programming', 'arts_and_crafts'],
      grade: ['primary'],
    },
  },
  './external_course_without_language/course.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'sound'],
      subject: ['music', 'programming', 'arts_and_crafts'],
      grade: ['primary'],
    },
  },
  './external_course_without_title_or_language/course.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'sound'],
      subject: ['music', 'programming', 'arts_and_crafts'],
      grade: ['primary'],
    },
  },
  './external_course_without_external/course.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'sound'],
      subject: ['music', 'programming', 'arts_and_crafts'],
      grade: ['primary'],
    },
  },
  './external_course_with_empty_frontmatter/course.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'sound'],
      subject: ['music', 'programming', 'arts_and_crafts'],
      grade: ['primary'],
    },
  },
  './external_course_with_bad_tag/course.yml': {
    isExternal: true,
    tags: {
      topic: ['text_based', 'sound', 'bad_tag'],
      subject: ['music', 'programming', 'arts_and_crafts'],
      grade: ['primary'],
    },
  },
  './external_course_without_tags/course.yml': {
    isExternal: true,
  },
};
