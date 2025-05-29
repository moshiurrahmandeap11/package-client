import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Fade } from "react-awesome-reveal";
import { motion } from "framer-motion";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/banner").then((res) => {
      setBanners(res.data);
    });
  }, []);

  return (
    <div className="w-full ">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[80vh]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${banner.image})`,
              }}
            >
              <div className="w-full h-full bg-black/50 flex items-center px-10">
                <Fade direction="left" cascade triggerOnce>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="text-white max-w-xl space-y-5"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold">
                      {banner.title || "Welcome to"}{" "}
                      <span className="text-green-400">Career Code</span>
                    </h1>
                    <p className="text-lg">
                      {banner.subtitle ||
                        "Your ultimate platform for finding jobs and hiring talent."}
                    </p>
                    <a
                      href={banner.buttonUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all"
                      >
                        {banner.buttonText || "Explore Now"}
                      </motion.button>
                    </a>
                  </motion.div>
                </Fade>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
