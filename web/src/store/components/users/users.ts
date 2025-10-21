import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import signupForm from "./signup-form";
import loginForm from "./login-form";
import { RootState } from "../../store";

// Define types for the form structure
interface FormElement {
  type: string;
  value?: any;
  [key: string]: any;
}

interface FormStructure {
  formElements: FormElement[];
  [key: string]: any;
}

interface Forms {
  [key: string]: FormStructure;
}

// Define a type for the slice state
interface UsersState {
  user: any;
  isLoggedIn: boolean;
  token?: string | null;
  forms: Forms;
}

// Define the initial state using that type
const initialState: UsersState = {
  user: {},
  forms: {
    loginForm: loginForm,
    signupForm: signupForm,
  },
  isLoggedIn: false,
  token: null,
};

// Add new async thunk for token verification
export const verifyStoredToken = createAsyncThunk(
  'users/verifyToken',
  async (_, { dispatch }) => {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    
    console.log({ token })
    try {
      const response = await userService.verifyToken(token);
      console.log({ response })
      if (response.valid) {
        dispatch(setUser(response.user));
        dispatch(setToken(token));
        return response.user;
      }
      // dispatch(logout());
      return null;
    } catch (error) {
      // dispatch(logout());
      console.log({ error })
      return null;
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateFormStructure: (state, action) => {
      const { key, value } = action.payload;
      console.log('Before update:', state.forms[key]);
      
      if (state.forms[key]) {
        // Using Redux Toolkit's built-in immer functionality
        state.forms = {
          ...state.forms,
          [key]: {
            ...state.forms[key],
            ...value
          }
        };
      }
      
      console.log('After update:', state.forms[key]);
    },
    setFormData1: (state, action) => {
      const key = action.payload.key;
      const value = action.payload.value;
      if (state.forms[key]) {
        state.forms[key] = {
          ...state.forms[key],
          formElements: state.forms[key].formElements.map((item: any) => {
            if (item.type === "text") item.value = "aaaa";
            return item;
          }),
        };
      }
    },

    // Set full user object (from backend)
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload && Object.keys(action.payload).length > 0;
    },

    // Update partial user fields
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    // Store token in state and persist to localStorage
    setToken: (state, action) => {
      const token = action.payload;
      state.token = token || null;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('auth_token', token);
        } catch (e) {
          console.warn('Failed to save token to localStorage', e);
        }
      }
    },

    // Clear token from localStorage and state (frontend-only)
    clearToken: (state) => {
      state.token = null;
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('auth_token');
        } catch (e) {
          console.warn('Failed to remove token from localStorage', e);
        }
      }
    },

    logout: (state) => {
      state.user = {};
      state.isLoggedIn = false;
      state.token = null;
      if (typeof window !== 'undefined') {
        try { localStorage.removeItem('auth_token'); } catch (e) {}
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyStoredToken.fulfilled, (state, action) => {
        state.isLoggedIn = !!action.payload;
      });
  },
});

export const { updateFormStructure, setFormData1, setUser, updateUser, setToken, clearToken, logout } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getLoginStatus = (state: RootState) => state.users.isLoggedIn;
export const getUser = (state: RootState) => state.users.user;
export const getToken = (state: RootState) => state.users.token;
export const getFormData = (state: RootState) => (key: string) => {
  console.log("aaaaaaaaaaaaaa", JSON.parse(JSON.stringify(state.users.forms[key])));
  return state.users.forms[key];
}
// export const getSignupForm = (state: RootState) => state.users.signupForm;

export default usersSlice.reducer;
