import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import TurfService from "./TurfService";
import Loader from "./Loader";
import "../css/TurfList.css";

const TurfList = () => {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await TurfService.getTurfs();
        setTurfs(response.data);
      } catch (error) {
        console.error("An error occurred while fetching the turfs: " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchTurfs();
  }, []);

  const handleBookNow = (turfId) => {
    navigate(`/turf/${turfId}`);
  };

  return (
    <div className="min-h-screen bg-black p-6 sm:p-8 lg:p-10">
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 max-w-screen-3xl">
          {turfs.length === 0 ? (
            <div className="flex justify-center items-center h-64 bg-gray-800 rounded-lg shadow-lg">
              <p className="text-white text-2xl font-semibold">
                No turfs available at the moment.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 items-center">
              {turfs.map((turf) => (
                <div
                  key={turf.id}
                  className="turf-card bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-500 w-full sm:max-w-5xl lg:max-w-8xl xl:max-w-9xl mx-auto"
                >
                  <div className="relative">
                    <Slider {...settings} className="slider-container">
                      {turf.media.map((item, index) => (
                        <div key={index} className="w-full slider-img">
                          {item.type === "video" ? (
                            <video
                              src={item.url}
                              controls
                              autoPlay
                              loop
                              muted
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={item.url}
                              alt={`Media ${index + 1} of ${turf.name}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </Slider>
                  </div>

                  <div className="p-2 sm:p-4">
  <div className="text-center text-white mb-2">
    <h6 className="turf-name text-sm sm:text-base md:text-lg font-semibold">
      {turf.name}
    </h6>
    <p className="turf-location text-sm sm:text-base">{turf.location.city}</p>
  </div>

  {/* Flexbox layout for rating and address to align them closer */}
  <div className="flex justify-between items-center mb-2">
    <div className="flex items-center space-x-1">
      <span className="text-yellow-400 text-sm sm:text-base">
        {"★".repeat(Math.round(turf.rating))}
      </span>
      <span className="text-gray-400 text-xs sm:text-sm">
        ({turf.rating})
      </span>
    </div>
    <p className="text-gray-400 text-xs sm:text-sm text-right truncate ml-2">
      {turf.location.address}
    </p>
  </div>

  <button
    onClick={(e) => {
      e.stopPropagation();
      handleBookNow(turf.id);
    }}
    className="book-btn w-full bg-red-600 text-white py-1 sm:py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors"
  >
    Book Now
  </button>
</div>


                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TurfList;
