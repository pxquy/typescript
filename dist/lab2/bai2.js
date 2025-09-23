"use strict";
function add(x = 5) {
    let phrase = "Result is ";
    // phrase = 10;   // ❌ lỗi vì phrase đã được TypeScript suy luận là string
    // x = '2.8';     // ❌ lỗi vì x đã được suy luận là number
    return phrase + x; // trả về chuỗi "Result is 5"
}
let addResult = add();
console.log(addResult);
let personBai2;
personBai2 = {
    name: "Typescript",
    age: 11,
};
console.log(personBai2.name); // => "Typescript"
