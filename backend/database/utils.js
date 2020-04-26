// 1 of 2 main functions
const sortAscending = (docs, key1, key2, key3) => {
  if (key3) return sortByThree(docs, key1, key2, key3);
  if (key2) return sortByTwo(docs, key1, key2);
  return sortByOne(docs, key1);
};

// 2 of 2 main functions
const sortDescending = (docs, key1, key2, key3) => {
  if (key3) return sortByThree(docs, key1, key2, key3).reverse();
  if (key2) return sortByTwo(docs, key1, key2).reverse();
  return sortByOne(docs, key1).reverse();
};


// price or description
const sortByOne = (docs, key1) => {
  // if number
  if (key1 === 'price' || key1 === 'volume' || key1 === 'issue') {
    return docs.sort((a, b) => {
      return a[key1] - b[key1];
    });

  // if string
  } else if (key1 === 'description' || key1 === 'author') {
    return docs.sort((a, b) => {
      var A = a[key1].toUpperCase();
      var B = b[key1].toUpperCase();
      if (A < B) {
        return -1;
      } else if (A > B) {
        return 1;
      } else {
        return 0;
      }
    });
  }
};


// title and name
const sortByTwo = (docs, key1, key2) => {
  return docs.sort((a, b) => {
    // if title exists, use it; otherwise, use name
    var A = a[key1] ? a[key1].toUpperCase() : a[key2].toUpperCase();
    var B = b[key1] ? b[key1].toUpperCase() : b[key2].toUpperCase();
    if (A < B) {
      return -1;
    } else if (A > B) {
      return 1;
    } else {
      return 0;
    }
  });
};


// author (string), volume (number), and issue (number)
const sortByThree = (docs, key1, key2, key3) => {
  // sort author (string)
  let author = docs.filter(doc => doc[key1]);
  author = sortByOne(author, key1);

  // sort volume (number)
  let volume = docs.filter(doc => doc.hasOwnProperty(key2));
  volume = sortByOne(volume, key2);

  // sort volume by issue
  volume = subSort(volume, key2, key3);

  return volume.concat(author);
};


const subSort = (docs, key1, key2) => {
  for (let i = 0; i < docs.length; i++) {

    // if two consecutive volume properties are equal
    if ( docs[i + 1] && (docs[i][key1] === docs[i + 1][key1]) ) {
      let start = i; // splice start
      let count = 2; // delete count

      // count how many more volume properties are equal
      for (let j = start + count; j < docs.length; j++) {
        if (docs[i][key1] === docs[j][key1]) {
          count++;
        } else {
          break;
        }
      }

      // splice subarray and sort subarray
      const subArray = sortByOne(docs.splice(start, count), key2);
      // splice back into docs array
      docs.splice(start, 0, ...subArray);
      i = i + count - 1;
    }
  }

  return docs;
};


export const utils = {
  sortAscending,
  sortDescending
};