export interface ProductInput {
  product_code: 0,
  new_price: 0
}

export interface ValidateOutput {
  code: number;
  name: string;
  current_price: number;
  new_price: number;
  error: string[];
}

export interface UpdateData {
  code: number;
  variation: number;
}