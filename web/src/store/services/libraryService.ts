import httpAPI from "../http.api";

export default {
  async getAllLibraries() {
    const response = await httpAPI().get("/library/");
    return response.data;
  },
  async getAllLibrariesMaster() {
    const response = await httpAPI().get("/library/master");
    return response.data;
  },
  async getAllLibrariesMasterData() {
    const response = await httpAPI().get("/library/master/data");
    return response.data;
  },
  async getLibrariesMasterData(
    siteId: number,
    libraryId: number,
    page: number,
    limit: number = 10
  ) {
    const response = await httpAPI().get(
      `/library/master/data/${siteId}/${libraryId}?page=${page}&limit=${limit}`
    );
    return response.data;
  },
  async setLibrariesMasterData(data: any) {
    const response = await httpAPI().post(`/library/master/data`, data);
    return response.data;
  },
};
