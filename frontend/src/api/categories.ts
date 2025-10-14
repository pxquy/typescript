import axiosInstance from "../config/axios";
import type { ICategories } from "../types/categories";
import type { IQueryParams, IResponse, IResponseList } from "../types/common";
import { buildQueryString } from "../utils/queryString";

export const getAllCategories = async (
  query: IQueryParams = {}
): Promise<IResponseList<ICategories>> => {
  const queryString = buildQueryString(query);
  const { data } = await axiosInstance.get<IResponseList<ICategories>>(
    `/categories${queryString ? `?${queryString}` : ""}`
  );
  return data;
};

export const getCategoryById = async (
  categoryId: string
): Promise<IResponse<ICategories>> => {
  const { data } = await axiosInstance.get<IResponse<ICategories>>(
    `/categories/${categoryId}`
  );
  return data;
};

export const createCategory = async (
  category: ICategories
): Promise<IResponse<ICategories>> => {
  const { data } = await axiosInstance.post<IResponse<ICategories>>(
    `/categories`,
    category
  );
  return data;
};

export const updateCategory = async (
  category: ICategories
): Promise<IResponse<ICategories>> => {
  const { data } = await axiosInstance.put<IResponse<ICategories>>(
    `/categories`,
    category
  );
  return data;
};

export const deleteCategory = async (
  categoryId: string
): Promise<IResponse<ICategories>> => {
  const { data } = await axiosInstance.delete<IResponse<ICategories>>(
    `/categories/${categoryId}`
  );
  return data;
};
