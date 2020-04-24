const sortAscending = (docs, key1, key2, key3) => {
  if (key3) return sortByThree(docs, key1, key2, key3);
  if (key2) return sortByTwo(docs, key1, key2);
  return sortByOne(docs, key1);
};

const sortDescending = (docs, key1, key2, key3) => {
  if (key3) return sortByThree(docs, key1, key2, key3).reverse();
  if (key2) return sortByTwo(docs, key1, key2).reverse();
  return sortByOne(docs, key1).reverse();
};

// price or description
const sortByOne = (docs, key1) => {
  if (key1 === 'price' || key1 === 'volume') {
    return docs.sort((a, b) => {
      return a[key1] - b[key1];
    });

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

// author (String), volume (Number), and issue (Number)
const sortByThree = (docs, key1, key2, key3) => {
  let author = docs.filter(doc => doc[key1]);
  author = sortByOne(author, key1);

  let volume = docs.filter(doc => doc.hasOwnProperty(key2));
  volume = sortByOne(volume, key2);

  // sort volume by issue
  volume.sort((a, b) => {
    if (a[key2] === b[key2]) {
      return a[key3] - b[key3];
    } else {
      return 0;
    }
  });

  return volume.concat(author);



};



module.exports = {
  sortAscending,
  sortDescending
};