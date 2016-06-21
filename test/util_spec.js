import { expect } from 'chai';

import {capitalize, clone, getListWithDistinctObjects, replaceItemInList} from '../src/util';

describe('util.capitalize', () => {

  it('makes first letter in a string capital', () => {
    const text = 'a random string';
    expect(capitalize(text)).to.equal('A random string');
  });

});

describe('util.clone', () => {

  it('clones the object', () => {
    const obj = {id: 1, content: 'qwerty'};
    const objClone = clone(obj);
    expect(objClone).to.not.equal(obj);
  });

});

describe('util.replaceItemInList', () => {

  it('replaces replaces object in list', () => {
    const arr = ['word1', 'word2', 'word3', 'word4'];
    const oldWord = 'word2';
    const newWord = 'wordTwo';
    const expectedResult = ['word1', 'wordTwo', 'word3', 'word4'];
    expect(replaceItemInList(arr, oldWord, newWord )).to.eql(expectedResult);
  });
  it('does not change the original array', () => {
    const arr = ['word1', 'word2', 'word3', 'word4'];
    const oldWord = 'word2';
    const newWord = 'wordTwo';
    replaceItemInList(arr, oldWord, newWord);
    const expectedResult = ['word1', 'word2', 'word3', 'word4'];
    expect(arr).to.eql(expectedResult);
  });

});

describe('util.getListWithDistinctObjects', () => {

  it('merges objects in the list with same ID', () => {
    const obj1 = {
      id: 'a',
      list: ['item1', 'item2', 'item3', 'item4']
    };
    const obj2 = {
      id: 'b',
      list: ['item4', 'item5', 'item6', 'item7'] 
    };
    const obj3 = {
      id: 'a',
      list: ['item1', 'item3', 'item6', 'item9']
    };
    const mergedObject = {
      id: 'a',
      list: ['item1', 'item2', 'item3', 'item4', 'item6', 'item9']
    };
    const arr = [obj1, obj2, obj3];
    const expectedResult = [mergedObject, obj2];
    const mergeObjects = function(itemA, itemB){
      const mergedObj = {id: itemA.id};
      mergedObj.list = [...new Set(itemA.list.concat(itemB.list))];
      return mergedObj;
    };
    expect(getListWithDistinctObjects(arr, 'id', mergeObjects )).to.eql(expectedResult);
  });

});
