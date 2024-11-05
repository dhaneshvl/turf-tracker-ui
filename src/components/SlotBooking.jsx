import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TurfSlotService from './TurfSlotService';
import Loader from './Loader';
import DateSelector from './DateSelector';
import SlotSelector from './SlotSelector';
import TotalPrice from './TotalPrice';
import BookingButton from './BookingButton';
import { formatDateToDDMMYYYY, calculateTotalPrice } from './utils';
import { handleBooking } from './SlotBookingService';

const SlotBooking = () => {
  const navigate = useNavigate();
  const { turfId } = useParams();
  const [turfSlots, setTurfSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    const fetchTurfSlots = async () => {
      try {
        const formattedDate = formatDateToDDMMYYYY(selectedDate);
        const response = await TurfSlotService.getTurfSlots(turfId, formattedDate);
        setTurfSlots(response.data);
      } catch (error) {
        setError("Failed to load turf slots");
        console.error("An error occurred while fetching turf slots: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurfSlots();
  }, [selectedDate, turfId]);

  const handleSlotSelect = (slot) => {
    const isSelected = selectedSlots.some(s => s.slot === slot.slot);
    
    if (isSelected) {
      setSelectedSlots(prev => prev.filter(s => s.slot !== slot.slot));
    } else {
      setSelectedSlots(prev => {
        const sortedSlots = [...prev, slot].sort((a, b) => a.sortOrder - b.sortOrder);
        return sortedSlots;
      });
    }
  };

  const totalPrice = calculateTotalPrice(selectedSlots);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-black text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl md:max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Book a Slot at Turf</h1>
        <div className="bg-gray-800 shadow-md rounded-lg border border-gray-600 p-6 sm:p-8">
          <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <SlotSelector turfSlots={turfSlots} selectedSlots={selectedSlots} handleSlotSelect={handleSlotSelect} />
          <TotalPrice selectedSlots={selectedSlots} turfSlots={turfSlots} />
          <BookingButton handleBooking={() => handleBooking(turfId, totalPrice, selectedSlots,formatDateToDDMMYYYY(selectedDate), navigate)} />
        </div>
      </div>
    </div>
  );
};

export default SlotBooking;
