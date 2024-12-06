interface BaseIdentity {
  id: string;
  userName: string;
}

export interface GoogleIdentity extends BaseIdentity {
  provider: 'google';
}

export interface AppleIdentity extends BaseIdentity {
  provider: 'apple';
}

export interface RedditIdentity extends BaseIdentity {
  provider: 'reddit';
}

type Identity = GoogleIdentity | AppleIdentity | RedditIdentity;

const users: ReadonlyArray<Identity> = [
  { id: '1', provider: 'google', userName: 'John Doe' },
  { id: '2', provider: 'apple', userName: 'Kate Williams' },
  { id: '3', provider: 'reddit', userName: 'Jane Doe' },
  { id: '4', provider: 'reddit', userName: 'Alex Smith' },
  { id: '5', provider: 'google', userName: 'Mike Johnson' },
  { id: '6', provider: 'reddit', userName: 'John Doe' },
];

export class IdentityProcessor<T extends Identity> {
  constructor(private readonly provider: T['provider']) {
  }

  findById(id: string): T | undefined {
    return users.find((user) => user.id === id && user.provider === this.provider) as T;
  }

  findByUserName(userName: string): T | undefined {
    return users.find((user) => user.userName === userName && user.provider === this.provider) as T;
  }
}
