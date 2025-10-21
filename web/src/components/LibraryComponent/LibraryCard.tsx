import { useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Fab,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getDataById } from "../../store/components/library/library";

const LibraryCard = (props: any) => {
  const {
    id,
    info,
    library_id,
    library_master_id,
    site_id,
    vendor_id,
    createdon,
    price,
    quantity,
    onEdit,
  } = props;
  const dispatch = useAppDispatch();
  const library = useAppSelector(getDataById("library", library_id));
  const libraryMaster = useAppSelector(
    getDataById("libraryMaster", library_master_id)
  );
  const site = useAppSelector(getDataById("site", site_id));
  const vendor = useAppSelector(getDataById("vendor", vendor_id));

  // console.log({ library, libraryMaster, site, vendor });
  return (
    <Box
      className={`library-card ${props.className}`}
      sx={{ minWidth: 275, p: "0rem 1rem 1rem 1rem" }}
    >
      <Card variant="outlined">
        <CardContent sx={{ position: "relative" }}>
          <Typography
            sx={{ fontSize: 14, maxWidth: "calc(100% - 20px)" }}
            color="text.secondary"
            gutterBottom
          >
            {vendor &&
              `${vendor.name}${vendor.variant ? `, ${vendor.variant}` : ""}`}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {libraryMaster &&
              `${libraryMaster.name}${
                libraryMaster.variant ? `, ${libraryMaster.variant}` : ""
              }`}
          </Typography>
          <Typography
            sx={{ fontSize: 16, display: "flex", alignContent: "center" }}
            component="div"
          >
            Quantity: {quantity}
            <Typography
              component="span"
              sx={{ fontSize: 14, maxWidth: "calc(100% - 20px)" }}
              color="text.secondary"
            >
              &nbsp;{createdon && `(${moment(createdon).format("MM/DD/YYYY")})`}
            </Typography>
          </Typography>
          <Typography sx={{ fontSize: 16 }} component="div">
            Price: {price}
          </Typography>
          <Fab
            size="small"
            color="secondary"
            aria-label="edit"
            sx={{ position: "absolute", top: 12, right: 12 }}
            onClick={onEdit}
          >
            <EditIcon />
          </Fab>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </Box>
  );
};

export default LibraryCard;
