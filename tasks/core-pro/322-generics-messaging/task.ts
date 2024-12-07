interface BaseMessage<T extends string, U> {
  type: T;
  payload: U;
}
interface Order {
  orderId: string;
  items: { productId: string; quantity: number }[];
}

export interface OrderCreatedMessage extends BaseMessage<'orderCreated', Order> {}
export interface OrderCancelledMessage extends BaseMessage<'orderCancelled', { orderId: string }> {}

type Message = OrderCreatedMessage | OrderCancelledMessage;

interface IMessageBus {
  subscribe<T extends Message>(type: T['type'], subscriber: (message: T) => void): void;
  publish<T extends Message>(message: T): void;
}

export class MessageBus implements IMessageBus {
  private static instance: MessageBus;
  private subscribers = new Map<Message['type'], ((message: Message) => void)[]>();

  private constructor() {}

  public static getInstance(): MessageBus {
    if (!MessageBus.instance) {
      MessageBus.instance = new MessageBus();
    }

    return MessageBus.instance;
  }

  public subscribe<T extends Message>(type: T['type'], subscriber: (message: T) => void): void {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, []);
    }

    this.subscribers.get(type)!.push(subscriber as (message: Message) => void);
  }

  public publish<T extends Message>(message: T): void {
    const subscribers = this.subscribers.get(message.type);

    if (subscribers) {
      subscribers.forEach((subscriber) => subscriber(message));
    }
  }
}

export class InventoryStockTracker {
  private orderCache: Record<string, Order> = {};

  constructor(private bus: MessageBus, private stock: Record<string, number>) {
    this.subscribeToMessages();
  }

  private handleOrderCreated(message: OrderCreatedMessage): void {
    const {payload} = message;

    this.orderCache[payload.orderId] = payload;

    message.payload.items.forEach((item) => {
      this.stock[item.productId] -= item.quantity;
    });
  }

  private handleOrderCancelled(message: OrderCancelledMessage): void {
    const order = this.orderCache[message.payload.orderId];

    if (order) {
      order.items.forEach((item) => {
        this.stock[item.productId] += item.quantity;
      });
    }

    delete this.orderCache[message.payload.orderId];
  }

  private subscribeToMessages(): void {
    this.bus.subscribe<OrderCreatedMessage>('orderCreated', this.handleOrderCreated.bind(this));
    this.bus.subscribe<OrderCancelledMessage>('orderCancelled', this.handleOrderCancelled.bind(this));
  }

  public getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}
