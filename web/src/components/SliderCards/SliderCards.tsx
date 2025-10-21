import Stack from "@mui/material/Stack";
import { Typography, Rating, Box } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import TextElem from "../common/TextElem/TextElem";
import OverlayGradient from "../common/OverlayGradient/OverlayGradient";
import StarIcon from "@mui/icons-material/Star";

import { getRatingColor } from "../../utils";
import { food } from "../../assets/index";
import "./slidercards.scss";

const SliderCards = (props: any) => {
  const data = props.data;
  // console.log({ food });
  return (
    <Stack
      className="slider-cards"
      direction="row"
      sx={{ my: "0.5rem", width: "calc(100vw)" }}
    >
      <Swiper
        // slidesPerView={3}
        // loop={true}
        // slidesPerView="auto"
        slidesPerView={"auto"}
        grid={{ rows: 2 }}
        spaceBetween={5}
        // pagination={{ clickable: true }}
        modules={[Grid]}
        className="mySwiper"
      >
        {data.map((item: any, index: any) => (
          <SwiperSlide key={`${item.title}_${index}`}>
            <div className="card" style={{ backgroundImage: `url(${food})` }}>
              <OverlayGradient />
              <TextElem type="c1" className="text-header">
                {item.title}
              </TextElem>
              <TextElem type="c2" className="text-sub-header">
                {item.subTitle}
              </TextElem>
            </div>
            <div className="card-info">
              <Typography noWrap className="heading" component="div">
                {item.name}
              </Typography>
              <Box display="flex" alignItems="center">
                <Rating
                  name="simple-controlled"
                  defaultValue={1}
                  max={1}
                  size="small"
                  icon={
                    <StarIcon
                      fontSize="inherit"
                      sx={{ color: getRatingColor(item.rating) }}
                    />
                  }
                />
                <Typography noWrap className="sub-heading" component="span">
                  {item.rating} | {item.duration}
                </Typography>
              </Box>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default SliderCards;
