import React from 'react';

const TotalPrice = ({ selectedSlots, turfSlots }) => {
  const calculateTotalPrice = () => {
    return selectedSlots.reduce((total, slot) => total + (turfSlots.find((s) => s.slot === slot.slot)?.price || 0), 0);
  };

  return (
    <>
      {selectedSlots.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Total Price</h2>
          <p className="text-xl font-bold">₹{calculateTotalPrice()}</p>
        </div>
      )}
    </>
  );
};

export default TotalPrice;
