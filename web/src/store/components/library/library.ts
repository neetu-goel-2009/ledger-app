import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

import libraryService from "../../services/libraryService";

import { filterSpecialtType, setSelectedType } from "./helper";

// Define a type for the slice state
interface LibraryState {
  site: any;
  vendor: any;
  library: any;
  libraryMaster: any;
  libraryMasterData: any;
}

// Define the initial state using that type
const initialState: LibraryState = {
  site: {
    isLoading: false,
    data: [],
    error: {},
    selected: null,
  },
  vendor: {
    isLoading: false,
    data: [],
    error: {},
    selected: null,
  },
  library: {
    isLoading: false,
    data: [],
    error: {},
    selected: null,
  },
  libraryMaster: {
    isLoading: false,
    data: [],
    error: {},
    selected: null,
  },
  libraryMasterData: {
    isLoading: false,
    data: [],
    error: {},
    selected: null,
  },
};

export const loadAllLibraries = createAsyncThunk("library", async () => {
  return await libraryService.getAllLibraries();
});

export const loadAllLibrariesMaster = createAsyncThunk(
  "library/master",
  async () => {
    return await libraryService.getAllLibrariesMaster();
  }
);

export const loadLibrariesMasterData = createAsyncThunk(
  "library/master/data",
  async (params: any) => {
    const { siteId, libraryId, page } = params;
    return await libraryService.getLibrariesMasterData(siteId, libraryId, page);
  }
);

export const saveLibrariesMasterData = createAsyncThunk(
  "library/master/data/save",
  async (data: any) => {
    return await libraryService.setLibrariesMasterData(data);
  }
);

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    updateSelectedSite: (state, action) => {
      state.site.selected = action.payload.data;
    },
    updateSelectedLibrary: (state, action) => {
      state.library.selected = action.payload.data;
    },
    updateLibrariesMasterData: (state, action) => {
      state.libraryMasterData.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllLibraries.pending, (state) => {
        state.library.isLoading = "loading";
      })
      .addCase(loadAllLibraries.fulfilled, (state, action) => {
        state.library.isLoading = "succeeded";
        if (action.payload.result) {
          state.library.data = action.payload.result;
          if (!state.library.selected && state.library.data.length) {
            state.library.selected = state.library.data[0];
          }
          state.site.data = filterSpecialtType(state, "site");
          state.site.selected = setSelectedType(state, "site");
          state.vendor.data = filterSpecialtType(state, "vendor");
          state.vendor.selected = setSelectedType(state, "vendor");
        }
      })
      .addCase(loadAllLibraries.rejected, (state, action) => {
        state.library.isLoading = "failed";
        state.library.error = action.error.message;
      });

    builder
      .addCase(loadAllLibrariesMaster.pending, (state) => {
        state.libraryMaster.isLoading = "loading";
      })
      .addCase(loadAllLibrariesMaster.fulfilled, (state, action) => {
        state.libraryMaster.isLoading = "succeeded";
        if (action.payload.result) {
          state.libraryMaster.data = action.payload.result;
          state.site.data = filterSpecialtType(state, "site");
          state.site.selected = setSelectedType(state, "site");
          state.vendor.data = filterSpecialtType(state, "vendor");
          state.vendor.selected = setSelectedType(state, "vendor");
        }
      })
      .addCase(loadAllLibrariesMaster.rejected, (state, action) => {
        state.libraryMaster.isLoading = "failed";
        state.libraryMaster.error = action.error.message;
      });

    builder
      .addCase(loadLibrariesMasterData.pending, (state) => {
        state.libraryMasterData.isLoading = "loading";
      })
      .addCase(loadLibrariesMasterData.fulfilled, (state, action) => {
        state.libraryMasterData.isLoading = "succeeded";
        if (action.payload.result) {
          state.libraryMasterData.data = action.payload.result;
        }
      })
      .addCase(loadLibrariesMasterData.rejected, (state, action) => {
        state.libraryMasterData.isLoading = "failed";
        state.libraryMasterData.error = action.error.message;
      });

    builder.addCase(saveLibrariesMasterData.pending, (state) => {
      state.libraryMasterData.isLoading = "loading";
    });
    // .addCase(saveLibrariesMasterData.fulfilled, (state, action) => {
    //   // state.libraryMasterData.isLoading = "succeeded";
    //   // if (action.payload.result) {
    //   //   state.libraryMasterData.data = action.payload.result;
    //   // }
    // })
    // .addCase(saveLibrariesMasterData.rejected, (state, action) => {
    //   // state.libraryMasterData.isLoading = "failed";
    //   // state.libraryMasterData.error = action.error.message;
    // });
  },
});

export const {
  updateSelectedSite,
  updateSelectedLibrary,
  updateLibrariesMasterData,
} = librarySlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const getDataById = (key, id: any) => (state: RootState) =>
  state[librarySlice.name][key].data.find((item: any) => item.id === id);

export const getData =
  (key, valueKey = "data") =>
  (state: RootState) =>
    state[librarySlice.name][key][valueKey];

export const getSelectedData = (key) => (state: RootState) =>
  state[librarySlice.name][key].selected;

export const getSimpleLibraries = (state: RootState) =>
  state[librarySlice.name].library.data.filter(
    (item: any) => item.type === "simple"
  );

export const getLibraryState = (state: RootState) => state[librarySlice.name];

export const getLibraryFormElements = (state: RootState) => () => {
  const selected = state[librarySlice.name].library.selected;
  if (selected && selected.info && selected.info.formElements) {
    return selected.info.formElements;
  }
  return null;
};

export default librarySlice.reducer;
