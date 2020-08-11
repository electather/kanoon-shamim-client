import { AxiosRequestConfig } from 'axios';
import { CreateTPI } from 'userRequest';
import { Paginated, SessionResponse } from 'userResponse';
import { createClient } from 'utils/axios';

const client = createClient();

export const createSession = async (dto: SessionResponse) => {
  try {
    const { data } = await client.post<SessionResponse>('sessions', dto);
    return data;
  } catch {}
};

export const updateSession = async (
  id: string,
  dto: CreateTPI,
  config?: AxiosRequestConfig,
) => {
  const { data } = await client.put<SessionResponse>(
    `sessions/${id}`,
    dto,
    config,
  );
  return data;
};

export const fetchSession = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await client.get<SessionResponse>(`sessions/${id}`, config);
  return data;
};

export const deleteSession = async (
  id: string,
  config?: AxiosRequestConfig,
) => {
  const { data } = await client.delete<SessionResponse>(
    `sessions/${id}`,
    config,
  );
  return data;
};

export const fetchSessionList = async (config?: AxiosRequestConfig) => {
  const { data } = await client.get<Paginated<SessionResponse>>(
    `sessions`,
    config,
  );
  return data;
};
