export interface IProduct {
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
