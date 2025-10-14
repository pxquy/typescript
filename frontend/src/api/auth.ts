import axiosInstance from "../config/axios";
import type { IUser } from "../types/user";
import type { IResponse } from "../types/common";

export const signUp = async (user: IUser): Promise<IResponse<IUser>> => {
  const { data } = await axiosInstance.post<IResponse<IUser>>(
    "/auth/signup",
    user
  );
  return data;
};

export const signIn = async (
  user: IUser
): Promise<IResponse<{ token: string; user: IUser }>> => {
  const { data } = await axiosInstance.post<
    IResponse<{ token: string; user: IUser }>
  >("/auth/signin", user);
  return data;
};

export const profile = async (): Promise<IResponse<IUser>> => {
  const { data } = await axiosInstance.get<IResponse<IUser>>("/auth/profile");
  return data;
};
