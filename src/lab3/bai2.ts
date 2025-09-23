let addNumbers = (x: number = 5, y?: number) => {
  return x + (y ?? 0);
};

let speech = (output: any): void => {
  console.log("Result: " + output);
};

speech(addNumbers(5, 12));
speech(addNumbers(8, 5));

let something: void = undefined;

// ❌ Sai: let nothing: never = null; // null không thể gán cho never
// never dùng cho những hàm không bao giờ kết thúc (vd: throw, vòng lặp vô tận)

function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

function AddAndHandle(x: number, y: number, cb: (num: number) => void) {
  const result = x + y;
  cb(result);
}

AddAndHandle(10, 20, (result) => {
  console.log(result);
});
