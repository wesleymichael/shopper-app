import { ProductInput, UpdateData } from "@/types/productsInput";
import { AxiosResponse } from "axios";
import api from './api';

export async function validateProducts(body: ProductInput[]) {
  const response: AxiosResponse = await api.post('/validate', body);
  return response.data;
}

export async function updateProducts(data: UpdateData[]){
  const body = {
    products: data,
  }
  const response: AxiosResponse = await api.put('/products', body);
  return response.data;
}