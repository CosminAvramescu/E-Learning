import axios from 'axios'

const QUESTION_BASE_REST_API_URL = 'http://localhost:8082/api/v1/questions';

class QuestionService{

    getAllQuestions(){
        return axios.get(QUESTION_BASE_REST_API_URL);
    }

    getQuestionQuizId(quest){
        return axios.get(QUESTION_BASE_REST_API_URL, quest);
    }
    createQuestion(quest){
        return axios.post(QUESTION_BASE_REST_API_URL, quest);
    }

    getQuestionById(questionId){
        return axios.get(QUESTION_BASE_REST_API_URL, + '/' + questionId);
    }

    addChoice(questionId, choiceId){
        axios.put(QUESTION_BASE_REST_API_URL  + "/choices/add/" + questionId + "/" + choiceId)
    }

    updateQuestion(questionId, question){
        return axios.put(QUESTION_BASE_REST_API_URL + '/' + questionId, question);
    }

    deleteQuestion(questionId){
        return axios.delete(QUESTION_BASE_REST_API_URL + '/' + questionId);
    }
}

export default new QuestionService();