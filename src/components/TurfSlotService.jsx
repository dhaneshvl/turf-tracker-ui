import axios from "axios";

const BASE_URL = "http://localhost:9000/api/v1/turf-slots";

class TurfSlotService {
  getTurfSlots(turfId,selectedDate){
      const url = `${BASE_URL}/${turfId}?slotDate=${encodeURIComponent(selectedDate)}`;
        return axios.get(url);
  }
}

export default new TurfSlotService();
