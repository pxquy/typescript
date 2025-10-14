import { useEffect, useState } from "react";
import type { ICategories } from "../types/categories";
import { getAllCategories } from "../api/categories";

const ListCategory = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllCategories();
        setCategories(data.docs);
      } catch (error) {
        console.log("Lỗi dữ liệu", error);
      }
    })();
  }, []);
  return (
    <div className="relative group">
      <button className="text-brown-800 font-semibold hover:text-white bg-yellow-500 p-3 rounded-sm transition cursor-pointer mr-45">
        DANH MỤC
      </button>
      <ul className="absolute left-0 mt-0 w-50 bg-white shadow-lg rounded-md  opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
        {categories.map((c, index) => (
          <li
            key={index + 1}
            className="px-4 py-2 hover:bg-amber-100 cursor-pointer"
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCategory;
