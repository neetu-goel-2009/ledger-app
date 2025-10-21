import Stack from "@mui/material/Stack";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import TextElem from "../common/TextElem/TextElem";

import { food2 } from "../../assets/index";
import "./slidercardssimple.scss";

const SliderCardsSimple = (props: any) => {
  const data = props.data;

  return (
    <Stack
      className="slider-cards-simple"
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
          <SwiperSlide
            key={`${item.title}_${index}`}
            style={{ backgroundImage: `url(${food2})` }}
          >
            <TextElem type="c3" className="text-header">
              {item.title}
            </TextElem>
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default SliderCardsSimple;
