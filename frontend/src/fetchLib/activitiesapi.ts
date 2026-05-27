import { apiFetch } from "./fetch";

export type startActivityData = {
  title: string;
  appName: string;
  topic: string;
};

export type ActivityReturnData = {
  title: string;
  appName: string;
  activityStartAt: string;
  activityEndAt: string;
  topic: string;
  duration: string;
};

export const startActivity = async (
  data: startActivityData,
): Promise<ActivityReturnData> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("No access token found");
  }

  return apiFetch("/activity/startActivity", {
    method: "POST",
    token: accessToken,
    body: JSON.stringify(data),
  });
};

export const stopActivity = async (): Promise<ActivityReturnData> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("No access token found");
  }
  return apiFetch("/activity/stopActivity", {
    method: "POST",
    token: accessToken,
  });
};