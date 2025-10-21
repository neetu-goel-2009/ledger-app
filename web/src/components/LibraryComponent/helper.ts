export const formatFormElements = (params: any = null) => {
  // console.log({ params });
  const libState = params.libraryState;
  const itemState = params.item || null;
  // console.log({ itemState });
  const selected = libState.library.selected;
  let retFieldArr = [];
  if (selected && selected.info && selected.info.formElements) {
    retFieldArr = selected.info.formElements.map((elementRO: any) => {
      const element = { ...elementRO };
      if (element.name === "site_id") {
        const site = libState.site.selected;
        element.value = itemState?.site_id || site?.id || element.value;
      } else if (element.name === "library_id") {
        const library = libState.library.selected;
        element.value = itemState?.library_id || library?.id || element.value;
      } else if (element.name === "vendor_id") {
        const vendor = libState.vendor;
        element.options = vendor?.data?.map((item: any) => ({
          key: item.id,
          value: `${item.name}${item.variant ? ` - ${item.variant}` : ""}`,
        }));
        element.value =
          itemState?.vendor_id || vendor?.selected?.id || element.value;
      } else if (element.name === "library_master_id") {
        const library = libState.library.selected;
        const selectedLibId =
          itemState?.library_id || library?.id || element.value || null;
        const libraryMaster = libState.libraryMaster;
        element.options = libraryMaster?.data
          ?.map((item: any) => {
            if (selectedLibId) {
              if (selectedLibId === item.library_id)
                return {
                  key: item.id,
                  value: `${item.name}${
                    item.variant ? ` - ${item.variant}` : ""
                  }`,
                };
              return null;
            }
            return {
              key: item.id,
              value: `${item.name}${item.variant ? ` - ${item.variant}` : ""}`,
            };
          })
          .filter((item: any) => item !== null);
        element.value =
          itemState?.library_master_id ||
          libraryMaster?.selected?.id ||
          element.value;
      } else if (itemState && itemState[element.name]) {
        element.value = itemState[element.name];
      }
      return element;
    });
  }
  console.log("11", { retFieldArr });
  if (itemState && itemState.id) {
    console.log("itemState.id", itemState.id);
    retFieldArr.push({
      value: itemState.id,
      element: "input",
      type: "hidden",
      label: "",
      name: "id",
      validation: "required",
    });
  }
  console.log("22", { retFieldArr });

  return retFieldArr.length ? retFieldArr : null;
};
