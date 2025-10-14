export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  discountPrice?: number;
  images?: string;
  category: string;
  description?: string;
  created_at?: string;
}
