import { useState } from "react";

const Bai6 = () => {
  const [color1, setColor1] = useState("bg-red-500");
  const [color2, setColor2] = useState("bg-blue-500");
  const [color3, setColor3] = useState("bg-gray-500");

  const randomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex gap-4 p-6">
      {/* Nút 1 - đổi màu khi click (chuyển đỏ ↔ xanh) */}
      <button
        className={`px-4 py-2 text-white rounded ${color1}`}
        onClick={() =>
          setColor1((prev) =>
            prev === "bg-red-500" ? "bg-green-500" : "bg-red-500"
          )
        }
      >
        Nút 1
      </button>

      {/* Nút 2 - đổi màu khi click (chuyển xanh ↔ vàng) */}
      <button
        className={`px-4 py-2 text-white rounded ${color2}`}
        onClick={() =>
          setColor2((prev) =>
            prev === "bg-blue-500" ? "bg-yellow-500" : "bg-blue-500"
          )
        }
      >
        Nút 2
      </button>

      {/* Nút 3 - luôn random màu khi click */}
      <button
        className={`px-4 py-2 text-white rounded ${color3}`}
        onClick={() => setColor3(randomColor())}
      >
        Nút 3 (Random)
      </button>
    </div>
  );
};

export default Bai6;
