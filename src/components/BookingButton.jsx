import React from 'react';

const BookingButton = ({ handleBooking }) => {
  return (
    <button
      onClick={handleBooking}
      className="w-full bg-red-600 text-white py-3 rounded-lg shadow-md hover:bg-red-700 transition-transform transform hover:scale-105 text-base font-semibold"
    >
      PROCEED TO PAY
    </button>
  );
};

export default BookingButton;
