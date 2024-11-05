const BASE_URL = 'http://localhost:9000/payment';

const initiatePayment = async (turfId, totalPrice, selectedSlots,slotDate) => {
  const slotIds = selectedSlots.map(slot => slot.id).join(",");

  const response = await fetch(`${BASE_URL}/initiate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      turfId: turfId,
      totalAmount: totalPrice,
      selectedSlots: slotIds,
      slotDate: slotDate,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to initiate transaction');
  }

  return response.json();
};

const completePayment = async (paymentDetails) => {
  const response = await fetch(`${BASE_URL}/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentDetails),
  });

  if (!response.ok) {
    throw new Error('Failed to complete payment');
  }

  return response;
};

const declinePayment = async (declineDetails) => {
  const response = await fetch(`${BASE_URL}/declined`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(declineDetails),
  });

  if (!response.ok) {
    throw new Error('Failed to notify backend about payment cancellation');
  }
};

const handleBooking = async (turfId, totalPrice, selectedSlots, slotDate, navigate) => {
  if (!selectedSlots.length) {
    alert('Please select a date and time slot.');
    return;
  }

  try {

    const transactionDetails = await initiatePayment(turfId, totalPrice, selectedSlots,slotDate);

    if (transactionDetails && transactionDetails.order_id) {
      const options = {
        key: transactionDetails.key,
        amount: transactionDetails.amount,
        currency: transactionDetails.currency,
        name: 'Turf Booking',
        description: 'Slot Booking Payment',
        order_id: transactionDetails.order_id,
        handler: async function (response) {
          const paymentDetails = {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            status: 'success',
            message: 'Payment completed successfully.',
          };

          try {
            await completePayment(paymentDetails);
            navigate(`/thank-you`, {
              state: {
                orderId: transactionDetails.internalOrderId,
                totalPrice: totalPrice,
              },
            });
          } catch (error) {
            console.error('Error completing payment:', error);
            alert('Payment failed to complete on backend. Please try again.');
          }
        },
        prefill: {
          name: 'Your Name',
          email: 'youremail@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: async function () {
            // Notify backend of canceled payment
            try {
              const declineDetails = {
                orderId: transactionDetails.order_id,
                internalOrderId: transactionDetails.internalOrderId,
                status: 'failed',
                message: 'User canceled the payment or it was not completed.',
              };

              await declinePayment(declineDetails);
              alert('Payment was not completed. Please try again.');
            } catch (error) {
              console.error('Error notifying backend of payment cancellation:', error);
            }
          },
        },
      };

      // Open Razorpay modal for payment
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert('Failed to initiate transaction. Please try again.');
    }
  } catch (error) {
    console.error('Error initiating transaction:', error);
    alert('Error initiating transaction. Please try again.');
  }
};

export { initiatePayment, completePayment, declinePayment, handleBooking };
