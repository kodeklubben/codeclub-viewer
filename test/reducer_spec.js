import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import reducer from '../src/reducer';

describe('reducer', () => {

  describe('SET_COURSES', () => {

    it('sets courses in empty initialState', () => {
      const initialState = {};
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
        type: 'SET_COURSES',
        payload: {
          courses
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        courses: [
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
        ]
      });
    });

    it('replaces courses in non-empty initialState', () => {
      const initialState = {
        courses: [
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
        ]
      };
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
        type: 'SET_COURSES',
        payload: {
          courses
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        courses: [
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
        ]
      });
    });
  });

  describe('SET_ALL_COURSES', () => {

    it('sets allCourses in empty initialState', () => {
      const initialState = {};
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
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        allCourses: [
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
        ]
      });
    });

    it('replaces allCourses in non-empty initialState', () => {
      const initialState = {
        allCourses: [
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
        ]
      };
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
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        allCourses: [
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
        ]
      });
    });
  });
  describe('SET_FILTER', () => {

    it('sets filter in empty initialState', () => {
      const initialState = {};
      const filter = {
        platform: {
          'windows': false,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': false}
      };
      const action = {
        type: 'SET_FILTER',
        payload: {
          filter
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        filter: {
          platform: {
            'windows': false,
            'mac': false
          },
          category: {'create game': false},
          subject: {'reading': false}
        }
      });
    });

    it('sets filter in non-empty initialState', () => {
      const initialState = {
        filter: {
          platform: {
            'windows': true,
            'browser': false
          },
          category: {'create app': false},
          subject: {'math': true}
        }
      };
      const filter = {
        platform: {
          'windows': false,
          'mac': false
        },
        category: {'create game': false},
        subject: {'reading': false}
      };
      const action = {
        type: 'SET_FILTER',
        payload: {
          filter
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        filter: {
          platform: {
            'windows': false,
            'mac': false
          },
          category: {'create game': false},
          subject: {'reading': false}
        }
      });
    });
  });


  describe('FILTER_CHECKED', () => {

    it('changes state (checked/unchecked) of tagItem in filter', () => {
      const initialState = {
        filter: {
          platform: {
            'windows': true,
            'mac': false
          },
          category: {'create game': false},
          subject: {'reading': true}
        }
      };
      const action = {
        type: 'FILTER_CHECKED',
        payload: {
          groupName: 'platform',
          tagName: 'mac'
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        courses: [],
        filter: {
          platform: {
            'windows': true,
            'mac': true
          },
          category: {'create game': false},
          subject: {'reading': true}
        }
      });
    });

    it('does nothing if groupName does not already exist in filter', () => {
      const initialState = {
        filter: {
          platform: {
            'windows': true,
            'mac': false
          },
          category: {'create game': false},
          subject: {'reading': true}
        }
      };
      const action = {
        type: 'FILTER_CHECKED',
        payload: {
          groupName: 'something',
          tagName: 'mac'
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        filter: {
          platform: {
            'windows': true,
            'mac': false
          },
          category: {'create game': false},
          subject: {'reading': true}
        }
      });
    });

    it('does nothing if tagName does not already exist in filter', () => {
      const initialState = {
        filter: {
          platform: {
            'windows': true,
            'mac': false
          },
          category: {'create game': false},
          subject: {'reading': true}
        }
      };
      const action = {
        type: 'FILTER_CHECKED',
        payload: {
          groupName: 'platform',
          tagName: 'browser'
        }
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        filter: {
          platform: {
            'windows': true,
            'mac': false
          },
          category: {'create game': false},
          subject: {'reading': true}
        }
      });
    });

    it('does nothing if payload is empty', () => {
      const initialState = {
        filter: {
          platform: {
            'windows': true,
            'mac': false
          },
          category: {'create game': false},
          subject: {'reading': true}
        }
      };
      const action = {
        type: 'FILTER_CHECKED',
        payload: {}
      };
      const nextState = reducer(initialState, action);

      deepFreeze(initialState);
      deepFreeze(action);
      expect(nextState).to.eql({
        filter: {
          platform: {
            'windows': true,
            'mac': false
          },
          category: {'create game': false},
          subject: {'reading': true}
        }
      });
    });
  });

});

