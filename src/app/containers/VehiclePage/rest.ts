import { AxiosRequestConfig } from 'axios';
import { CreateUser } from 'userRequest';
import { Paginated, VehicleResponse } from 'userResponse';
import { createClient } from 'utils/axios';

const client = createClient();

export const createVehicle = async (dto: CreateUser) => {
  const { data } = await client.post<VehicleResponse>('vehicles', dto);
  return data;
};

export const updateVehicle = async (
  id: string,
  dto: CreateUser,
  config?: AxiosRequestConfig,
) => {
  const { data } = await client.put<VehicleResponse>(
    `vehicles/${id}`,
    dto,
    config,
  );
  return data;
};

export const fetchVehicle = async (id: string, config?: AxiosRequestConfig) => {
  const { data } = await client.get<VehicleResponse>(`vehicles/${id}`, config);
  return data;
};

export const deleteVehicle = async (
  id: string,
  config?: AxiosRequestConfig,
) => {
  const { data } = await client.delete<VehicleResponse>(
    `vehicles/${id}`,
    config,
  );
  return data;
};

export const fetchVehicleList = async (config?: AxiosRequestConfig) => {
  const { data } = await client.get<Paginated<VehicleResponse>>(
    `vehicles`,
    config,
  );
  return data;
};
