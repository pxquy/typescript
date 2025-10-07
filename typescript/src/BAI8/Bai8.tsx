import axios from "axios";
import { useEffect, useState } from "react";

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

const Bai8 = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [detailUser, setDetailUser] = useState<User | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users`
        );
        setUsers(data);
      } catch (error) {
        console.log("Lỗi server");
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const fetchDetail = async () => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${selectedId}`
        );
        setDetailUser(data);
      } catch (error) {
        console.log("Lỗi server");
      }
    };
    fetchDetail();
  }, [selectedId]);

  return (
    <>
      <table className="border">
        <thead>
          <tr>
            <th className="border p-2">STT</th>
            <th className="border p-2">Tên người dùng</th>
            <th className="border p-2">Tên sử dụng</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Địa chỉ</th>
            <th className="border p-2">Số điện thoại</th>
            <th className="border p-2">Website</th>
            <th className="border p-2">Công ty</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((p, index) => (
            <tr key={p.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.username}</td>
              <td className="border p-2">{p.email}</td>
              <td className="border p-2">{p.address.street}</td>
              <td className="border p-2">{p.phone}</td>
              <td className="border p-2">{p.website}</td>
              <td className="border p-2">{p.company.name}</td>
              <td>
                <button
                  onClick={() => setSelectedId(p.id.toString())}
                  className="border p-2 bg-blue-200 hover:bg-blue-300"
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-6 text-lg font-bold">Chi tiết User</h2>
      {detailUser ? (
        <div className="p-4 border mt-2 rounded-md">
          <p>
            <b>Tên:</b> {detailUser.name}
          </p>
          <p>
            <b>Email:</b> {detailUser.email}
          </p>
          <p>
            <b>Điện thoại:</b> {detailUser.phone}
          </p>
          <p>
            <b>Địa chỉ:</b> {detailUser.address.city}
          </p>
          <p>
            <b>Công ty:</b> {detailUser.company.name}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 mt-2">Chưa chọn user nào</p>
      )}
    </>
  );
};

export default Bai8;
