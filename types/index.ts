export type Post = {
  title: string;
  description: string;
  likes: number;
};

export type User = {
  username: string;
  password: string;
  nickname?: string;
};

export type RegisteredUser = User & { id: string };
