import { client } from "./client";

export const sendToken = async (staffId: string, token: string) => {
  try {
    const response = await client.put(`/staff/update/${staffId}`, { token });
    return response.data;
  } catch (error) {
    console.error("Error updating token:", error);
  }
};
