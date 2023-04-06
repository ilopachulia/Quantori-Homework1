// ----==== JS School - Lecture 4 HW ====----

/**
 * Ð¡riteria for assessment
 *
 * 5 - All tasks are correctly solved (23 items), the code is clean, the solutions are optimal;
 * 4 - Correctly solved all the tasks of the base block (15 tasks), the code is clean;
 * 3 - At least 10 problems are correctly solved, the code is clean;
 * 2 - Correctly solved at least 10 problems;
 * 1 - At least 5 problems solved correctly.
 */

/**
 * Warning
 *
 * Do not rename function names or change arguments.
 */

// ----==== Basic exercises (15 items) ====----
/**
 * Exercise 1
 *
 * Write a function that returns odd array values.
 * [1,2,3,4] => [1,3]
 */
const getOddValues = (numbers) => {
  let oddNumArr = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 !== 0) {
      oddNumArr.push(numbers[i]);
    }
  }

  return oddNumArr;
};

getOddValues([1, 2, 3, 4]);
/**
 * Exercise 2
 *
 * Write a function that returns the smallest value of an array
 * [4,2,10,27] => 2
 */
const getSmallestValue = (numbers) => {
  let min = Math.min(...numbers);
  return min;
};

getSmallestValue([4, 2, 10, 27]);
/**
 * Exercise 3
 *
 * Write a function that returns the biggest value of an array
 * [5,22,9,43] => 43
 */
const getBiggestValue = (numbers) => {
  let max = Math.max(...numbers);
  return max;
};

getBiggestValue([5, 22, 9, 43]);
/**
 * Exercise 4
 *
 * Write a function that takes an array of strings as input
 * and returns only those shorter than 20 characters
 *
 *[
 * 'I am a short string',
 * 'I seem to be short too',
 * 'And I am a long string'
 *] => [
 * 'I am a short string',
 *]
 *
 * Use: filter
 */
const getShorterStrings = (strings, characters = 20) => {
  let filteredStrings = strings.filter((i) => i.length < 20);

  return filteredStrings;
};

getShorterStrings([
  "I am a short string",
  "I seem to be short too",
  "And I am a long string",
]);

/**
 * Exercise 5
 *
 * Write a function that takes the following data as input:
 *
 *[
 * { name: 'shark', likes: 'ocean' },
 * { name: 'turtle', likes: 'pond' },
 * { name: 'otter', likes: 'fish biscuits' }
 *]
 *
 * And returns an array of strings:
 *
 * [ 'shark likes ocean', 'turtle likes pond', 'otter likes fish biscuits' ]
 *
 * Use: map
 */
const getComputedStrings = (fish) => {
  return fish.map((item) => `${item.name} likes ${item.likes} `);
};
getComputedStrings([
  { name: "shark", likes: "ocean" },
  { name: "turtle", likes: "pond" },
  { name: "otter", likes: "fish biscuits" },
]);

/**
 * Exercise 6
 *
 * Write a function that takes 2 objects as input and returns 1 with
 * common properties. If properties have the same keys use the latter.
 *
 * [{ name: 'Alice' }, { age: 11 }] => { name: 'Alice', age: 11 }
 *
 * We use: ...
 */
const mergeObjects = (objects) => {
  let result = { ...objects[0], ...objects[1] };
  return result;
};

mergeObjects([{ name: "Alice" }, { age: 11 }]);

/**
 * Exercise 7
 *
 * Write a function that returns the smallest value of an array
 * [5,200,-5,41] => -5
 *
 * Use: operator ... and Math.min
 */
const getSmallestValue2 = (numbers) => {
  let result = Math.min(...numbers);
  return result;
};

getSmallestValue2([5, 200, -5, 41]);
/**
 * Exercise 8
 *
 * Write a function that returns odd array values.
 * [77,2,30,51] => [77,51]
 *
 * Use: reduce
 */
const getOddValues2 = (numbers) => {
  let result = numbers.reduce((arr, number) => {
    if (number % 2 !== 0) {
      arr.push(number);
    }
    return arr;
  }, []);
  return result;
};

getOddValues2([77, 2, 30, 51]);

/**
 * Exercise 9
 *
 * Write a function that accepts data from the basket as input in the following form:
 *
 *[
 * {price: 10, count: 2},
 * {price: 100, count: 1},
 * {price: 2, count: 5},
 * {price: 15, count: 6},
 *]
 * where price is the price of the item and count is the quantity.
 *
 * The function should return the total price for this order.
 *
 * Use: reduce
 */
