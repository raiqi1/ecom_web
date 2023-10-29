import React, { useEffect } from "react";
import styles from "./styles.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper";

export default function ProductSwiper({ images }) {

  const swiperRef = React.useRef(null);
  useEffect(() => {
    swiperRef.current.swiper.autoplay.stop();
  },[swiperRef])

  return (
    <div className={styles.swiper} 
    onMouseEnter={() => {
        swiperRef.current.swiper.autoplay.start(0);
    }}
    onMouseLeave={() => {
        swiperRef.current.swiper.autoplay.stop();
        swiperRef.current.swiper.slideTo(0);
    }}
    >
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        speed={500}
        modules={[Autoplay]}
      >
        {images.map((img)=>(
            <SwiperSlide>
                <img src={img.url} alt="product" />
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
