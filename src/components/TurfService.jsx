import axios from "axios";

export const API_BASE_URL = __API_BASE_URL__;

const BASE_URL = `${API_BASE_URL}/api/v1/turfs`;

class TurfService {
  getTurfs() {
    return axios.get(BASE_URL);
  }
  getTurf(turfId){
    return axios.get(`${BASE_URL}/${turfId}`);
  }
}

export default new TurfService();
