import axios from "axios";
import { AUTH_CONFIG } from "../config/auth.config";

// Create a single axios instance
const api = axios.create({
  baseURL: AUTH_CONFIG.apiEndpoint,
});

// Request interceptor to inject Bearer token
api.interceptors.request.use((config) => {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem("auth_data") : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      const token: string | undefined = parsed?.token || parsed?.access_token;
        if (token) {
          const headers = (config.headers ?? {}) as any;
          headers["Authorization"] = `Bearer ${token}`;
          config.headers = headers;
        }
    }
  } catch {
    // ignore parse errors
  }
  return config;
});

// Token refresh handling on 401
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error?.config || {};

    // If not unauthorized, just propagate
    if (status !== 401) {
      return Promise.reject(error);
    }

    // Avoid infinite loop on refresh call or login endpoints
    const url: string = originalRequest?.url || "";
    if (
      url.endsWith("/users/refresh-token") ||
      url.endsWith("/users/login") ||
      url.endsWith("/users/google-login") ||
      url.endsWith("/users/facebook-login")
    ) {
      return Promise.reject(error);
    }

    // Only retry once per request
    if ((originalRequest as any)._retry) {
      try { localStorage.removeItem("auth_data"); } catch {}
      return Promise.reject(error);
    }
    (originalRequest as any)._retry = true;

    // Read refresh token
    let refreshToken: string | undefined;
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("auth_data") : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        refreshToken = parsed?.refresh_token;
      }
    } catch {}

    if (!refreshToken) {
      try { localStorage.removeItem("auth_data"); } catch {}
      return Promise.reject(error);
    }

    // If already refreshing, queue the request until we get a new token
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newToken) => {
          try {
            const headers = (originalRequest.headers ?? {}) as any;
            headers["Authorization"] = `Bearer ${newToken}`;
            originalRequest.headers = headers;
            resolve(api(originalRequest));
          } catch (e) {
            reject(e);
          }
        });
      });
    }

    // Start a new refresh call
    isRefreshing = true;
    try {
      const res = await axios.post(`${AUTH_CONFIG.apiEndpoint}/users/refresh-token`, {
        refresh_token: refreshToken,
      });
      const data = res.data || {};
      const newToken: string | undefined = data?.token;
      const newRefresh: string | undefined = data?.refresh_token;

      if (!newToken) {
        throw new Error("No token in refresh response");
      }

      // Persist updated auth
      try {
        localStorage.setItem(
          "auth_data",
          JSON.stringify({
            mode: data?.mode,
            token: newToken,
            refresh_token: newRefresh || refreshToken,
            token_type: data?.token_type || "bearer",
            user: data?.user,
          })
        );
      } catch {}

      // Update default header for subsequent requests
      (api.defaults.headers as any).common = (api.defaults.headers as any).common || {};
      (api.defaults.headers as any).common["Authorization"] = `Bearer ${newToken}`;

      // Notify queued requests
      onRefreshed(newToken);

      // Retry the original request with the new token
      const headers = (originalRequest.headers ?? {}) as any;
      headers["Authorization"] = `Bearer ${newToken}`;
      originalRequest.headers = headers;
      return api(originalRequest);
    } catch (refreshErr) {
      try { localStorage.removeItem("auth_data"); } catch {}
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default () => api;
