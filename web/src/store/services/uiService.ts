import httpAPI from "../http.api";

export default {
  async getUIService(endpoint: string) {
    const response = await httpAPI().get(endpoint);
    return response.data;
  },

  async saveUIService(endpoint: string, data: any) {
    const response = await httpAPI().post(endpoint, data);
    return response.data;
  },
  
  async updateUIService(endpoint: string, data: any) {
    const response = await httpAPI().put(endpoint, data);
    return response.data;
  },
  
  async deleteUIService(endpoint: string, data: any) {
    const response = await httpAPI().delete(endpoint, { data });
    return response.data;
  },
};
