import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface SyncStatusState {
  inProgress: boolean;
  progress: number; // 0-100
}

export interface AppState {
  enableOfflineMode: boolean;
  syncStatus: SyncStatusState;
}

const initialState: AppState = {
  enableOfflineMode:
    (typeof import.meta !== "undefined" &&
      (import.meta as any).env &&
      ((import.meta as any).env.VITE_ENABLE_OFFLINE === "true" ||
        (import.meta as any).env.VITE_ENABLE_OFFLINE === true)) ?? true,
  syncStatus: { inProgress: false, progress: 0 },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setEnableOfflineMode(state, action: PayloadAction<boolean>) {
      state.enableOfflineMode = action.payload;
    },
    setSyncInProgress(state, action: PayloadAction<boolean>) {
      state.syncStatus.inProgress = action.payload;
    },
    setSyncProgress(state, action: PayloadAction<number>) {
      state.syncStatus.progress = action.payload;
    },
    resetSync(state) {
      state.syncStatus = { inProgress: false, progress: 0 };
    },
  },
});

export const { setEnableOfflineMode, setSyncInProgress, setSyncProgress, resetSync } = appSlice.actions;

export const getEnableOfflineMode = (state: RootState) => state.app.enableOfflineMode;
export const getSyncStatus = (state: RootState) => state.app.syncStatus;

export default appSlice.reducer;
