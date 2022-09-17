export type State = {
  accessToken: string | null;
  refreshToken: string | null;
};

export type OrdersAndTotal = {
  orders: number;
  total: number;
};

export type OrdersAndTotalChart = {
  name: string;
  value: number;
};

export type Seller = {
  product: Product;
  revenue: number;
  units: number;
};

export type Product = {
  id: string;
  image: string;
  name: string;
};
