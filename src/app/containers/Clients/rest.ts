import { AxiosRequestConfig } from 'axios';
import { CreateUser } from 'userRequest';
import { Paginated, UserData, UserDataMinimal } from 'userResponse';
import { createClient } from 'utils/axios';

const client = createClient();

export const createClients = async (dto: CreateUser) => {
  const { data } = await client.post<UserData>('clients', dto);
  return data;
};

export const updateClient = async (
  id: string,
  dto: CreateUser,
  config?: AxiosRequestConfig,
) => {
  const { data } = await client.put<UserData>(`clients/${id}`, dto, config);
  return data;
};

export const fetchClient = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await client.get<UserData>(`clients/${id}`, config);
  return data;
};

export const deleteClient = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await client.delete<UserData>(`clients/${id}`, config);
  return data;
};

export const fetchClientsList = async (config?: AxiosRequestConfig) => {
  const { data } = await client.get<Paginated<UserDataMinimal>>(
    `clients`,
    config,
  );
  return data;
};
