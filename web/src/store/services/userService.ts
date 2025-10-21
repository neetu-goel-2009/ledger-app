import httpAPI from "../http.api";

export default {
  async verifyToken(token: string) {
    const response = await httpAPI().post("/users/verify-token", { token });
    return response.data;
  },
};