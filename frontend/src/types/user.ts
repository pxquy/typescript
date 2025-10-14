export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
  images?: string;
  address?: string;
  phone?: string;
  gender?: "nam" | "nữ";
  roles?: "admin" | "custom";
}
