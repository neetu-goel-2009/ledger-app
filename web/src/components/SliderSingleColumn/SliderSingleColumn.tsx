import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
// import Grid from "@mui/material/Grid";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardFooter,
//   Link,
//   Block,
// } from "framework7-react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  Button,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WalletIcon from "@mui/icons-material/Wallet";

import DividerElem from "../common/TextElem/DividerElem";
import { food } from "../../assets/index";
import "./slidersinglecolumn.scss";

const SliderSingleColumn = (props: any) => {
  const theme = useTheme();
  const data = props.data;
  // console.log({ food });
  return (
    <Stack
      className="slider-single-column grid-style"
      // direction="row"
      sx={{ my: "1rem", mx: "0.5rem", width: "calc(100vw - 1rem)" }}
    >
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 120 }}
          image="https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg"
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column", width: "65%" }}>
          <CardContent sx={{ flex: "1 0 auto", px: "0.5rem", py: "0rem" }}>
            <Typography
              component="div"
              variant="subtitle1"
              style={{ fontWeight: "bold", fontSize: "1rem" }}
            >
              {data.name}
            </Typography>
            <Typography
              noWrap
              variant="subtitle2"
              color="text.secondary"
              component="div"
              title={data.cuisine}
              style={{ textOverflow: "ellipsis" }}
            >
              {data.cuisine}
            </Typography>
            <Typography
              noWrap
              variant="subtitle2"
              color="text.secondary"
              component="div"
              title={data.extraText || ""}
              style={{ textOverflow: "ellipsis" }}
            >
              {data.extraText || ""}&nbsp;
            </Typography>
          </CardContent>
          <DividerElem />
          <CardActions>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <StarIcon style={{ fontSize: "20" }} />
                <span style={{ fontSize: "12px" }}>{data.rating}</span>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AccessTimeIcon style={{ fontSize: "20" }} />
                <span style={{ fontSize: "12px" }}>{data.duration}</span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <WalletIcon style={{ fontSize: "20" }} />
                <span style={{ fontSize: "12px" }}>{data.priceUnit}</span>
              </Box>
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Stack>
  );
};

export default SliderSingleColumn;
