export const formatDateToDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
    
  export const calculateTotalPrice = (selectedSlots) => {
    if (!Array.isArray(selectedSlots) || selectedSlots.length === 0) {
      return 0;
    }
  
    return selectedSlots.reduce((total, slot) => {
      return total + (slot.price || 0);
    }, 0);
  };
  