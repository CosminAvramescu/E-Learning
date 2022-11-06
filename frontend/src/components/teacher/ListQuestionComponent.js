import React, { useEffect, useState } from "react";
import { Link , useParams} from "react-router-dom";
import QuestionService from "../../services/QuestionService";

function ListQuestionComponent() {
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    getAllQuestions();
  }, [id]);

  const getAllQuestions = () => {
    QuestionService.getAllQuestions()
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const deleteQuestion = (questionId) => {
    QuestionService.deleteQuestion(questionId)
      .then((response) => {
        getAllQuestions();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> List Questions </h2>
      {/* <Link to="/add-question" className="btn btn-primary">
        {" "}
        Add Question
      </Link> */}
      <table className="table table-bordered table-striped">
        <thead style={{ textAlign: 'center' }}>
          <th> question id </th>
          <th> question name</th>
          <th> question score </th>
          <th> no. of choices </th>
          <th> Actions </th>
        </thead>
        <tbody>
          {questions.map((questionE) => (
            <tr style={{ textAlign: 'center' }} key={questionE.id}>
              <td> {questionE.id} </td>
              <td> {questionE.question} </td>
              <td> {questionE.score} </td>
              <td> {questionE.noOfChoices} </td>
              <td>
              {/* <Link to={`/question/${questionE.id}/choices`} className="btn btn-success" >
                  List Quesiton Choices
                </Link> */}
                 <Link
                  className="btn btn-info"
                  to={`/edit-question/${questionE.id}`}
                >
                  {" "}
                  Update{" "}
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteQuestion(questionE.id)}
                  
                >
                  {" "}
                  Delete
                </button> 
                 <Link
                  to={`/question/${questionE.id}/add-choice`}
                  className="btn btn-primary"
              
                >
                  {" "}
                  Add Choice
                </Link> 
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListQuestionComponent;
