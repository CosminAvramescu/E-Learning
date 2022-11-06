import axios from "axios";

const QUIZ_BASE_REST_API_URL = "http://localhost:8082/api/v1/quizzes";

class QuizService {
  getAllQuizzes() {
    return axios.get(QUIZ_BASE_REST_API_URL);
  }

  getAllQuestionsByQuiz(quizId){
    return axios.get(QUIZ_BASE_REST_API_URL, + "/questions/" + quizId);
  }

  createQuiz(quiz) {
    return axios.post(QUIZ_BASE_REST_API_URL, quiz);
  }
  

  getQuizById(quizId) {
    return axios.get(QUIZ_BASE_REST_API_URL, +"/" + quizId);
  }
  

  incrementNoQuestionsQuiz(quizId){
    axios.put(QUIZ_BASE_REST_API_URL + "/increment/" + quizId);
  }

  addQuestion(quizId, questionId){
    axios.put(QUIZ_BASE_REST_API_URL + "/questions/add/" + quizId + "/" + questionId);
  }

  updateQuiz(quizId, quiz) {
    return axios.put(QUIZ_BASE_REST_API_URL + "/" + quizId, quiz);
  }

  deleteQuiz(quizId) {
    return axios.delete(QUIZ_BASE_REST_API_URL + "/" + quizId);
  }
}

export default new QuizService();
