type Order = {
  id: number;
  date: Date;
  items: string[];
};

type APIClient = {
  getOrder: (id: number) => Order;
  getOrders: () => Order[];
  createOrder: (order: Order) => Order;
  updateOrder: (order: Order) => Order;
  deleteOrder: (id: number) => void;
};

type Methods = 'get' | 'delete' | 'create' | 'update';

type FilterMethods<Type, Method extends Methods> = {
  [Prop in keyof Type as Prop extends `${Method}${string}` ? Prop : never]: Type[Prop]
}

type APIClientGetters = FilterMethods<APIClient, 'get'>;
type APIClientRemovers = FilterMethods<APIClient, 'delete'>;

function deleteById(client: APIClientRemovers, id: number) {
  client.deleteOrder(id);
}

export function getAllOrders(client: APIClientGetters) {
  return client.getOrders();
}
