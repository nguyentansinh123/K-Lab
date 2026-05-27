import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getSessionByDate,
  type DateType,
  type StudySessionDTO,
} from "../../fetchLib/studysessionapi";

type SessionStatus = "idle" | "loading" | "succeeded" | "error";

type SessionState = {
  session: StudySessionDTO | null;
  status: SessionStatus;
  error: string | null;
};

const initialState: SessionState = {
  session: null,
  status: "idle",
  error: null,
};

export const getStudySessionByDate = createAsyncThunk(
  "session/byDate",
  async (data: DateType): Promise<StudySessionDTO> => {
    return getSessionByDate(data);
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
      });
  },
});

export default sessionSlice.reducer;
