export interface IStockProduct {
  id: string;
  product_id: string;
  sale_price: number;
  cost_price: number;
  category: string;
  brand: string;
  expiration_date: string;
  created_at: string;
  updated_at: string;
}

export interface IStockProductCreate {
  product_id: string;
  sale_price: number;
  cost_price: number;
  category: string;
  brand: string;
  expiration_date: string;
}

export interface IStockProductUpdate {
  id: string;
  sale_price: number;
  cost_price: number;
  category: string;
  brand: string;
  expiration_date: string;
}
