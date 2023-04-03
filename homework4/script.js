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

  console.log("exercise - 1:", oddNumArr);
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
  console.log("exercise - 2:", min);
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
  console.log("exercise - 3:", max);
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
  let shortString = strings.filter((i) => i.length < 20);

  console.log("exercise - 4:", shortString);
  return shortString;
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
  console.log(
    "exercise - 5:",
    fish.map((item) => `${item.name} likes ${item.likes} `)
  );
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
  console.log("exercise - 6:", result);
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
  console.log("exercise - 7:", result);
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
  console.log("exercise - 8:", result);
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
  console.log("exercise - 9:", result);
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

  console.log("exercise - 10:", result);
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
      console.log("Exercise - 11:", "Server Error");
      break;
    case 401:
      console.log("Exercise - 11:", "Authorization failed");
      break;
    case 402:
      console.log("Exercise - 11:", "Server Error");
      break;
    case 403:
      console.log("Exercise - 11:", "Access denied");
      break;
    case 404:
      console.log("Exercise - 11:", "Not found");
      break;
    default:
      console.log("Exercise - 11:", "Unknown error code: ${code}`");
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
  let sortedArr = numbers.sort();
  console.log("exercise - 12:", [sortedArr[0], sortedArr[1]]);
  return [sortedArr[0], sortedArr[1]];
};

get2SmallestValues([4, 3, 2, 1]);
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
  console.log(
    "exercise - 13:",
    `Name: ${user.firstName} ${user.patronymic} ${user.secondName}`
  );
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
  console.log(
    "exercise - 14:",
    numbers.map((item) => item * multiplier)
  );
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
  console.log("exercise - 15:", result);
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
const getSmallestRow = (numbers) => {};
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
const getSmallestColumn = (numbers) => {};
/**
 * Exercise 18
 *
 * Write a function that returns the 2 biggest value of an array
 * [4,3,2,1] => [4,3]
 */
const get2BiggestValues = (numbers) => {
  numbers.sort((a, b) => b - a);
  console.log("exercise - 18:", [numbers[0], numbers[1]]);
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
  let count = 0;
  let vowels = ["a", "e", "i", "o", "u"];
  let arr = [...string];

  arr.map((item) => {
    if (vowels.includes(item)) {
      count++;
    }
  });

  console.log("exercise - 19:", count);
  return count;
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
  let stringArr1 = [];
  let stringArr2 = [];
  let result = [];
  arr.map((item, index) => {
    if (index % 2 === 0) {
      stringArr1.push(item.toUpperCase());
    } else {
      stringArr1.push(item);
    }
  });
  arr.map((item, index) => {
    if (index % 2 !== 0) {
      stringArr2.push(item.toUpperCase());
    } else {
      stringArr2.push(item);
    }
  });
  result.push(stringArr1.join("")), result.push(stringArr2.join(""));
  console.log("exercise - 20:", result);
  return result;
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
const getCorrectString = (string) => {};
/**
 * Exercise 22
 *
 * Implement a flatten function that takes an array of arbitrary nesting arrays as input
 * and returns an array of all their elements without nesting.
 * [1, 2, [3, 4], 5, [[6, 7], 8], 9] => [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
const getFlattenedArray = (numbers) => {
  let result = numbers.flat(Infinity);
  console.log("exercise - 22:", result);
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
  let helperArr = [];
  let mainArr = [];

  numbers.map((item) => {
    if (!helperArr.includes(item)) {
      helperArr.push(item);
    } else {
      mainArr.push(item);
    }
  });

  let set = new Set(mainArr);
  let result = [...set];
  console.log("exercise - 23:", result);
  return result;
};

getNotUniqueValues([1, 2, 2, 4, 5, 5]);
