import type { Order, Product, User } from './table-models.ts';

type ModelMap = {
  user: User;
  product: Product;
  order: Order;
}

type TableModels = ModelMap[keyof ModelMap];

type ModelName<T> = {
  [K in keyof ModelMap]: ModelMap[K] extends T ? K : never;
}[keyof ModelMap];

type Get<Model> = {
  [Prop in `get${Capitalize<ModelName<Model>>}`]: (id: number) => Model;
};

type Update<Model> = {
  [Prop in `update${Capitalize<ModelName<Model>>}`]: (id: number, update: Partial<Model>) => Model;
};

type Delete<Model> = {
  [Prop in `delete${Capitalize<ModelName<Model>>}`]: (id: number) => Model;
};

export type Table<Model extends TableModels> = Get<Model> &  Update<Model> &  Delete<Model>;
