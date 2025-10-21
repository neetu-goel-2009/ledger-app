import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import uiService from "../../services/uiService";

// Define a type for the slice state
interface UiInteractionState {
  activeForm: any;
  toggleStatus: any;
  dynamicFormData: any;
}

// Define the initial state using that type
const initialState: UiInteractionState = {
  activeForm: null,
  toggleStatus: {
    dynamicForm: false,
    registerForm: false,
    loginForm: false,
    profilePage: false,
    site: false,
    leftNav: false,
  },
  dynamicFormData: {
    formData: null,
    pageTitle: null,
    submitCB: null,
  },
};

export const uiInteractionSlice = createSlice({
  name: "uiInteraction",
  initialState,
  reducers: {
    setToggleStatus: (state, action) => {
      state.activeForm = action.payload.key;
      state.toggleStatus[action.payload.key] = action.payload.status;
    },
    setDynamicFormData: (state, action) => {
      // Handle array of updates
      if (Array.isArray(action.payload)) {
        state.dynamicFormData = {
          ...state.dynamicFormData,
          ...action.payload.reduce((acc, item) => ({
            ...acc,
            [item.key]: item.value
          }), {})
        };
      } else {
        // Handle single update for backward compatibility
        state.dynamicFormData = {
          ...state.dynamicFormData,
          [action.payload.key]: action.payload.value,
        };
      }
      console.log("44", JSON.parse(JSON.stringify(state.dynamicFormData)));
    },
  },
});

export const { setToggleStatus, setDynamicFormData } =
  uiInteractionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getToggleStatus = (state: RootState) => (key) =>
  state[uiInteractionSlice.name].toggleStatus[key];

export const getDynamicFormData = (state: RootState) =>
  state[uiInteractionSlice.name].dynamicFormData;

export const loadDynamicFormData = (endpoint: string) => createAsyncThunk("loadDynamicFormData", async () => {
  return await uiService.getUIService(endpoint);
});

export const saveDynamicFormData = (endpoint: string, data: any) => createAsyncThunk("saveDynamicFormData", async () => {
  return await uiService.saveUIService(endpoint, data);
});

export const updateDynamicFormData = (endpoint: string, data: any) => createAsyncThunk("updateDynamicFormData", async () => {
  return await uiService.updateUIService(endpoint, data);
});

export const deleteDynamicFormData = (endpoint: string, data: any) => createAsyncThunk("deleteDynamicFormData", async () => {
  return await uiService.deleteUIService(endpoint, data);
});

export default uiInteractionSlice.reducer;
