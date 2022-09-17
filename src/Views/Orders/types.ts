export type Order = {
  id: string;
  product: {
    name: string;
  };
  currency: string;
  total: number;
  created_at: string;
  status: string;
};
