import axios from "axios";

const BASE_URL = "http://localhost:9000/api/v1/turfs";

class TurfService {
  getTurfs() {
    return axios.get(BASE_URL);
  }
  getTurf(turfId){
    return axios.get(`${BASE_URL}/${turfId}`);
  }
}

export default new TurfService();
