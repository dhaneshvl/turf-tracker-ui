import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import TurfService from "./TurfService";
import Loader from "./Loader";

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
  },[]);

  const handleBookNow = (turfId) => {
    navigate(`/turf/${turfId}`);
  };

  return (
    <div className="min-h-screen bg-black p-8">
       {loading ? (
        <Loader />
      ) : (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-white mb-12">
          Explore the Best Turfs Near You
        </h1>
        <div className="space-y-8">
          {turfs.map((turf) => (
            <div
              key={turf.id}
              className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-500"
            >
              <div className="relative">
                <Slider {...settings}>
                  {turf.media.map((item, index) => (
                    <div key={index} className="w-full h-64">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h2 className="text-4xl font-bold">{turf.name}</h2>
                    <p className="text-lg">{turf.location.city}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-400 text-base mb-4">
                  {turf.location.address}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-2xl">
                      {"★".repeat(Math.round(turf.rating))}
                    </span>
                    <span className="ml-2 text-gray-400 text-lg">
                      ({turf.rating})
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookNow(turf.id);
                  }}
                  className="w-full bg-red-600 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                >
                 Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default TurfList;
