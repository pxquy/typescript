"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Lấy 10 pokemon đầu tiên
        const data = yield fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        const result = yield data.json();
        const boxImage = document.getElementById("boxImage");
        for (const p of result.results) {
            // Gọi API chi tiết từng pokemon
            const detailRes = yield fetch(p.url);
            const detail = yield detailRes.json();
            // Tạo container
            const container = document.createElement("div");
            container.style.display = "inline-block";
            container.style.textAlign = "center";
            container.style.margin = "10px";
            // Thêm ảnh
            const img = document.createElement("img");
            img.src = detail.sprites.front_default;
            img.alt = p.name;
            // Thêm tên
            const name = document.createElement("p");
            name.innerText = p.name;
            container.appendChild(img);
            container.appendChild(name);
            if (boxImage) {
                boxImage.appendChild(container);
            }
        }
    }
    catch (err) {
        console.error("Có lỗi khi fetch:", err);
    }
}))();
