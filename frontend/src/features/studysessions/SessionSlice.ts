import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrStreak,
  getLongestStreak,
  getSessionBetween,
  getSessionByDate,
  getThisMonthVsLastMonth,
  getTotalOfTimeBySecondsWithSelectionOfTime,
  recalculateTotalDurationOfStudySession,
  type DateRange,
  type DateType,
  type MonthlyTimeComparison,
  type StudySessionDTO,
} from "../../fetchLib/studysessionapi";

type SessionStatus = "idle" | "loading" | "succeeded" | "error";

type SessionState = {
  session: StudySessionDTO | null;
  sessions: StudySessionDTO[];
  totalTimeInPeriodSeconds: number;
  monthlyTimeComparison: MonthlyTimeComparison;
  status: SessionStatus;
  error: string | null;
};

const initialState: SessionState = {
  session: null,
  sessions: [],
  totalTimeInPeriodSeconds: 0,
  monthlyTimeComparison: [0, 0],
  status: "idle",
  error: null,
};

export const getStudySessionByDate = createAsyncThunk(
  "session/byDate",
  async (data: DateType): Promise<StudySessionDTO> => {
    return getSessionByDate(data);
  },
);

export const getSessionBetweenAPI = createAsyncThunk(
  "session/getSessionBetween",
  async (data: DateRange): Promise<Array<StudySessionDTO>> => {
    return getSessionBetween(data);
  },
);

export const updateTodaySession = createAsyncThunk(
  "session/recalculateTotalDurationOfStudySession",
  async (): Promise<StudySessionDTO> => {
    return recalculateTotalDurationOfStudySession();
  },
);

export const calculateTotalTimeOfSessionWithTimeFrame = createAsyncThunk(
  "session/calculateTotalTimeWithTimeFrame",
  async (days: number) => {
    return getTotalOfTimeBySecondsWithSelectionOfTime(days);
  },
);

export const getMonthlyTimeComparison = createAsyncThunk(
  "session/getMonthlyTimeComparison",
  async (): Promise<MonthlyTimeComparison> => {
    return getThisMonthVsLastMonth();
  },
);

export const getCurrentStreakOfUser = createAsyncThunk(
  "session/getCurrentStreak",
  async () => {
    return getCurrStreak();
  }
)


export const getLongestStreakOfUser = createAsyncThunk(
  "session/getLongestStreak",
  async () => {
    return getLongestStreak();
  }
)

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudySessionByDate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getStudySessionByDate.fulfilled, (state, action) => {
        state.session = action.payload;
        state.status = "succeeded";
        state.error = null;
      })

      .addCase(getStudySessionByDate.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Fetching study session failed";
      })

      .addCase(getSessionBetweenAPI.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getSessionBetweenAPI.fulfilled, (state, action) => {
        state.sessions = action.payload;
        state.status = "succeeded";
        state.error = null;
      })

      .addCase(getSessionBetweenAPI.rejected, (state, action) => {
        state.status = "error";
        state.error =
          action.error.message ??
          "Fetching study sessions between dates failed";
      })

      .addCase(updateTodaySession.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(updateTodaySession.fulfilled, (state, action) => {
        state.session = action.payload;
        state.sessions = state.sessions.map((session) =>
          session.date === action.payload.date ? action.payload : session,
        );
        state.status = "succeeded";
        state.error = null;
      })

      .addCase(updateTodaySession.rejected, (state, action) => {
        state.status = "error";
        state.error =
          action.error.message ?? "Recalculating study session failed";
      })

      .addCase(calculateTotalTimeOfSessionWithTimeFrame.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(
        calculateTotalTimeOfSessionWithTimeFrame.fulfilled,
        (state, action) => {
          state.totalTimeInPeriodSeconds = action.payload.msg;
          state.status = "succeeded";
          state.error = null;
        },
      )

      .addCase(
        calculateTotalTimeOfSessionWithTimeFrame.rejected,
        (state, action) => {
          state.status = "error";
          state.error =
            action.error.message ?? "Calculating total time in period failed";
        },
      )

      .addCase(getMonthlyTimeComparison.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getMonthlyTimeComparison.fulfilled, (state, action) => {
        state.monthlyTimeComparison = action.payload;
        state.status = "succeeded";
        state.error = null;
      })

      .addCase(getMonthlyTimeComparison.rejected, (state, action) => {
        state.status = "error";
        state.error =
          action.error.message ?? "Fetching monthly time comparison failed";
      });
  },
});

export default sessionSlice.reducer;
