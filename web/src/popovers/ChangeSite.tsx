import { Popover, Block, Link, Page, Navbar } from "framework7-react";
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
  Avatar,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import {
  getData,
  getSelectedData,
  updateSelectedSite,
} from "../store/components/library/library";
import {
  getToggleStatus,
  setToggleStatus,
} from "../store/components/uiInteraction/uiInteraction";

const ChangeSite = () => {
  const dispatch = useAppDispatch();
  const toggleStatus = useAppSelector(getToggleStatus);
  const sites = useAppSelector(getData("site"));
  const selectedSite = useAppSelector(getSelectedData("site"));
  
  return (
    <>
      <Popover
        className="popover-change-site"
        verticalPosition="bottom"
        opened={toggleStatus("site")}
        onPopoverClose={() => {
          dispatch(setToggleStatus({ key: "site", status: false }));
        }}
      >
        <Paper
          elevation={8}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            minWidth: 320,
            maxWidth: 400,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Select Site
                </Typography>
              </Stack>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "primary.contrastText",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                Add Site
              </Button>
            </Stack>
          </Box>

          {/* Sites List */}
          <List
            sx={{
              maxHeight: "calc(100vh - 200px)",
              overflow: "auto",
              padding: 0,
            }}
            component="nav"
            aria-labelledby="sites-list-subheader"
          >
            {sites && sites.length > 0 ? (
              sites.map((item: any, index: any) => (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{
                    borderBottom: "1px solid #f0f0f0",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <ListItemButton
                    selected={selectedSite && item.id === selectedSite.id}
                    sx={{
                      padding: 2,
                      "&.Mui-selected": {
                        backgroundColor: "rgba(255, 107, 53, 0.12)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 107, 53, 0.16)",
                        },
                      },
                      "&:hover": {
                        backgroundColor: "rgba(255, 107, 53, 0.08)",
                      },
                    }}
                    onClick={() => {
                      dispatch(updateSelectedSite({ data: item }));
                      dispatch(setToggleStatus({ key: "site", status: false }));
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: selectedSite && item.id === selectedSite.id 
                          ? "primary.main" 
                          : "grey.300",
                        marginRight: 2,
                        width: 40,
                        height: 40,
                      }}
                    >
                      <StorefrontIcon 
                        sx={{ 
                          color: selectedSite && item.id === selectedSite.id 
                            ? "primary.contrastText" 
                            : "grey.600" 
                        }} 
                      />
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: selectedSite && item.id === selectedSite.id ? 600 : 500,
                            color: selectedSite && item.id === selectedSite.id ? "primary.main" : "text.primary",
                          }}
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ marginTop: 0.5 }}>
                          <Chip
                            label={item.variant}
                            size="small"
                            sx={{
                              backgroundColor: selectedSite && item.id === selectedSite.id 
                                ? "primary.main" 
                                : "secondary.main",
                              color: "white",
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
                  padding: 4,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                <StorefrontIcon sx={{ fontSize: 48, marginBottom: 2, opacity: 0.5 }} />
                <Typography variant="body2">
                  No sites available
                </Typography>
              </Box>
            )}
          </List>
        </Paper>
      </Popover>
    </>
  );
};

export default ChangeSite;
