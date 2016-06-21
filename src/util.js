/**
 * Makes first character in str upper case
 *
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Creates a clone of obj
 *
 * @param {object} obj
 */
export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Returns a new array where objects with same ID have been merged
 *
 * @param {Array} objects Array of objects where several objects may have same ID
 * @param {string} id The property used to match objects
 * @param {function} mergeObjects define how objects with identical IDs will be merged
 * @returns {Array} A new array where all object have distinct IDs
 */
export function getListWithDistinctObjects(objects, id, mergeObjects) {
  // Clone objects to prevent side-effects that might be caused by mergeObjects
  objects = clone(objects);

  let list = [];
  objects.forEach(function (obj){
    // Check if the object is already in the list
    const objFound = list.find((objInList) => {
      return objInList[id].toLowerCase() === obj[id].toLowerCase();
    });

    if(objFound) {
      const mergedObj = mergeObjects(objFound, obj);
      list = replaceItemInList(list, objFound, mergedObj);
    } else {
      list.push(obj);
    }
  });
  return list;
}

/**
 * Replaces oldItem with newItem
 * 
 * @param {Array} list
 * @param {object} oldItem
 * @param {object} newItem
 * @returns {Array} New array where oldItem has been replaced with newItem
 */
export function replaceItemInList(list, oldItem, newItem){
  const index = list.indexOf(oldItem);
  
  // Replace oldItem if it exist in list, push newItem if it doesn't
  if(index < 0) {
    return list.concat([newItem]);
  } else {
    // Slice list before and after index. Add newItem at index position.
    return list.slice(0, index).concat([newItem].concat(list.slice(index+1)));
  }
}

/**
 * Checks if arr contains all elements in subArr
 *
 * @param {Array} subArr
 * @param {Array} arr
 * @returns {boolean}
 */
export function isSubArray(subArr, arr) {
  for(var i = 0; i < subArr.length; i++){
    var subEle = subArr[i];
    var found = arr.find(arrEle => arrEle.toLowerCase() === subEle.toLowerCase());
    if( !found )return false;
  }
  return true;
}

