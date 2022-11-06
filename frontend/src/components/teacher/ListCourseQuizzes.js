import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

function ListQuizComponent() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "userId",
    "email",
    "role",
  ]);
  const [quizzes, setQuizzes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAllQuizzesByCourseId(id);
    console.log(`this is the quiz id: ${id}`);
  }, [id]);

  const getAllQuizzesByCourseId = () => {
    axios
      .get("http://localhost:8082/course/quizzes/" + id) //pt ca cu QuizService.getAllQuestionsByQuiz(id) nu mergea
      .then((response) => {
        setQuizzes(response.data);
        console.log("response: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (cookies.role === "student") {
    return (
      <div className="container">
        <h2 className="text-center"> Course No. {id} Quizzes </h2>
        <Link to={`/course/${id}`} className="btn btn-danger">
          Take me back to course no. {id}
        </Link>
        <table className="table table-bordered table-striped">
          <thead style={{ textAlign: "center" }}>
            <th> Quiz Id </th>
            <th> Quiz noOfQuestions</th>
            <th> Quiz timeLimit </th>
            <th> Quiz deadline</th>
            <th> Quiz isVisible </th>
            <th> Test </th>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr style={{ textAlign: "center" }} key={quiz.id}>
                <td> {quiz.id} </td>
                <td> {quiz.noOfQuestions} </td>
                <td> {quiz.timeLimit} </td>
                <td> {quiz.deadline} </td>
                <td> {JSON.stringify(quiz.isVisible)} </td>
                <td>
                  <Link
                    to={`/quiz/${quiz.id}/take`}
                    className="btn btn-warning"
                  >
                    Take quiz
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="text-center"> Course No. {id} Quizzes </h2>
      <Link to={`/course/${id}/add-quiz`} className="btn btn-primary">
        Add Quizz to course no.{id}
      </Link>
      <Link to={`/course/${id}`} className="btn btn-danger">
        Take me back to course no. {id}
      </Link>
      <table className="table table-bordered table-striped">
        <thead style={{ textAlign: "center" }}>
          <th> Quiz Id </th>
          <th> Quiz noOfQuestions</th>
          <th> Quiz timeLimit </th>
          <th> Quiz deadline</th>
          <th> Quiz isVisible </th>
          <th> Questions </th>
          <th> Test </th>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr style={{ textAlign: "center" }} key={quiz.id}>
              <td> {quiz.id} </td>
              <td> {quiz.noOfQuestions} </td>
              <td> {quiz.timeLimit} </td>
              <td> {quiz.deadline} </td>
              <td> {JSON.stringify(quiz.isVisible)} </td>
              <td>
                <Link
                  to={`/quiz/${quiz.id}/questions`}
                  className="btn btn-success"
                >
                  List Quiz Questions
                </Link>
              </td>
              <td>
                <Link to={`/quiz/${quiz.id}/take`} className="btn btn-warning">
                  test quiz
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListQuizComponent;
