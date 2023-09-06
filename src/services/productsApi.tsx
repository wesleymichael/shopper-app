import { ProductInput } from "@/types/productsInput";
import { AxiosResponse } from "axios";
import api from './api';

export async function validateProducts(body: ProductInput[]) {
  const response: AxiosResponse = await api.post('/validate', body);
  return response.data;
}
