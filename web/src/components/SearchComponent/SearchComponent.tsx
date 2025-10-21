import Stack from "@mui/material/Stack";

import SearchBox from "../common/InputElem/SearchBox";
import "./searchcomponent.scss";

const SearchComponent = (props: any) => {
  //   const data = props.data;

  return (
    <Stack
      className={`search-component ${props.className}`}
      direction="row"
      sx={{ px: "0.5rem", width: "calc(100vw)" }}
    >
      <SearchBox />
    </Stack>
  );
};

export default SearchComponent;
