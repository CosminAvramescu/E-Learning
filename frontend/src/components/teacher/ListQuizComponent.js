import React, { useEffect, useState ,} from "react";
import { Link , useParams} from "react-router-dom";
import QuizService from "../../services/QuizService";



function ListQuizComponent(){
  const [quizzes, setQuizzes] = useState([]);
  const {id} = useParams();
  
  useEffect(() => {
    getAllQuizzes();
  }, []);

  const getAllQuizzes = () => {
    QuizService.getAllQuizzes()
      .then((response) => {
        setQuizzes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteQuiz = (quizId) => {
    QuizService.deleteQuiz(quizId)
      .then((response) => {
        getAllQuizzes();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="container">
      <h2 className="text-center"> List Quizzes </h2>
      <Link to="/add-quiz" className="btn btn-primary">
        {" "}
        Add Quiz
      </Link>
      <table className="table table-bordered table-striped">
        <thead style={{ textAlign: 'center' }}>
          <th> Quiz Id </th>
          <th> Quiz noOfQuestions</th>
          <th> Quiz timeLimit </th>
          <th> Quiz deadline</th>
          <th> Quiz isVisible </th>
          <th> Questions </th> 
          <th> Test </th>
        </thead>
        <tbody>
          {
          quizzes.map(
            quiz => 
            <tr style={{ textAlign: 'center' }} key={quiz.id}>
              <td> {quiz.id} </td>
              <td> {quiz.noOfQuestions} </td>
              <td> {quiz.timeLimit} </td>
              <td> {quiz.deadline} </td>
              <td> {JSON.stringify(quiz.isVisible)} </td>
              <td>
                <Link to={`/quiz/${quiz.id}/questions`} className="btn btn-success">
                  List Quiz Questions
                </Link>
              </td>
              <td>
              <Link to={`/quiz/${quiz.id}/take`} className="btn btn-warning">
                  test quiz
                </Link>
                 <Link className="btn btn-info" to={`/edit-quiz/${quiz.id}`} >Update</Link>
                <button className="btn btn-danger" onClick={() => deleteQuiz(quiz.id)} style={{ marginLeft: "10px" }}>
                  Delete
                </button>  
              </td>
            </tr>
          )
          }
        </tbody>
      </table>
    </div>
  );
};

export default ListQuizComponent;
