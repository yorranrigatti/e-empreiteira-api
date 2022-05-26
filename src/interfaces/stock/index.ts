export interface IStockProduct {
  id: string;
  product_id: string;
  sale_price: number;
  cost_price: number;
  category: string;
  mark: string;
  created_at: string;
  updated_at: string;
}

export interface IStockProductCreate {
  product_id: string;
  sale_price: number;
  cost_price: number;
  category: string;
  mark: string;
  qty_available: number;
}

export interface IStockProductUpdate {
  id: string;
  sale_price: number;
  cost_price: number;
  category: string;
  mark: string;
  qty_available: number;
}
