import { apiFetch } from "./fetch";
import type { FocusTrackingSnapshot } from "../features/focus/focusTracking";

export const PStatus = {
  UNPAUSE : "UNPAUSE",
  PAUSE : "PAUSE",
} as const

export type PStatus = (typeof PStatus)[keyof typeof PStatus];

export type ActivityPause = {
  id: string,
  pauseTimeStart: string,
  pauseTimeEnd: string
  status: PStatus
}

export type startActivityData = {
  title: string;
  appName: string;
  topic: string;
  paperMode: boolean;
};

export type ActivityReturnData = {
  title: string;
  appName: string;
  activityStartAt: string;
  activityEndAt: string;
  topic: string;
  duration: string;
  activityPauses: ActivityPause[];
  paperMode: boolean;
  focusScore: number | null;
  trackingSamples: number;
  faceDetectedSamples: number;
  averageYawDegrees: number | null;
  averagePitchDegrees: number | null;
};

export type LatestPausingActEmptyResponse = {
  activityPauses: ActivityPause[];
  message: string;
};

export type LatestPausingActResponse =
  | ActivityReturnData
  | LatestPausingActEmptyResponse;

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

export const getCurrentActivity = async (): Promise<ActivityReturnData> => {
  
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken){
    throw new Error("No access token found")
  }
  
  return apiFetch("/activity/getCurrentActivity", {
    method: "GET",
    token: accessToken
  })

}

export const stopActivity = async (
  tracking: FocusTrackingSnapshot,
): Promise<ActivityReturnData> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("No access token found");
  }
  return apiFetch("/activity/stopActivity", {
    method: "POST",
    token: accessToken,
    body: JSON.stringify({
      paperMode: tracking.paperMode,
      totalSamples: tracking.totalSamples,
      faceDetectedSamples: tracking.faceDetectedSamples,
      averageYawDegrees: tracking.averageYawDegrees,
      averagePitchDegrees: tracking.averagePitchDegrees,
    }),
  });
};

export const startPausingforAct = async(): Promise<Record<string, string>> => {

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("No access token found");
  }
  return apiFetch("/activity/startPausing", {
    method: "POST",
    token: accessToken,
  });
}


export const stopPausingforAct = async(): Promise<Record<string, string>> => {

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("No access token found");
  }
  return apiFetch("/activity/stopPausing", {
    method: "POST",
    token: accessToken,
  });
}

export const getLatestPausingAct = async(
  status: PStatus,
): Promise<LatestPausingActResponse> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("No access token found");
  }
  
  return apiFetch<LatestPausingActResponse>(
    `/activity/latestPausingType?status=${status}`,
    {
      method: "GET",
      token: accessToken,
    },
  );
};
