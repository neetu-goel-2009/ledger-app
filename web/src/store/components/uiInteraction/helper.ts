export const setSites = (data) => {
  if (
    data.libraries &&
    data.libraries.length &&
    data.librariesMaster &&
    data.librariesMaster.length
  ) {
    const siteLib = data.libraries.find((item: any) => item.type === "site");
    if (siteLib) {
      const sites = data.librariesMaster.filter(
        (item: any) => item.library_id === siteLib.id
      );
      return sites;
    }
  }
  return [];
};

export const setSelectedSite = (data) => {
  if (!data.selectedSite && data.sites.length) {
    return data.sites[0];
  }
  return null;
};
