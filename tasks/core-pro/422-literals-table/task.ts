import type { Entities } from './table-models.ts';

type ModelName<T> = T extends { model: Entities } ? T['model'] : never;
type OmitModelName<T> = Omit<T, 'model'>;

type Get<Model> = {
  [Prop in `get${Capitalize<ModelName<Model>>}`]: (id: number) => OmitModelName<Model>;
};

type Update<Model> = {
  [Prop in `update${Capitalize<ModelName<Model>>}`]: (id: number, update: Partial<Model>) => OmitModelName<Model>;
};

type Delete<Model> = {
  [Prop in `delete${Capitalize<ModelName<Model>>}`]: (id: number) => OmitModelName<Model>;
};

export type Table<Model> = Get<Model> &  Update<Model> &  Delete<Model>;
