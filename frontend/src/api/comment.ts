import axiosInstance from "../config/axios";
import type { IComment } from "../types/comment";
import type { IQueryParams, IResponse, IResponseList } from "../types/common";
import { buildQueryString } from "../utils/queryString";

export const getAllComments = async (
  query: IQueryParams = {}
): Promise<IResponseList<IComment>> => {
  const queryString = buildQueryString(query);
  const { data } = await axiosInstance.get<IResponseList<IComment>>(
    `/comments${queryString ? `?${queryString}` : ""}`
  );
  return data;
};

export const getCommentById = async (
  commentId: string
): Promise<IResponse<IComment>> => {
  const { data } = await axiosInstance.get<IResponse<IComment>>(
    `/comments/${commentId}`
  );
  return data;
};

export const createComment = async (
  comment: IComment
): Promise<IResponse<IComment>> => {
  const { data } = await axiosInstance.post<IResponse<IComment>>(
    `/comments`,
    comment
  );
  return data;
};

export const updateComment = async (
  comment: IComment
): Promise<IResponse<IComment>> => {
  const { data } = await axiosInstance.put<IResponse<IComment>>(
    `/comments`,
    comment
  );
  return data;
};

export const deleteComment = async (
  commentId: string
): Promise<IResponse<IComment>> => {
  const { data } = await axiosInstance.delete<IResponse<IComment>>(
    `/comments/${commentId}`
  );
  return data;
};
