"use strict";
const product = [
    {
        id: 1,
        name: "Mô hình robot",
        price: 1000,
        category: "điện tử",
    },
    {
        id: 2,
        name: "Mô hình robot",
        price: 2000,
        category: "điện tử",
    },
    {
        id: 3,
        name: "Rau cải bắp",
        price: 3000,
        category: "Thực phẩm",
    },
    {
        id: 4,
        name: "Mô hình robot",
        price: 4000,
        category: "điện tử",
    },
    {
        id: 5,
        name: "Mô hình robot",
        price: 5000,
        category: "điện tử",
    },
];
console.log(product);
const filterCategory = product.filter((p) => p.category === "điện tử");
console.log(filterCategory);
const calculatePrice = product.reduce((acc, curr) => acc + curr.price, 0);
function findMinMax(product) {
    if (product.length === 0) {
        return { min: null, max: null };
    }
    let min = product[0];
    let max = product[0];
    for (let i = 1; i < product.length; i++) {
        if (product[i].price < min.price) {
            min = product[i];
        }
        if (product[i].price > max.price) {
            max = product[i];
        }
    }
    return { min, max };
}
const minMaxResult = findMinMax(product);
console.log("Sản phẩm giá nhỏ nhất:", minMaxResult.min);
console.log("Sản phẩm giá lớn nhất:", minMaxResult.max);
const moTorBike = [
    {
        name: "kawasaki z800",
        type: "Xe máy",
        speed: 350,
        enum: "Xăng",
    },
    {
        name: "kawasaki z800",
        type: "Xe máy",
        speed: 350,
        enum: "Xăng",
    },
    {
        name: "kawasaki z800",
        type: "Xe máy",
        speed: 350,
        enum: "Xăng",
    },
    {
        name: "kawasaki z800",
        type: "Xe máy",
        speed: 350,
        enum: "Xăng",
    },
    {
        name: "kawasaki z800",
        type: "Xe máy",
        speed: 350,
        enum: "Xăng",
    },
];
console.log(moTorBike);
const calculateTravelTime = (vehicle, distance) => {
    if (vehicle.speed === 0) {
        return Infinity;
    }
    return distance / vehicle.speed;
};
const distance = 100;
moTorBike.forEach((v) => {
    const time = calculateTravelTime(v, distance);
    console.log(`${v.name} đi ${distance} km mất khoảng ${time.toFixed(2)} giờ`);
});
