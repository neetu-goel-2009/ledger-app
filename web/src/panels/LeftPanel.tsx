import {
  Panel,
  View,
  NavRight,
  Block,
  Link,
  Page,
  Navbar,
} from "framework7-react";
import {
  ListSubheader,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Stack,
  Box,
  Divider,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import {
  getSimpleLibraries,
  updateSelectedLibrary,
} from "../store/components/library/library";

import {
  setToggleStatus,
  getToggleStatus,
} from "../store/components/uiInteraction/uiInteraction";

const LeftPanel = () => {
  const dispatch = useAppDispatch();
  const toggleStatus = useAppSelector(getToggleStatus);
  const simpleLibraries = useAppSelector(getSimpleLibraries);
  
  return (
    <>
      <Panel
        left
        cover
        containerEl="#panel-page"
        id="panel-nested"
        opened={toggleStatus("leftNav")}
        onPanelClose={() => {
          dispatch(setToggleStatus({ key: "leftNav", status: false }));
        }}
      >
        <Page>
          <Box
            sx={{
              backgroundColor: "background.paper",
              minHeight: "100vh",
              padding: 2,
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                textAlign: "center",
                padding: 3,
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                borderRadius: 2,
                marginBottom: 3,
                boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
              }}
            >
              <RestaurantIcon sx={{ fontSize: 48, marginBottom: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Food Manager
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Select your restaurant
              </Typography>
            </Box>

            {/* Manager Selection Section */}
            <Box sx={{ marginBottom: 2 }}>
              <ListSubheader
                component="div"
                sx={{
                  backgroundColor: "transparent",
                  padding: "16px 0 8px 0",
                  marginBottom: 1,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <StorefrontIcon sx={{ color: "primary.main" }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Available Managers
                  </Typography>
                </Stack>
              </ListSubheader>

              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  maxHeight: "calc(100vh - 300px)",
                  overflow: "auto",
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                {simpleLibraries && simpleLibraries.length > 0 ? (
                  simpleLibraries.map((item: any, index: any) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        sx={{
                          margin: "4px 8px",
                          borderRadius: 2,
                          "&:hover": {
                            backgroundColor: "rgba(255, 107, 53, 0.08)",
                          },
                        }}
                        onClick={() => {
                          dispatch(updateSelectedLibrary({ data: item }));
                          dispatch(
                            setToggleStatus({ key: "leftNav", status: false })
                          );
                        }}
                      >
                        <Avatar
                          sx={{
                            backgroundColor: "primary.main",
                            marginRight: 2,
                            width: 40,
                            height: 40,
                          }}
                        >
                          <RestaurantIcon />
                        </Avatar>
                        <ListItemText
                          primary={
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {item.name}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ marginTop: 0.5 }}>
                              <Chip
                                label={item.variant}
                                size="small"
                                sx={{
                                  backgroundColor: "secondary.main",
                                  color: "secondary.contrastText",
                                  fontSize: "0.75rem",
                                }}
                              />
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))
                ) : (
                  <Box
                    sx={{
                      padding: 3,
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    <RestaurantIcon sx={{ fontSize: 48, marginBottom: 2, opacity: 0.5 }} />
                    <Typography variant="body2">
                      No managers available
                    </Typography>
                  </Box>
                )}
              </List>
            </Box>

            {/* Footer Section */}
            <Box
              sx={{
                marginTop: "auto",
                padding: 2,
                backgroundColor: "background.default",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Food Ecommerce App v1.0
              </Typography>
            </Box>
          </Box>
        </Page>
      </Panel>
    </>
  );
};

export default LeftPanel;
