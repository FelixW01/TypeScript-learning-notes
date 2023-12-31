// Generic type, type connected to another type
// const names: Array<string> = []; //string[]
// names[0].split(' ');

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("This is done!");
//   }, 2000);
// });

// generic types offers less strict, but effective type checks
// in this example, T & U is just placeholder for whatever type the input is, while
// adding the costraint by extending the object forces the input to be an object the entire process.
function merge<T extends Object, U extends Object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Felix", hobbies: ["Music"] }, { age: 23 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

// Generic function, a bit unspecific, extends lengthy to tell TS that we're going to get a .length value
function countAndDescribe<T extends Lengthy>(element: T) {
  let descriptionText = "Got no value.";
  if (element.length === 0) {
    return console.log(descriptionText);
  } else {
    descriptionText = "Got " + element.length + " elements.";
    return [element, descriptionText];
  }
}

console.log(countAndDescribe(["Sports", "Cooking"]));

function extractAndConvert<T extends Object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "Felix" }, "name"));

// For generic types, you can only choose 1 of the listed types
// For union types, you can choose multipler of the listed types, which brings more problem
// depending on what you need to do
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Felix");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = { name: "Max" };
// objStorage.addItem({ name: "Felix" });
// objStorage.addItem(maxObj);
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date) {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// Readonly stopt the array from being changed in any way.
const names: Readonly<string[]> = ['Felix', 'Max'];
// names.push('Anna');
// names.pop();
