import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-32 w-32 border-4 border-indigo-500 border-t-transparent"></div>
    </div>
  );
};

export default Loader;
