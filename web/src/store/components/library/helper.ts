export const filterSpecialtType = (data, type) => {
  if (data.library.data.length && data.libraryMaster.data.length) {
    const typeLib = data.library.data.find((item: any) => item.type === type);
    if (typeLib) {
      return data.libraryMaster.data.filter(
        (item: any) => item.library_id === typeLib.id
      );
    }
  }
  return [];
};

export const setSelectedType = (data, type) => {
  if (!data[type].selected && data[type].data.length) {
    return data[type].data[0];
  }
  return null;
};
