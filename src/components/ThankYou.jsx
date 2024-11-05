import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const ThankYouPage = () => {
  const location = useLocation();
  const { paymentId, orderId, totalPrice } = location.state || {}; // Destructure state from navigation

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center py-12 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-full max-w-lg">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-6 mx-auto text-green-400 text-8xl flex justify-center items-center"
        >
          <FaCheckCircle />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-4"
        >
          Thank You!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl mb-6"
        >
          Your booking was successful. Here are the details:
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-700 p-6 rounded-lg mb-8"
        >
          {/* <p className="text-lg mb-2"><strong>Payment ID:</strong> {paymentId}</p> */}
          <p className="text-lg mb-2"><strong>Order ID:</strong> {orderId}</p>
          <p className="text-lg"><strong>Amount Paid:</strong> ₹{totalPrice}</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={() => window.location.href = '/'}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          Back to Home
        </motion.button>
      </div>
    </div>
  );
};

export default ThankYouPage;
