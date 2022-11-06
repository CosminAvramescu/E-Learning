import axios from "axios";

const CHOICE_BASE_REST_API_URL = "http://localhost:8082/api/v1/choices";

class ChoiceService {
  getAllChoices() {
    return axios.get(CHOICE_BASE_REST_API_URL);
  }

  createChoice(choice) {
    return axios.post(CHOICE_BASE_REST_API_URL, choice);
  }

  getChoiceById(choiceId) {
    return axios.get(CHOICE_BASE_REST_API_URL, +"/" + choiceId);
  }

  updateChoice(choiceId, choice) {
    return axios.put(CHOICE_BASE_REST_API_URL + "/" + choiceId, choice);
  }

  deleteChoice(choiceId) {
    return axios.delete(CHOICE_BASE_REST_API_URL + "/" + choiceId);
  }
}

export default new ChoiceService();
