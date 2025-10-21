import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import LibraryCard from "./LibraryCard";
import "./libraryComponent.scss";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getData,
  getDataById,
  getSelectedData,
  loadLibrariesMasterData,
  updateLibrariesMasterData,
  getLibraryState,
  getLibraryFormElements,
  saveLibrariesMasterData,
} from "../../store/components/library/library";
import {
  setToggleStatus,
  setDynamicFormData,
} from "../../store/components/uiInteraction/uiInteraction";

import { formatFormElements } from "./helper";

const LibraryComponent = (props: any) => {
  // const data = props.data;
  const [libraryId, setLibraryId] = useState(0);
  const dispatch = useAppDispatch();
  const selectedSite = useAppSelector(getSelectedData("site"));
  const selectedLibrary = useAppSelector(getSelectedData("library"));
  const masterData = useAppSelector(getData("libraryMasterData"));
  const libraryState = useAppSelector(getLibraryState);
  // const libraryFormElements = useAppSelector(getLibraryFormElements);
  const isMasterDataLoading = useAppSelector(
    getData("libraryMasterData", "isLoading")
  );
  const library = useAppSelector(getDataById("library", libraryId));

  // console.log({ masterData, selectedSite, selectedLibrary, library });

  const loadLibraryData = () => {
    dispatch(updateLibrariesMasterData({ data: [] }));
    if (selectedSite && selectedLibrary) {
      setLibraryId(selectedLibrary.id);
      dispatch(
        loadLibrariesMasterData({
          siteId: selectedSite.id,
          libraryId: selectedLibrary.id,
          page: 1,
        })
      );
    }
  };

  useEffect(() => {
    loadLibraryData();
  }, [selectedSite, selectedLibrary]);

  const onSubmitCB = (values: any) => {
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa onSubmitCB");
    dispatch(saveLibrariesMasterData(values))
      .unwrap()
      .then(() => {
        dispatch(setToggleStatus({ key: "dynamicForm", status: false }));
        loadLibraryData();
      });
  };

  return (
    <div className={`library-component ${props.className}`}>
      {library && (
        <Box
          sx={{
            px: "1rem",
            py: "0.5rem",
            position: "sticky",
            top: "0px",
            bgcolor: "#fff",
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
            zIndex: 1051,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{library.name}</Typography>
            <Button
              variant="contained"
              size="small"
              component="div"
              color="secondary"
              onClick={() => {
                dispatch(
                  setDynamicFormData({
                    key: "formData",
                    value: {
                      formElements: formatFormElements({ libraryState }),
                    },
                  })
                );
                dispatch(
                  setDynamicFormData({ key: "pageTitle", value: "Add Entry" })
                );
                dispatch(
                  setDynamicFormData({
                    key: "submitCB",
                    value: onSubmitCB,
                  })
                );
                dispatch(setToggleStatus({ key: "dynamicForm", status: true }));
              }}
            >
              Add Entry
            </Button>
          </Stack>
        </Box>
      )}
      {!library && (
        <Typography>Please select option from left menu.</Typography>
      )}
      {isMasterDataLoading === "loading" ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {masterData && masterData.length ? (
            <Box
              sx={{
                pt: "1rem",
                bgcolor: "#fff",
              }}
            >
              {masterData.map((item: any, index: number) => (
                <LibraryCard
                  key={index}
                  {...item}
                  onEdit={() => {
                    dispatch(
                      setDynamicFormData({
                        key: "formData",
                        value: {
                          formElements: formatFormElements({
                            libraryState,
                            item,
                          }),
                        },
                      })
                    );
                    dispatch(
                      setDynamicFormData({
                        key: "pageTitle",
                        value: "Edit Entry",
                      })
                    );
                    dispatch(
                      setDynamicFormData({
                        key: "submitCB",
                        value: onSubmitCB,
                      })
                    );
                    dispatch(
                      setToggleStatus({ key: "dynamicForm", status: true })
                    );
                  }}
                />
              ))}
            </Box>
          ) : (
            <Typography sx={{ pt: "1rem", textAlign: "center" }}>
              No Data Found
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export default LibraryComponent;
