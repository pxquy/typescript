import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { IProduct } from "../../../types/products";
import type { IComment } from "../../../types/comment";

const ProductDetailManager = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState({ title: "", content: "" });
  const [editingComment, setEditingComment] = useState<IComment | null>(null);
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/coffee/${id}`
        );
        setProduct(data.data);
      } catch {
        toast.error("Lỗi khi lấy sản phẩm");
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
      } catch {
        toast.error("Lỗi khi lấy bình luận");
      }
    };
    fetchComments();
  }, [id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.title || !newComment.content) {
      toast.warn("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/comments",
        { ...newComment, product: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Đã thêm bình luận!");
      setNewComment({ title: "", content: "" });
      setComments((prev) => [data.data, ...prev]);
    } catch {
      toast.error("Không thể thêm bình luận!");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa bình luận này?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(comments.filter((c) => c._id !== commentId));
      toast.success("Đã xóa bình luận!");
    } catch (error) {
      toast.error("Lỗi khi xóa bình luận!");
    }
  };

  const handleEditComment = (comment: IComment) => {
    setEditingComment(comment);
    setNewComment({ title: comment.title, content: comment.content });
  };

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingComment) return;

    const confirm = window.confirm("Xác nhận cập nhật bình luận?");
    if (!confirm) return;

    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/comments/${editingComment._id}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((prev) =>
        prev.map((c) =>
          c._id === editingComment._id ? { ...c, ...data.data } : c
        )
      );
      setEditingComment(null);
      setNewComment({ title: "", content: "" });
      toast.success("Đã cập nhật bình luận!");
    } catch {
      toast.error("Không thể cập nhật bình luận!");
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
      <ToastContainer position="top-right" />

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
        <h3 className="text-xl font-semibold mb-4">
          {editingComment ? "✏️ Chỉnh sửa bình luận" : "💬 Thêm bình luận mới"}
        </h3>

        <form
          onSubmit={editingComment ? handleUpdateComment : handleAddComment}
          className="space-y-4 mb-6"
        >
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
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {editingComment ? "✅ Xác nhận cập nhật" : "➕ Thêm bình luận"}
            </button>
            {editingComment && (
              <button
                type="button"
                onClick={() => {
                  setEditingComment(null);
                  setNewComment({ title: "", content: "" });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                ❌ Hủy
              </button>
            )}
          </div>
        </form>

        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((cmt) => (
              <div
                key={cmt._id}
                className="border rounded-lg p-4 shadow-sm hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800">{cmt.title}</h4>
                    <p className="text-gray-600 mt-1">{cmt.content}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Bởi {cmt.user?.name || "Ẩn danh"} •{" "}
                      {new Date(cmt.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditComment(cmt)}
                      className="text-blue-600 hover:underline"
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteComment(cmt._id)}
                      className="text-red-600 hover:underline"
                    >
                      🗑 Xóa
                    </button>
                  </div>
                </div>
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
