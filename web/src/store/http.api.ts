import axios from "axios";
import { AUTH_CONFIG } from '../config/auth.config';

export default () => {
  return axios.create({
    baseURL: AUTH_CONFIG.apiEndpoint,
  });
};
