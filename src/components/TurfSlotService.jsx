import axios from "axios";

export const API_BASE_URL = __API_BASE_URL__;

const BASE_URL = `${API_BASE_URL}/api/v1/turf-slots`;

class TurfSlotService {
  getTurfSlots(turfId,selectedDate){
      const url = `${BASE_URL}/${turfId}?slotDate=${encodeURIComponent(selectedDate)}`;
        return axios.get(url);
  }
}

export default new TurfSlotService();
