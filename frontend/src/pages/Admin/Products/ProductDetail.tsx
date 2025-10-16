import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

const ProductDetailManager = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/coffee/${id}`
        );
        setProduct(data.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/comments?product=${id}`
        );
        setComments(data.data.docs);
      } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error);
      }
    };
    fetchComments();
  }, [id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/comments", {
        ...newComment,
        product: id,
        user: "671f8206c139c0eab4c4c4ab",
      });
      alert(data.message);
      setNewComment({ title: "", content: "" });
      setComments((prev) => [data.data, ...prev]);
    } catch (error) {
      console.error("Lỗi khi thêm bình luận:", error);
    }
  };

  if (!product)
    return (
      <div className="text-center text-gray-600 mt-10">
        Đang tải sản phẩm...
      </div>
    );

  return (
    <div className="p-10 space-y-10">
      <div className="bg-white shadow-lg rounded-xl p-6 flex gap-8">
        <img
          src={`/images/${product.images}`}
          alt={product.name}
          className="w-60 h-60 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="mt-4 text-lg">
            <span className="font-semibold text-gray-800">Giá gốc:</span>{" "}
            <span className="line-through text-gray-400">{product.price}₫</span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-800">Giá khuyến mãi:</span>{" "}
            <span className="text-red-600">{product.discountPrice}₫</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Danh mục: {product.category?.name}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Bình luận sản phẩm</h3>

        <form onSubmit={handleAddComment} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Tiêu đề bình luận"
            value={newComment.title}
            onChange={(e) =>
              setNewComment({ ...newComment, title: e.target.value })
            }
            className="w-full border rounded-lg p-2 shadow-inner"
          />
          <textarea
            placeholder="Nội dung bình luận..."
            value={newComment.content}
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
            className="w-full border rounded-lg p-2 shadow-inner"
            rows={3}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Thêm bình luận
          </button>
        </form>

        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((cmt) => (
              <div
                key={cmt._id}
                className="border rounded-lg p-4 shadow-sm hover:bg-gray-50"
              >
                <h4 className="font-semibold text-gray-800">{cmt.title}</h4>
                <p className="text-gray-600 mt-1">{cmt.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Bởi {cmt.user?.name || "Ẩn danh"} •{" "}
                  {new Date(cmt.createdAt).toLocaleString()}
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

export default ProductDetailManager;
