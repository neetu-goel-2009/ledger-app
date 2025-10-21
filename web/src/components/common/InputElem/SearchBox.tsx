import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Divider } from "@mui/material";

import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";

import theme from "../../../styles/theme.json";
import "./inputelem.scss";

const SearchBox = (props: any) => {
  const type = props.type;

  const getStyle = () => {
    switch (type) {
      case "s1":
        return `text-s1 ${theme.font.classes.fthin}`;
      case "s2":
        return `text-s2 ${theme.font.classes.fregular}`;
      case "s3":
        return `text-s3 ${theme.font.classes.fbold}`;
      case "hr":
        return `text-hr ${theme.font.classes.fregular}`;
      default:
        return `text-s2 ${theme.font.classes.fregular}`;
    }
  };

  return (
    <TextField
      className="search-box"
      label=""
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Divider orientation="vertical" variant="middle" flexItem />
              <KeyboardVoiceOutlinedIcon
                style={{ color: theme.colors.redcolor }}
              />
            </Box>
          </InputAdornment>
        ),
        // classes: { root: "search-box" },
      }}
      variant="standard"
      sx={{
        outline: "none",
      }}
    />
  );
};

export default SearchBox;
