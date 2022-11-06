import React, { useState, useEffect } from "react";
import QuestionService from "../../services/QuestionService";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddQuestionComponent = () => {
  const [question, setQuestion] = useState("");
  const [score, setScore] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const updateQuestion = (e) => {
    e.preventDefault();
    const questionEntity = { question, score };

      QuestionService.updateQuestion(id,questionEntity)
      .then((response) => {
        console.log(response.data);
        navigate(`/questions`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log('page is fully loaded');
    QuestionService.getQuestionById(id)
      .then((response) => {
        setQuestion(response.data.question);
        setScore(response.data.score);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <br />
      <br />
      <div >
        <div className="row">
        
          <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center"> Update Question </h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Question: </label>
                  <input
                    type="text"
                    placeholder="Enter question name"
                    name="question"
                    className="form-control"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Score: </label>
                  <input
                    type="text"
                    placeholder="Enter score"
                    name="lastName"
                    className="form-control"
                    id="score"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                  ></input>
            
                </div> 
                <button
                  className="btn btn-success"
                  onClick={(e) => updateQuestion(e)}
                >
                  Save Question
                </button>
                 <Link to={`/quiz/${id}/questions`} className="btn btn-danger">
                  Cancel
                </Link> 
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionComponent;
