import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useParams } from "react-router-dom";
import TurfService from "./TurfService";
import Loader from "./Loader";

const TurfDetails = () => {
  const { turfId } = useParams();
  const navigate = useNavigate();
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const fetchTurfDetails = async () => {
      try {
        const response = await TurfService.getTurf(turfId);
        setTurf(response.data);
      } catch (error) {
        setError("Turf not found!");
        console.error("An error occurred while fetching the turf info: " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchTurfDetails();
  }, [turfId]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!turf) return <p>Turf data not available</p>;

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700">
            <div className="relative">
              <Slider {...settings}>
                {turf.media && turf.media.length > 0 ? (
                  turf.media.map((item, index) => (
                    <div key={index} className="w-full h-64">
                      {item.type === 'video' ? (
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
                  ))
                ) : (
                  <p className="text-white text-center">No media available</p>
                )}
              </Slider>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <h2 className="text-4xl font-bold">{turf.name}</h2>
                  <p className="text-lg">{turf.location.city}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-300 mb-4">Details</h3>
              <p className="text-gray-400 mb-4">{turf.location.address}</p>
              <p className="text-gray-400 mb-4">{turf.description}</p>
              <button
                onClick={() => navigate(`/book/${turfId}`)}
                className="w-full bg-red-600 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors"
              >
                Book Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfDetails;