const calculateTotal = (products) => {
  let result = products.reduce((acc, curr) => {
    return acc + curr.price * curr.count;
  }, 0);
  return result;
};

calculateTotal([
  { price: 10, count: 2 },
  { price: 100, count: 1 },
  { price: 2, count: 5 },
  { price: 15, count: 6 },
]);

/**
 * Exercise 10
 *
 * Implement a function that has an array of numbers as input and an array of unique values as output
 * [1, 2, 2, 4, 5, 5] => [1, 2, 4, 5]
 *
 * Use: reduce and indexOf
 */
const getUniqueValues = (numbers) => {
  // much easier way is using SET

  let result = numbers.reduce((arr, curr) => {
    if (arr.indexOf(curr) === -1) {
      arr.push(curr);
    }
    return arr;
  }, []);

  return result;
};

getUniqueValues([1, 2, 2, 4, 5, 5]);
/**
 * Exercise 11
 *
 * Implement a function whose input is a numeric code of an error, the output is a string with a message
 * 500 => Server Error
 * 401 => Authorization failed
 * 402 => Server Error
 * 403 => Access denied
 * 404 => Not found
 *
 * Use: switch case or object like a map structure
 */

const getErrorMessage = (code) => {
  switch (code) {
    case 500:
      return "Exercise - 11:", "Server Error";
    case 401:
      return "Exercise - 11:", "Authorization failed";
    case 402:
      return "Exercise - 11:", "Server Error";
    case 403:
      return "Exercise - 11:", "Access denied";
    case 404:
      return "Exercise - 11:", "Not found";
    default:
      return "Exercise - 11:", "Unknown error code: ${code}`";
  }
};

getErrorMessage(403);

/**
 * Exercise 12
 *
 * Write a function that returns the 2 smallest values of an array
 * [4,3,2,1] => [1,2]
 *
 * Use: .sort()
 */
const get2SmallestValues = (numbers) => {
  let sortedArr = numbers.sort((a, b) => a - b);
  return [sortedArr[0], sortedArr[1]];
};

get2SmallestValues([4, 3, 2, 1]);
get2SmallestValues([4, -3, 2, -7, 7, 1, -1]);
/**
 * Exercise 13
 *
 * Implement a function, at the input of which an object of the following form:
 * {
 * firstName: 'Peter',
 * secondName: 'Vasiliev',
 * patronymic: 'Ivanovich'
 *}
 * output line with the message 'Name: Petr Ivanovich Vasiliev'
 */
const getFullName = (user) => {
  return `Name: ${user.firstName} ${user.patronymic} ${user.secondName}`;
};
getFullName({
  firstName: "Peter",
  secondName: "Vasiliev",
  patronymic: "Ivanovich",
});
/**
 * Exercise 14
 *
 * Implement a function that takes 2 arguments as input: an array of numbers and a multiplier,
 * a returns an array of the original array, each element of which has been multiplied by a factor:
 *
 * [1,2,3,4], 5 => [5,10,15,20]
 *
 * Use: map
 */
const multiplyTo = (numbers, multiplier) => {
  return numbers.map((item) => item * multiplier);
};

multiplyTo([1, 2, 3, 4], 5);
/**
 * Exercise 15
 *
 * Implement a function that takes 2 arguments as input: an array and a franchise,
 * and returns a string with the names of the heroes separated by a comma:
 *
 *[
 * {name: "Batman", franchise: "DC"},
 * {name: "Ironman", franchise: "Marvel"},
 * {name: "Thor", franchise: "Marvel"},
 * {name: "Superman", franchise: "DC"}
 *],
 * Marvel
 * => Ironman, Thor
 *
 * Use: filter, map, join
 */

const getDicharacterNames = (characters, franchise) => {
  const result = characters
    .filter((item) => item.franchise === franchise)
    .map((item) => item.name)
    .join(", ");
  return result;
};

getDicharacterNames(
  [
    { name: "Batman", franchise: "DC" },
    { name: "Ironman", franchise: "Marvel" },
    { name: "Thor", franchise: "Marvel" },
    { name: "Superman", franchise: "DC" },
  ],
  "Marvel"
);

// ----==== Advanced exercises (8 items) ====----
/**
 * Exercise 16
 *
 * Write a function that returns an array of the smallest row values of a two-dimensional array
 *[
 * [10,1,300,4],
 * [20,2,300,400],
 * [30,3,300,4],
 * [40,4,300,4],
 *]
 * => [1,2,3,4]
 */
