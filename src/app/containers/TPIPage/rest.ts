import { AxiosRequestConfig } from 'axios';
import { CreateTPI } from 'userRequest';
import { Paginated, TPIResponse } from 'userResponse';
import { createClient } from 'utils/axios';

const client = createClient();

export const createTpi = async (dto: TPIResponse) => {
  const { data } = await client.post<TPIResponse>('third-party', dto);
  return data;
};

export const updateTpi = async (
  id: string,
  dto: CreateTPI,
  config?: AxiosRequestConfig,
) => {
  const { data } = await client.put<TPIResponse>(
    `third-party/${id}`,
    dto,
    config,
  );
  return data;
};

export const fetchTpi = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await client.get<TPIResponse>(`third-party/${id}`, config);
  return data;
};

export const deleteTpi = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await client.delete<TPIResponse>(
    `third-party/${id}`,
    config,
  );
  return data;
};

export const fetchTpiList = async (config?: AxiosRequestConfig) => {
  const { data } = await client.get<Paginated<TPIResponse>>(
    `third-party`,
    config,
  );
  return data;
};
