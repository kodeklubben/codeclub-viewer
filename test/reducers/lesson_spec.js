import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../../src/reducers/lesson';

describe('lesson reducer', () => {

  describe('SET_LESSONS', () => {

    it('sets lessons in empty initialState', () => {
      const initialState = {};
      const lessons = {
        'id0': {
          author: 'Bill Gates',
          course: 'scratch',
          level: 3,
          path: 'scratch/asteroids/asteroids',
          tags: {
            platform: ['windows', 'mac'],
            category: ['create game'],
            subject: ['reading']
          },
          title: 'Asteroids'
        },
        'id1': {
          author: 'Bill Gates',
          course: 'scratch',
          level: 1,
          path: 'scratch/hei_verden/hei_verden',
          tags: {
            platform: ['windows', 'browser'],
            category: ['create game', 'get started'],
            subject: ['physics']
          },
          title: 'Hei verden'
        },
        'id2': {
          author: 'Ola Norman',
          course: 'python',
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {
            platform: ['windows', 'ios', 'linux'],
            category: ['create game', 'get started'],
            subject: ['math']
          },
          title: 'Hei verden'
        },
        'id3': {
          author: 'Ola Norman',
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const action = {
        type: 'SET_LESSONS',
        payload: {
          lessons
        }
      };

      deepFreeze(initialState);
      deepFreeze(action);
      deepFreeze(lessons);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(lessons);
    });

    it('replaces lessons in non-empty initialState', () => {
      const initialState = {
        'id0': {
          author: 'Bill Gates',
          course: 'scratch',
          level: 3,
          path: 'scratch/asteroids/asteroids',
          tags: {
            platform: ['windows', 'mac'],
            category: ['create game'],
            subject: ['reading']
          },
          title: 'Asteroids'
        },
        'id1': {
          author: 'Bill Gates',
          course: 'scratch',
          level: 1,
          path: 'scratch/hei_verden/hei_verden',
          tags: {
            platform: ['windows', 'browser'],
            category: ['create game', 'get started'],
            subject: ['physics']
          },
          title: 'Hei verden'
        },
        'id2': {
          author: 'Ola Norman',
          course: 'python',
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {
            platform: ['windows', 'ios', 'linux'],
            category: ['create game', 'get started'],
            subject: ['math']
          },
          title: 'Hei verden'
        },
        'id3': {
          author: 'Ola Norman',
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const lessons = {
        'id0': {
          author: 'Bill Gates',
          course: 'scratch',
          level: 4,
          path: 'scratch/breakout/breakout',
          tags: {
            platform: ['windows', 'mac'],
            category: ['create game'],
            subject: ['physics']
          },
          title: 'Breakout'
        },
        'id1': {
          author: 'Kari Norman',
          course: 'scratch',
          level: 2,
          path: 'scratch/spill/spill',
          tags: {},
          title: 'spill'
        },
        'id2': {
          author: 'Ola Norman',
          course: 'python',
          level: 1,
          path: 'python/hei_verden/hei_verden',
          tags: {
            platform: ['windows', 'ios', 'linux'],
            category: ['create game', 'get started'],
            subject: ['math']
          },
          title: 'Hei verden'
        },
        'id5': {
          author: 'Ola Norman',
          course: 'web',
          level: 2,
          path: 'web/nettside/nettside',
          tags: {},
          title: 'Nettside'
        }
      };
      const action = {
        type: 'SET_LESSONS',
        payload: {
          lessons
        }
      };

      deepFreeze(initialState);
      deepFreeze(action);
      deepFreeze(lessons);
      const nextState = reducer(initialState, action);

      expect(nextState).to.eql(lessons);
    });
  });

});
