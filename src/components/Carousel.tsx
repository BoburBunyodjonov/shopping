import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../assets/banner.jpg";

interface Banner {
  id: string;
  image_url: string;
}


const Carousel: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("https://srvr.bordoshoes.uz/carousels/list");
        setBanners(res.data.data || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        banners.length ? (prevIndex + 1) % banners.length : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return <img
      src={Banner}
      alt={`Banner 1`}
      className="w-full object-contain"
    />;
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners?.map((banner, index) => (
          <img
            key={banner?.id}
            src={
              banner?.image_url.startsWith("http")
                ? banner?.image_url
                : `${banner?.image_url}`
            }
            alt={`Banner ${index + 1}`}
            className="w-full object-contain"
          />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-green-500 scale-125" : "bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
