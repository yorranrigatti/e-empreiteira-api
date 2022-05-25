export interface IOrder {
  id: string;
  isBudget: boolean;
  delivery_date: string;
  employee_id: string;
  client_id: string;
  cart_id: string;
  created_at: string;
  updated_at: string;
}

export interface IOrderCreate {
  isBudget: boolean;
  delivery_date: string;
  employee_id: string;
  client_id: string;
  cart_id: string;
}