import React from 'react';
import { FaClock } from 'react-icons/fa';
import '../css/SlotSelector.css'; // Import custom CSS

const SlotSelector = ({ turfSlots, selectedSlots, handleSlotSelect }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Select Time Slot</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {turfSlots.map((slot) => (
          <button
            key={slot.id}
            className={`flex items-center justify-center text-center py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              selectedSlots.some(s => s.slot === slot.slot)
                ? 'bg-indigo-500 text-white'
                : slot.availability
                ? 'bg-gray-700 text-gray-300 hover:bg-indigo-600'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => slot.availability && handleSlotSelect(slot)}
            disabled={!slot.availability}
          >
            <FaClock className="mr-2" />
            {slot.slot} (₹{slot.price})
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotSelector;
