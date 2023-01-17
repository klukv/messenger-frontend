import { $authHost } from "./auth-service";

export const addComment = async (
  comment: string,
  user_id: number,
  polz_id: number
) => {
  const { data } = await $authHost.post(
    `comments/${user_id}/polzovatel/${polz_id}`,
    {
      comment,
    }
  );
  return data;
};
export const getAllComments = async (user_id: number) => {
  const { data } = await $authHost.get(`commentAll/${user_id}`);
  return data;
};
