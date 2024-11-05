import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Select Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
        maxDate={(() => {
          const date = new Date();
          date.setDate(date.getDate() + 7);
          return date;
        })()}
        dateFormat="MMMM d, yyyy"
        className="w-full py-2 px-3 sm:py-3 sm:px-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900 text-white"
      />
    </div>
  );
};

export default DateSelector;
