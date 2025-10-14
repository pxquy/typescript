import axiosInstance from "../config/axios";
import type {
  IProductQueryParams,
  IResponse,
  IResponseList,
} from "../types/common";
import type { IProduct } from "../types/product";
import { buildQueryString } from "../utils/queryString";

export const getAllProducts = async (
  query: IProductQueryParams = {}
): Promise<IResponseList<IProduct>> => {
  const queryString = buildQueryString(query);
  const { data } = await axiosInstance.get<IResponseList<IProduct>>(
    `/coffee${queryString ? `?${queryString}` : ""}`
  );
  return data;
};

export const getProductById = async (
  productId: string
): Promise<IResponse<IProduct>> => {
  const { data } = await axiosInstance.get<IResponse<IProduct>>(
    `/coffee/${productId}`
  );
  return data;
};

export const createProduct = async (
  product: IProduct
): Promise<IResponse<IProduct>> => {
  const { data } = await axiosInstance.post<IResponse<IProduct>>(
    `/coffee`,
    product
  );
  return data;
};

export const updateProduct = async (
  product: IProduct
): Promise<IResponse<IProduct>> => {
  const { data } = await axiosInstance.put<IResponse<IProduct>>(
    `/coffee`,
    product
  );
  return data;
};

export const deleteProduct = async (
  productId: string
): Promise<IResponse<IProduct>> => {
  const { data } = await axiosInstance.delete<IResponse<IProduct>>(
    `/coffee/${productId}`
  );
  return data;
};
