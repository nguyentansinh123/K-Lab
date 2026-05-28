import { apiFetch } from "./fetch";

export type DateType = {
  date: string;
};

export type UserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  role: string;
  imgUrl: string;
};

export type ActivityDTO = {
  title: string;
  appName: string;
  activityStartAt: string;
  activityEndAt: string;
  topic: string;
  duration: string;
};

export type StudySessionDTO = {
  user: UserDTO;
  date: string;
  activities: ActivityDTO[];
  totalDurationSeconds: number;
  note: string;
};

export const getSessionByDate = async (
  data: DateType,
): Promise<StudySessionDTO> => {
  const accesstoken = localStorage.getItem("accessToken");

  if (!accesstoken) {
    throw new Error("No access token found");
  }

  return apiFetch<StudySessionDTO>(
    `/ssession/session/byDate?date=${encodeURIComponent(data.date)}`,
    {
      method: "GET",
      token: accesstoken,
    },
  );
};
