export type CreateProductInput = {
  name: string;
  quantityAvailabe: number;
  costUnity: number;
  user?: any;
  cart?: any;
};

export type CreateCartInput = {
  quantity: number;
  product?: any;
  createdAt?: any;
  order?: any;
};

export type CreateOrderInput = {
  status: string;
  createdAt?: any;
  cart?: any;
  user?: any;
};
