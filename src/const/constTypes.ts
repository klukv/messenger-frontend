export type TUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: string[];
};

export type TFriend = {
    id: number,
    youStr: TUser,
    friends: TUser
}

