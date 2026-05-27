import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  type startActivityData,
  type ActivityReturnData,
  startActivity,
  stopActivity,
} from "../../fetchLib/activitiesapi";

type ActivityStatus =
  | "not_finished"
  | "finished"
  | "have_not_started"
  | "currently_running"
  | "error"
  | "loading";

type ActivityState = {
  title: string | null;
  appName: string | null;
  activityStartAt: string | null;
  activityEndAt: string | null;
  topic: string | null;
  duration: string | null;
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
  async (): Promise<ActivityReturnData> => {
    return stopActivity();
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
        state.status = "finished";
        state.error = null;
      })

      .addCase(stopActivitiies.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Stopping Activities failed";
      });
  },
});

export default activitySlice.reducer;
