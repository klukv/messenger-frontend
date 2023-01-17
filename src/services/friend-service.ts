import { $authHost } from "./auth-service";

export const getAllFriends = async (user_id: number) => {
  const { data } = await $authHost.get(`allfriends/${user_id}`);
  return data;
};
export const addFriend = async (user_id: number, polz_id: number) => {
  const { data } = await $authHost.post(`you/${user_id}/add/${polz_id}`);
  return data;
};
export const deleteFriend = async (user_id: number, friend_id: number) => {
  const { data } = await $authHost.delete(
    `delete/you/${user_id}/friends/${friend_id}`
  );
  return data;
};
