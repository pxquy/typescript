"use strict";
let addNumbers = (x = 5, y) => {
    return x + (y !== null && y !== void 0 ? y : 0);
};
let speech = (output) => {
    console.log("Result: " + output);
};
speech(addNumbers(5, 12));
speech(addNumbers(8, 5));
let something = undefined;
// ❌ Sai: let nothing: never = null; // null không thể gán cho never
// never dùng cho những hàm không bao giờ kết thúc (vd: throw, vòng lặp vô tận)
function throwError(errorMsg) {
    throw new Error(errorMsg);
}
function AddAndHandle(x, y, cb) {
    const result = x + y;
    cb(result);
}
AddAndHandle(10, 20, (result) => {
    console.log(result);
});
