/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { getNewsImgUrl } from "../../utils/getImgUrl";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
const News = () => {
  const [news, setNews] = React.useState([]);
  useEffect(() => {
    fetch("new.json")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);
  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">News</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        navigation={true}
        modules={[Navigation, Pagination]}
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col sm:flex-row sm:justify-center items-center">
              <div className="py-4">
                <Link>
                  <h3 className="text-lg font-medium hover:text-blue-500 mb-4">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={`${getNewsImgUrl(item.image)}`}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
