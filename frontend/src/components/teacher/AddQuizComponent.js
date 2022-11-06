import React, { useState, useEffect } from "react";
import QuizService from "../../services/QuizService";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddQuizComponent = () => {
  const [timeLimit, setTimelimit] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isVisible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((value) => !value);
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateQuiz = (e) => {
    e.preventDefault();
    const quizEntity = { timeLimit, deadline, isVisible };

    QuizService.createQuiz(quizEntity)
      .then((response) => {
        console.log("response din save quiz" + JSON.stringify(response.data));
        axios.put(
          "http://localhost:8082/course/quizzes/add/" +
            id +
            "/" +
            response.data.id
        );
        navigate(`/course/${id}/quizzes`);
        console.log("this is the course id: " + id);
        console.log("this is the quiz id: " + response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    QuizService.getQuizById(id)
      .then((response) => {
        console.log(response.data);
        setTimelimit(response.data.timeLimit);
        setDeadline(response.data.deadline);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <br />
      <br />
      <div>
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center"> Add Quiz </h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Quiz timeLimit: </label>
                  <input
                    type="text"
                    placeholder="Enter quiz timelimit (minutes)"
                    name="timeLimit"
                    className="form-control"
                    value={timeLimit}
                    onChange={(e) => setTimelimit(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Quiz deadline: </label>
                  <input
                    type="text"
                    placeholder="Enter quiz deadline (date)"
                    name="deadline"
                    className="form-control"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> isVisible: </label>
                </div>
                <input
                  type="checkbox"
                  isCorrect={isVisible}
                  onChange={toggleVisible}
                />

                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateQuiz(e)}
                >
                  Save Quiz
                </button>
                <Link to="/quizzes" className="btn btn-danger">
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

export default AddQuizComponent;
