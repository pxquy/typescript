import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// 🟩 REQUEST INTERCEPTOR
// ==============================
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==============================
// 🟥 RESPONSE INTERCEPTOR
// ==============================
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý kết quả trả về thành công
    return response;
  },
  (error) => {
    // Nếu token hết hạn hoặc bị lỗi 401
    if (error.response && error.response.status === 401) {
      console.warn("Token hết hạn hoặc không hợp lệ!");

      // Xoá token và chuyển hướng về login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // Xử lý lỗi khác
    return Promise.reject(error);
  }
);

export default axiosInstance;
