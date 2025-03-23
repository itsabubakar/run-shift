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

export const getAppliedOpenShifts = async (staffId: string) => {
  try {
    const response = await client.get(
      `/shift/free/staff/${staffId}?type=applied`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAcceptedOpenShifts = async (staffId: string) => {
  try {
    const response = await client.get(
      `/shift/free/staff/${staffId}?type=accepted`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
