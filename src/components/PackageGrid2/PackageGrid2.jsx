import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './PackageGrid2.css';
import axios from 'axios';
import { useAuth } from '../../hooks/Hooks';
import Loader from '../Loader/Loading';
import { Autoplay, Pagination } from 'swiper/modules';

const PackageGrid2 = () => {
  const [gridData, setGridData] = useState([]);
  const { loading } = useAuth();

  useEffect(() => {
    axios.get("http://localhost:3000/grid2")
      .then(res => setGridData(res.data))
      .catch(err => console.error("Error fetching grid data:", err));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full py-10 px-4 md:px-8 flex justify-center items-center">
      <div className="w-full max-w-6xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-xl overflow-hidden shadow-2xl">

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-full"
        >
          {gridData.map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${banner.image})`,
                }}
              >
                <div className="w-full h-full bg-black/50 flex items-center px-4 sm:px-8 md:px-12">
                  <Fade direction="left" cascade triggerOnce>
                    <div className="text-white max-w-xl space-y-5">
                      <a
                        href={banner.buttonUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="px-5 py-2 sm:px-6 sm:py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300">
                          {banner.buttonText || "Explore Now"}
                        </button>
                      </a>
                    </div>
                  </Fade>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
};

export default PackageGrid2;
