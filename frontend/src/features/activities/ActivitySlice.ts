import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  type startActivityData,
  type ActivityReturnData,
  type ActivityPause,
  type LatestPausingActResponse,
  type PStatus,
  startActivity,
  stopActivity,
  getCurrentActivity,
  getLatestPausingAct as fetchLatestPausingAct,
  startPausingforAct,
  stopPausingforAct,
} from "../../fetchLib/activitiesapi";
import type { FocusTrackingSnapshot } from "../focus/focusTracking";

type ActivityStatus =
  | "not_finished"
  | "finished"
  | "have_not_started"
  | "currently_running"
  | "paused"
  | "error"
  | "loading";

type ActivityState = {
  title: string | null;
  appName: string | null;
  activityStartAt: string | null;
  activityEndAt: string | null;
  topic: string | null;
  duration: string | null;
  activityPauses: ActivityPause[];
  status: ActivityStatus;
  error: string | null;
};

const initialState: ActivityState = {
  title: "null",
  appName: "null",
  activityStartAt: "null",
  activityEndAt: "null",
  topic: "null",
  duration: "null",
  activityPauses: [],
  status: "have_not_started",
  error: null,
};

export const startActivities = createAsyncThunk(
  "activity/startActivity",
  async (data: startActivityData): Promise<ActivityReturnData> => {
    return startActivity(data);
  },
);

export const stopActivitiies = createAsyncThunk(
  "activity/stopActivity",
  async (tracking: FocusTrackingSnapshot): Promise<ActivityReturnData> => {
    return stopActivity(tracking);
  },
);

export const getCurrentUserActivity = createAsyncThunk(
  "activity/getCurrentActivity",
  async (): Promise<ActivityReturnData> => {
    return getCurrentActivity();
  },
);

export const getLatestPausingAct = createAsyncThunk(
  "activity/latestPausingType",
  async (status: PStatus): Promise<LatestPausingActResponse> => {
    return fetchLatestPausingAct(status);
  },
);

export const startPausingActivity = createAsyncThunk(
  "activity/startPausing",
  async (): Promise<Record<string, string>> => {
    return startPausingforAct();
  },
);

export const stopPausingActivity = createAsyncThunk(
  "activity/stopPausing",
  async (): Promise<Record<string, string>> => {
    return stopPausingforAct();
  },
);

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startActivities.pending, (state) => {
        state.status = "loading";
      })

      .addCase(startActivities.fulfilled, (state, action) => {
        state.title = action.payload.title;
        state.appName = action.payload.appName;
        state.activityStartAt = action.payload.activityStartAt;
        state.activityEndAt = action.payload.activityEndAt;
        state.topic = action.payload.topic;
        state.duration = action.payload.duration;
        state.activityPauses = action.payload.activityPauses;
        state.status = "currently_running";
      })

      .addCase(startActivities.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Starting Activities failed";
      })
      .addCase(stopActivitiies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(stopActivitiies.fulfilled, (state, action) => {
        state.title = action.payload.title;
        state.appName = action.payload.appName;
        state.activityStartAt = action.payload.activityStartAt;
        state.activityEndAt = action.payload.activityEndAt;
        state.topic = action.payload.topic;
        state.duration = action.payload.duration;
        state.activityPauses = action.payload.activityPauses;
        state.status = "finished";
        state.error = null;
      })

      .addCase(stopActivitiies.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Stopping Activities failed";
      })
      .addCase(getCurrentUserActivity.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getCurrentUserActivity.fulfilled, (state, action) => {
        state.title = action.payload.title;
        state.appName = action.payload.appName;
        state.activityStartAt = action.payload.activityStartAt;
        state.activityEndAt = action.payload.activityEndAt;
        state.topic = action.payload.topic;
        state.duration = action.payload.duration;
        state.activityPauses = action.payload.activityPauses;
        state.status = "currently_running";
        state.error = null;
      })

      .addCase(getCurrentUserActivity.rejected, (state, action) => {
        state.status = "error";
        state.error =
          action.error.message ?? "Fetching current activity failed";
      })
      .addCase(getLatestPausingAct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getLatestPausingAct.fulfilled, (state, action) => {
        if ("title" in action.payload) {
          state.title = action.payload.title;
          state.appName = action.payload.appName;
          state.activityStartAt = action.payload.activityStartAt;
          state.activityEndAt = action.payload.activityEndAt;
          state.topic = action.payload.topic;
          state.duration = action.payload.duration;
          state.activityPauses = action.payload.activityPauses;
        } else {
          state.activityPauses = action.payload.activityPauses;
        }
        state.status = action.meta.arg === "PAUSE" ? "paused" : "currently_running";
        state.error = null;
      })

      .addCase(getLatestPausingAct.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Fetching latest pause failed";
      })
      .addCase(startPausingActivity.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(startPausingActivity.fulfilled, (state) => {
        state.status = "paused";
        state.error = null;
      })

      .addCase(startPausingActivity.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Starting pause failed";
      })
      .addCase(stopPausingActivity.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(stopPausingActivity.fulfilled, (state) => {
        state.status = "currently_running";
        state.error = null;
      })

      .addCase(stopPausingActivity.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Stopping pause failed";
      });
  },
});

export default activitySlice.reducer;
