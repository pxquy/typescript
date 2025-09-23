function sum(num1: number = 1, num2: number = 2): number {
  return num1 + num2;
}

console.log(sum());

const sum2 = (num1: number, num2: number = 0): number => {
  return num1 + num2;
};

console.log(sum2(1));

const numbers: number[] = [1, 2, 3, 4, 5];
console.log(numbers);
const numbers2: number[] = [...numbers, 7, 8, 9, 10];
console.log(numbers2);

const sumNumber = (...num: number[]): number => {
  return num.reduce((acc, curr) => acc + curr, 0);
};

console.log(sumNumber(1, 2, 3));
