import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import TextElem from "./TextElem";

const DividerElem = (props: any) => {
  return (
    <Box
      sx={{
        m: "0.5rem",
        width: "calc(100vw - 1rem)",
      }}
    >
      {props.children && props.children.length ? (
        <Divider>
          <TextElem type="s1">{props.children}</TextElem>
        </Divider>
      ) : (
        <Divider />
      )}
    </Box>
  );
};

export default DividerElem;
