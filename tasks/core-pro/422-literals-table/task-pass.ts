import type { User, Product, Order } from './table-models.ts';
import type { Table } from './task.ts';

declare const userTable: Table<User & { model: 'user' } >;
declare const productTable: Table<Product & { model: 'product' } >;
declare const orderTable: Table<Order & { model: 'order' } >;

const u1: User = userTable.getUser(10);
const p1: Product = productTable.deleteProduct(12);
const o1: Order = orderTable.updateOrder(4, { quantity: 10 });
