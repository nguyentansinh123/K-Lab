import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../auth/AuthSlice.ts"
import ActivityReducer from "../activities/ActivitySlice.ts"
import StudySessionReducer from "../studysessions/SessionSlice.ts"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    activity: ActivityReducer,
    session: StudySessionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