const getSmallestRow = (numbers) => {
  const result = [];

  for (let i = 0; i < numbers.length; i++) {
    let min = numbers[i][0];

    for (let j = 1; j < numbers[i].length; j++) {
      if (numbers[i][j] < min) {
        min = numbers[i][j];
      }
    }
    result.push(min);
  }
  return result;
};

getSmallestRow([
  [10, 1, 300, 4],
  [20, 2, 300, 400],
  [30, 3, 300, 4],
  [40, 4, 300, 4],
]);
/**
 * Exercise 17
 *
 * Write a function that returns an array of the smallest column values of a two-dimensional array
 *[
 * [1,2,3,4],
 * [1,2,3,4],
 * [1,2,30,4],
 * [1,2,3,40],
 *]
 * => [1,2,3,4]
 */

const getSmallestColumn = (numbers) => {
  const result = [];

  for (let i = 0; i < numbers[0].length; i++) {
    let min = numbers[0][i];

    for (let j = 1; j < numbers.length; j++) {
      if (numbers[j][i] < min) {
        min = numbers[j][i];
      }
    }

    result.push(min);
  }

  return result;
};

getSmallestColumn([
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [1, 2, 30, 4],
  [1, 2, 3, 40],
]);
/**
 * Exercise 18
 *
 * Write a function that returns the 2 biggest value of an array
 * [4,3,2,1] => [4,3]
 */
const get2BiggestValues = (numbers) => {
  numbers.sort((a, b) => b - a);
  return [numbers[0], numbers[1]];
};

get2BiggestValues([4, 3, 2, 1]);
/**
 * Exercise 19
 *
 * Write a function that returns the number of vowels in a string in English
 * ( a, e, i, o, u ).
 *
 * 'Return the number (count) of vowels in the given string.' => 15
 */
const getNumberOfVowels = (string) => {
  const regex = /[aeiou]/gi;
  const matches = string.match(regex);
  return matches.length;
};

getNumberOfVowels(
  "Write a function that returns the number of vowels in a string in English"
);

/**
 * Exercise 20
 *
 * Write a function that returns an array of two strings where the first element
 * is the original string with uppercase even letters, and the second
 * with capital odd.
 * 'abcdef' => ['AbCdEf', 'aBcDeF']
 */
const getCapitalizedStrings = (string) => {
  let arr = [...string];
  const stringArr1 = arr.map((item, index) =>
    index % 2 === 0 ? item.toUpperCase() : item.toLowerCase()
  );
  const stringArr2 = arr.map((item, index) =>
    index % 2 !== 0 ? item.toUpperCase() : item.toLowerCase()
  );

  return [stringArr1, stringArr2];
};

getCapitalizedStrings("abcdef");

/**
 * Exercise 21
 *
 * Write a function that satisfies the following conditions:
 *
 * the function takes a string S, consisting of N letters of the English alphabet in lowercase [a-z]
 * the function returns a string that does not contain three identical letters in a row
 * the function removes the minimum number of letters from the string S
 *
 * Examples:
 * S = "eedaaad", the function returns "eedaad". One "a" has been removed.
 * S = "xxxtxxx", the function returns "xxtxx". The same letters can occur more than three times in a string, but not in a row.
 * S = "uuuuxaaaaxuuu", the function returns "uuxaaxuu".
 *
 * Assumptions:
 * N is an integer in the range [1..200,000]
 * S consists only of lowercase letters [a-z]
 */
const getCorrectString = (string) => {
  return string.replace(/(.)\1{2,}/g, "$1$1");
};

getCorrectString("uuuuxaaaaxuuu");

/**
 * Exercise 22
 *
 * Implement a flatten function that takes an array of arbitrary nesting arrays as input
 * and returns an array of all their elements without nesting.
 * [1, 2, [3, 4], 5, [[6, 7], 8], 9] => [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
const getFlattenedArray = (numbers) => {
  let result = numbers.flat(Infinity);
};

getFlattenedArray([1, 2, [3, 4], 5, [[6, 7], 8], 9]);
/**
 * Exercise 23
 *
 * Implement a function that has an array of numbers as input and an array of not unique values as output.
 *
 * [1, 2, 2, 4, 5, 5] => [2, 5]
 */
const getNotUniqueValues = (numbers) => {
  const frequenceObj = {};

  const notUniqueValues = numbers.filter((num) => {
    frequenceObj[num] = (frequenceObj[num] || 0) + 1;
    return frequenceObj[num] === 2;
  });

  return notUniqueValues;
};

getNotUniqueValues([1, 2, 2, 4, 5, 5]);
