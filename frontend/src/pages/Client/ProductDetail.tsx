import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice: number;
  description: string;
  images: string;
  category: {
    _id: string;
    name: string;
  };
}

interface Comment {
  _id: string;
  title: string;
  content: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);

  const userId = "671f8206c139c0eab4c4c4ab";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, commentRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/coffee/${id}`),
          axios.get(`http://localhost:3000/api/comments?product=${id}`),
        ]);
        setProduct(productRes.data.data);
        setComments(commentRes.data.data.docs);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.title || !newComment.content) {
      alert("Vui lòng nhập đủ tiêu đề và nội dung bình luận");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:3000/api/comments", {
        ...newComment,
        product: id,
        user: userId,
      });
      setComments([data.data, ...comments]);
      setNewComment({ title: "", content: "" });
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-600 mt-20">Đang tải dữ liệu...</div>
    );

  if (!product)
    return (
      <div className="text-center text-red-500 mt-20">
        Không tìm thấy sản phẩm!
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <img
          src={`/images/${product.images}`}
          alt={product.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="mt-3 text-gray-600">{product.description}</p>

            <div className="mt-6">
              <p className="text-gray-500">
                <span className="font-medium">Danh mục:</span>{" "}
                {product.category?.name}
              </p>
              <div className="mt-2">
                <span className="text-gray-400 line-through">
                  {product.price.toLocaleString()}₫
                </span>
                <span className="text-2xl text-red-600 font-semibold ml-3">
                  {product.discountPrice.toLocaleString()}₫
                </span>
              </div>
            </div>
          </div>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl w-fit transition">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Phần bình luận */}
      <div className="mt-10 bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          Bình luận ({comments.length})
        </h2>

        {/* Form gửi bình luận */}
        <form onSubmit={handleSubmit} className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Tiêu đề bình luận"
            value={newComment.title}
            onChange={(e) =>
              setNewComment({ ...newComment, title: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2 shadow-inner focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <textarea
            placeholder="Nội dung bình luận..."
            value={newComment.content}
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2 shadow-inner focus:ring-2 focus:ring-blue-400 outline-none"
            rows={3}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            Gửi bình luận
          </button>
        </form>

        {/* Danh sách bình luận */}
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((cmt) => (
              <div
                key={cmt._id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-semibold text-gray-800">{cmt.title}</h3>
                <p className="text-gray-600 mt-1">{cmt.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {cmt.user?.name || "Ẩn danh"} •{" "}
                  {new Date(cmt.createdAt).toLocaleString("vi-VN")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Chưa có bình luận nào.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
