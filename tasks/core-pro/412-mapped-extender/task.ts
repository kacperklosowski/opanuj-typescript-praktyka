type Person = {
  firstName: string;
  lastName: string;
  age: number;
};

type FieldExtender<T, K> = {
  [P in keyof T]: {value: T[P]} & K;
};

type PersonUpdateHistory = FieldExtender<
  Person,
  {
    isUpdated: boolean;
    updatedAt: number | null;
  }
>;

export const history: PersonUpdateHistory = {
  firstName: {
    value: 'John',
    isUpdated: false,
    updatedAt: null,
  },
  lastName: {
    value: 'Doe',
    isUpdated: true,
    updatedAt: new Date().getTime(),
  },
  age: {
    value: 30,
    isUpdated: false,
    updatedAt: null,
  },
};
