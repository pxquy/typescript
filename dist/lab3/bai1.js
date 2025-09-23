"use strict";
function sum(num1 = 1, num2 = 2) {
    return num1 + num2;
}
console.log(sum());
const sum2 = (num1, num2 = 0) => {
    return num1 + num2;
};
console.log(sum2(1));
const numbers = [1, 2, 3, 4, 5];
console.log(numbers);
const numbers2 = [...numbers, 7, 8, 9, 10];
console.log(numbers2);
const sumNumber = (...num) => {
    return num.reduce((acc, curr) => acc + curr, 0);
};
console.log(sumNumber(1, 2, 3));
