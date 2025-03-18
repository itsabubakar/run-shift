import { client } from "./client";

export const getOpenShifts = async (companyId: string) => {
  try {
    const response = await client.get(`/shift/free/company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const applyFreeShift = async (shiftId: any, staffId: any) => {
  const data = { shiftId, staffId };
  console.log(data, "data");
  try {
    const response = await client.post(`/shift/free/apply`, {
      shiftId,
      staffId,
    });
    return response.data;
  } catch (error: any) {
    console.error(error.response.data, "error");
  }
};
