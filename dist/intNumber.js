"use strict";
function isPrime(n) {
    if (n < 2 || n % 2 === 0) {
        if (n === 2) {
            return true;
        }
        return false;
    }
    const sqrtN = Math.sqrt(n);
    for (let i = 3; i <= sqrtN; i += 2) {
        if (n % i === 0)
            return false;
    }
    return true;
}
console.log(isPrime(20));
console.log(isPrime(15));
console.log(isPrime(18));
console.log(isPrime(14));
