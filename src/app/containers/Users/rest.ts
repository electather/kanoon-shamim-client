import { AxiosRequestConfig } from 'axios';
import { CreateUser } from 'userRequest';
import { Paginated, UserData, UserDataMinimal } from 'userResponse';
import { createClient } from 'utils/axios';

const client = createClient();

export const createUser = async (dto: CreateUser) => {
  const { data } = await client.post<UserData>('users', dto);
  return data;
};

export const updateUser = async (
  id: string,
  dto: CreateUser,
  config?: AxiosRequestConfig,
) => {
  const { data } = await client.put<UserData>(`users/${id}`, dto, config);
  return data;
};

export const fetchUser = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await client.get<UserData>(`users/${id}`, config);
  return data;
};

export const deleteUser = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await client.delete<UserData>(`users/${id}`, config);
  return data;
};

export const fetchUsersList = async (config?: AxiosRequestConfig) => {
  const { data } = await client.get<Paginated<UserDataMinimal>>(
    `users`,
    config,
  );
  return data;
};
