import Stack from "@mui/material/Stack";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import TextElem from "../common/TextElem/TextElem";
import TextElipsis from "../common/TextElem/TextElipsis";
import Avatar from "../common/TextElem/Avatar";
import "./homelocation.scss";

const HomeLocation = (props: any) => {
  // const data = props.data;

  return (
    <div className={`home-location ${props.className}`}>
      <Stack direction="row">
        <div className="location-icon">
          <LocationOnIcon sx={{ fontSize: 30 }} />
        </div>
        <Stack direction="column" style={{ width: "calc(100% - 70px)" }}>
          <TextElem style={{ fontWeight: "12px" }} type="s3">
            Home
          </TextElem>
          <TextElipsis type="s1" style={{ paddingRight: "5px" }}>
            BU 191, 3rd Floor, Near Income Tax Colony, Pitampura - 110034
          </TextElipsis>
        </Stack>

        <span
          onClick={(e) => {
            e.preventDefault();
            props.onUserIconClick();
          }}
        >
          <Avatar name="Pardeep Kumar" />
        </span>
      </Stack>
    </div>
  );
};

export default HomeLocation;
