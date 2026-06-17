import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getSessionBetween,
  getSessionByDate,
  type DateRange,
  type DateType,
  type StudySessionDTO,
} from "../../fetchLib/studysessionapi";

type SessionStatus = "idle" | "loading" | "succeeded" | "error";

type SessionState = {
  session: StudySessionDTO | null;
  sessions: StudySessionDTO[];
  status: SessionStatus;
  error: string | null;
};

const initialState: SessionState = {
  session: null,
  sessions: [],
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
          action.error.message ?? "Fetching study sessions between dates failed";
      });
  },
});

export default sessionSlice.reducer;
