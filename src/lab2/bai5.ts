interface PokemonListResponse {
  results: { name: string; url: string }[];
}

interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string;
  };
}

(async () => {
  try {
    // Lấy 10 pokemon đầu tiên
    const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const result: PokemonListResponse = await data.json();

    const boxImage = document.getElementById("boxImage");

    for (const p of result.results) {
      // Gọi API chi tiết từng pokemon
      const detailRes = await fetch(p.url);
      const detail: PokemonDetail = await detailRes.json();

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
  } catch (err) {
    console.error("Có lỗi khi fetch:", err);
  }
})();
