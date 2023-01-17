import { $authHost } from "./auth-service";

export const addMessage = async (message: string, user_id: number) => {
  const { data } = await $authHost.post(`message/${user_id}`, {
    message,
  });
  return data;
};
export const getAllMessages = async () => {
  const { data } = await $authHost.get(`messageAll`);
  return data;
};
