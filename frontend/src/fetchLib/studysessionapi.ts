import { apiFetch } from "./fetch";

export type DateType = {
  date: string;
};

export type getTotalTimeBySessionWithGap = {
  msg: number;
};

export type MonthlyTimeComparison = [
  thisMonthSeconds: number,
  lastMonthSeconds: number,
];

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

export type DateRange = {
  dateStart: string;
  dateEnd: string;
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

export const getSessionBetween = async (
  data: DateRange,
): Promise<Array<StudySessionDTO>> => {
  const accesstoken = localStorage.getItem("accessToken");

  if (!accesstoken) {
    throw new Error("No access token found");
  }

  return apiFetch<Array<StudySessionDTO>>(
    `/ssession/session/from-to?dateStart=${data.dateStart}&dateEnd=${data.dateEnd}`,
    {
      method: "GET",
      token: accesstoken,
    },
  );
};

export const recalculateTotalDurationOfStudySession =
  async (): Promise<StudySessionDTO> => {
    const accesstoken = localStorage.getItem("accessToken");

    if (!accesstoken) {
      throw new Error("No access token found");
    }

    return apiFetch<StudySessionDTO>(`/ssession/refreshTodayTotalDuration`, {
      method: "PUT",
      token: accesstoken,
    });
  };

export const getTotalOfTimeBySecondsWithSelectionOfTime = async (
  days: number,
) => {
  const accesstoken = localStorage.getItem("accessToken");

  if (!accesstoken) {
    throw new Error("No access token found");
  }

  return apiFetch<getTotalTimeBySessionWithGap>(
    `/ssession/totalTimeInPeriod?days=${days}`,
    {
      method: "GET",
      token: accesstoken,
    },
  );
};

export const getThisMonthVsLastMonth = async (): Promise<MonthlyTimeComparison> => {
  const accesstoken = localStorage.getItem("accessToken");

  if (!accesstoken) {
    throw new Error("No access token found");
  }

  return apiFetch<MonthlyTimeComparison>(`/ssession/tmonthVslmonth`, {
    method: "GET",
    token: accesstoken,
  });
};


export const getCurrStreak = async (): Promise<number> => {
  const accesstoken = localStorage.getItem("accessToken");

  if (!accesstoken) {
    throw new Error("No access token found");
  }

  return apiFetch<number>(`/ssession/currentStreak`, {
    method: "GET",
    token: accesstoken,
  });
};


export const getLongestStreak = async (): Promise<number> => {
  const accesstoken = localStorage.getItem("accessToken");

  if (!accesstoken) {
    throw new Error("No access token found");
  }

  return apiFetch<number>(`/ssession/longestStreak`, {
    method: "GET",
    token: accesstoken,
  });
};
