// Định nghĩa enum (kiểu liệt kê)
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

// Định nghĩa object person với nhiều kiểu dữ liệu
type Person = {
  name: string;
  age: number;
  hobbies: string[]; // mảng string
  role: Role; // dùng enum
  roletuple: [number, string]; // tuple: số + chuỗi
};

const person: Person = {
  name: "",
  age: 0,
  hobbies: [],
  role: Role.ADMIN,
  roletuple: [0, ""],
};

// Gán giá trị cho object
const person1 = {
  name: "Typescript",
  age: 11,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
  roletuple: [2, "author"],
};

// any: mảng có thể chứa bất kỳ kiểu dữ liệu nào
let favoriteActivities: any[];
favoriteActivities = ["Sports", 1, true];

if (person1.role === Role.AUTHOR) {
  console.log("is author");
}

// Thử nghiệm với tuple
// person1.roletuple.push("admin");   // ⚠️ TS cho phép push, nhưng sai ý nghĩa tuple
// person1.roletuple[1] = 10;         // ❌ lỗi vì phần tử 1 phải là string
// person1.roletuple = [10, "admin", "user"]; // ❌ lỗi vì tuple chỉ nhận 2 phần tử

type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2; // ép kiểu về số và cộng
  } else {
    result = input1.toString() + input2.toString(); // nối chuỗi
  }
  return result;
}

// Dùng với số
const combineNumber = combine(30, 26, "as-number");
console.log(combineNumber); // 56

// Dùng với chuỗi nhưng ép kiểu số
const combineStringNumber = combine("30", "26", "as-number");
console.log(combineStringNumber); // 56

// Dùng với chuỗi và nối chuỗi
const combineText = combine("Typescript Vs ", "Javascript", "as-text");
console.log(combineText); // "Typescript Vs Javascript"

// Khai báo biến với null
var a2 = null;
console.log(a2); // null
console.log(typeof a2); // "object" (đặc thù của JS)

// Khai báo biến nhưng chưa gán giá trị
var b;
console.log(b); // undefined
console.log(typeof b); // "undefined"

// Thử in biến chưa được khai báo
// console.log(undeclaredVar); // ❌ Lỗi ReferenceError

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Typescript";

userName = <string>userInput;
if (typeof userInput === "string") {
  userName = userInput;
}
