import {
  Popup,
  // View,
  NavRight,
  Block,
  Link,
  Page,
  Navbar,
  View,
} from "framework7-react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  setToggleStatus,
  getToggleStatus,
  setDynamicFormData,
  getDynamicFormData,
  saveDynamicFormData,
} from "../../store/components/uiInteraction/uiInteraction";

import FormRenderer from "../../components/common/FormRenderer/FormRenderer";
import { useEffect } from "react";

export default (props) => {
  const dispatch = useAppDispatch();
  const toggleStatus = useAppSelector(getToggleStatus);
  const dynamicFormData: any = props.dynamicFormData || useAppSelector(getDynamicFormData);
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));

  console.log({ dynamicFormData });
  // useEffect(() => {
  //   const onSubmitCB = (values: any) => {
  //     dispatch(saveDynamicFormData(dynamicFormData.saveData.endPoint, values)())
  //       .unwrap()
  //       .then(() => {
  //         dispatch(setToggleStatus({ key: "dynamicForm", status: false }));
  //         // loadLibraryData();
  //       });
  //   };
  //   dispatch(setDynamicFormData([
  //     { key: "formData", value: dynamicFormData },
  //     { key: "submitCB", value: props.onSubmitCB ? props.onSubmitCB : onSubmitCB },
  //   ]));
  //   dispatch(setToggleStatus({ key: "dynamicForm", status: true }));
  // }, [dynamicFormData]);

  return (
    <>
      {dynamicFormData && dynamicFormData.formData && (
      <Popup
        id="my-popup"
        className="ledger-popup"
        opened={toggleStatus("dynamicForm")}
        onPopupSwipeClose={() => {
          dispatch(
            setToggleStatus({ key: "dynamicForm", status: false })
          );
        }}
        onPopupClose={() => {
          dispatch(
            setToggleStatus({ key: "dynamicForm", status: false })
          );
        }}
      >
        <View>
          <Page>
            <Box
              sx={{
                backgroundColor: "background.paper",
                minHeight: "100vh",
                padding: 0,
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  // backgroundColor: "info.main",
                  // color: "info.contrastText",
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  padding: 3,
                  textAlign: "center",
                  borderRadius: isMobile ? "0 0 16px 16px" : "0 0",
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 16,
                    width: "40px",
                    right: 16,
                    // color: "info.contrastText",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "primary.contrastText",
                    },
                  }}
                  onClick={() => {
                    dispatch(
                      setToggleStatus({ key: "dynamicForm", status: false })
                    );
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {dynamicFormData && dynamicFormData.formData?.pageIcon ? (<dynamicFormData.formData.pageIcon sx={{ fontSize: 48, marginBottom: 2 }} />) : (<AssignmentIcon sx={{ fontSize: 48, marginBottom: 2 }} />)}

                <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 1 }}>
                  {dynamicFormData && dynamicFormData.formData?.pageTitle ? dynamicFormData.formData.pageTitle : "Dynamic Form"}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {dynamicFormData && dynamicFormData.formData?.subTitle ? dynamicFormData.formData.subTitle : "Please fill in the required information"}
                </Typography>
              </Box>

              {/* Form Content */}
              <Box sx={{ padding: 3 }}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: 3,
                    backgroundColor: "background.default",
                    borderRadius: 2,
                    minHeight: "400px",
                  }}
                >
                  {dynamicFormData &&
                    dynamicFormData.formData &&
                    dynamicFormData.formData.formElements ? (
                      <>
                        {dynamicFormData.preFormChildren ? dynamicFormData.preFormChildren : <></>}
                        <FormRenderer
                          formData={dynamicFormData.formData}
                          key={dynamicFormData.formData.key || dynamicFormData.formData.pageTitle || "dynamicForm"}
                        />
                        {dynamicFormData.formData.postFormChildren ? dynamicFormData.formData.postFormChildren() : <></>}
                      </>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "300px",
                        color: "text.secondary",
                      }}
                    >
                      <AssignmentIcon sx={{ fontSize: 64, marginBottom: 2, opacity: 0.5 }} />
                      <Typography variant="h6" sx={{ marginBottom: 1 }}>
                        No Form Data
                      </Typography>
                      <Typography variant="body2">
                        Form configuration is not available
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Box>
            </Box>
          </Page>
        </View>
      </Popup>)}
    </>
  );
};
