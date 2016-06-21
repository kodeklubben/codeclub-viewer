import { expect } from 'chai';

import {capitalize} from '../src/util';

describe('util.capitalize', () => {

  it('makes first letter in a string capital', () => {
    const text = 'a random string';
    expect(capitalize(text)).to.equal('A random string');
  });

});

