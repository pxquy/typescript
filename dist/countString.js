"use strict";
function countWord(word, keys) {
    let count = 0;
    for (let w of word) {
        if (w.toLowerCase() === keys.toLowerCase()) {
            count++;
        }
    }
    return count;
}
console.log(countWord("Phùng Xuân Quí", "p"));
