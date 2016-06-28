import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/course';

describe('course reducer', () => {

  describe('SET_ALL_COURSES', () => {

    it('sets allCourses in empty initialState', () => {
      const initialState = [];
      const courses = [
        {
          name: 'scratch',
          lessons: [
            {
              name: 'lesson 1',
              tags: {
                platform: ['windows', 'mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        },
        {
          name: 'python',
          lessons: [
            {
              name: 'lesson 2',
              tags: {
                platform: ['mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 4',
              tags: {
                platform: ['windows'],
                category: ['create game']
              }
            }
          ]
        },
        {
          name: 'web',
          lessons: [
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        }
      ];
      const action = {
        type: 'SET_ALL_COURSES',
        payload: {
          courses
        }
      };
      
      deepFreeze(initialState);
      deepFreeze(action);
      deepFreeze(courses);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(courses);
    });

    it('replaces allCourses in non-empty initialState', () => {
      const initialState = [
        {
          name: 'swift',
          lessons: [
            {
              name: 'lesson 14',
              tags: {
                platform: ['ios', 'mac'],
                category: ['create app'],
                subject: ['math']
              }
            },
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        },
        {
          name: 'unity',
          lessons: [
            {
              name: 'lesson 2',
              tags: {
                platform: ['mac', 'windows'],
                category: ['create game'],
                subject: ['physics']
              }
            },
            {
              name: 'lesson 4',
              tags: {
                platform: ['windows'],
                category: ['create game']
              }
            }
          ]
        },
        {
          name: 'web',
          lessons: [
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        }
      ];
      const courses = [
        {
          name: 'scratch',
          lessons: [
            {
              name: 'lesson 1',
              tags: {
                platform: ['windows', 'mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        },
        {
          name: 'python',
          lessons: [
            {
              name: 'lesson 2',
              tags: {
                platform: ['mac'],
                category: ['create game'],
                subject: ['reading']
              }
            },
            {
              name: 'lesson 4',
              tags: {
                platform: ['windows'],
                category: ['create game']
              }
            }
          ]
        },
        {
          name: 'web',
          lessons: [
            {
              name: 'lesson 3',
              tags: {}
            }
          ]
        }
      ];
      const action = {
        type: 'SET_ALL_COURSES',
        payload: {
          courses
        }
      };
      
      deepFreeze(initialState);
      deepFreeze(action);
      deepFreeze(courses);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(courses);
    });
  });

});
