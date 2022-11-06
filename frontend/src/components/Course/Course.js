import React, { useState, useEffect } from "react";
import "./Course.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { CardContent } from "@material-ui/core";
import Button from "react-bootstrap/Button";
import { Grid } from "@mui/material";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";

function Course() {
  const { id } = useParams();
  const [courseId, setCourseId] = useState(
    window.location
      .toString()
      .substring(window.location.toString().indexOf("courseid=") + 9)
  );
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [dataL, setDataL] = useState([]);
  const [quizL, setQuizL] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "userId",
    "email",
    "role",
  ]);
  const renderUploadFile = (event) => {
    event.preventDefault();
    window.location.replace(
      "http://localhost:3000/UploadFile/courseid=" + courseId
    );
  };

  const renderUploadQuiz = (event) => {
    event.preventDefault();
    window.location.replace(
      "http://localhost:3000/course/" + courseId + "/add-quiz"
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/course/files/" + courseId)
      .then((response) => {
        getFiles(response.data);
        setLoading(false);
      });
    getCourseById();
    axios
      .get("http://localhost:8082/course/quizes/" + courseId)
      .then((response) => {
        getQuizes(response.data);
        console.log(response);
        setLoading(false);
      });
  }, []);

  // window.onload= () => {
  //     axios.get(
  //         "http://localhost:8082/course/files/" + courseId
  //     ).then((response) => {
  //         getFiles(response.data)
  //         setLoading(false)
  //     });
  //     getCourseById()
  //     axios.get(
  //         "http://localhost:8082/course/quizes/" + courseId
  //     ).then((response) => {
  //         getQuizes(response.data)
  //         console.log(response)
  //         setLoading(false)
  //     });
  // }

  const getFiles = (data) => {
    let localList = [];
    for (let i = 0; i < data.length; i++) {
      let filename = data[i].fileName;
      localList.push(filename);
    }
    setDataL(localList);
  };

  const getQuizes = (data) => {
    let localList = [];
    for (let i = 0; i < data.length; i++) {
      let id = data[i].id;
      localList.push(id);
    }
    setQuizL(localList);
  };

  const renderFiles = (file) => {
    return (
      <div className={"files"}>
        <Button onClick={() => downloadFile(file)}>{file}</Button>
      </div>
    );
  };

  const renderQuizes = (quiz) => {
    let id = "Quiz " + quiz;
    let path = "/quiz/" + quiz;
    console.log(path);
    return (
      <div className={"quizes"}>
        <Link to={path} className={"btn btn-primary"}>
          {id}
        </Link>
      </div>
    );
  };

  const downloadFile = async (filename) => {
    console.log(filename);
    const response = await axios.get(
      "http://localhost:8082/course/file/download-file/" + filename
    );
    console.log(response);
  };

  const getCourseById = async () => {
    const response = await axios.get(
      "http://localhost:8082/course/" + courseId
    );
    setCourseName(response.data.courseName);
    setCourseDescription(response.data.courseDescription);
    console.log(response);
  };

  if (cookies.role === "student" && !loading) {
    return (
      <div id={"wrapper-div"}>
        <header>
          <h1>{courseName}</h1>
          <h5>{courseDescription}</h5>
        </header>
        <Card variant="outlined" id={"card"}>
          <CardContent id={"card-content"}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6} id={"materials-list"}>
                <div>
                  <div className={"files"}>
                    <h1>Materials</h1>
                  </div>

                  {dataL.map(renderFiles)}
                </div>
              </Grid>
              <Grid item xs={6} id={"quizzes"}>
                <div>
                  <h1>Quiz</h1>
                </div>
                <Link to={`/course/${id}/quizzes`} className="btn btn-success">
                  see course quizzes
                </Link>
                {/* {quizL.map(renderQuizes)} */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <footer>
          <Link
            to={"sharedSpace/sid=" + courseId}
            id={"shared-space"}
            className={"btn btn-primary"}
          >
            Go to Shared Student Space
          </Link>
        </footer>
        <Button onClick={() => navigate("/")}>Home</Button>
      </div>
    );
  } else if (cookies.role === "teacher" && !loading) {
    return (
      <div id={"wrapper-div"}>
        <Card variant="outlined" id={"card"}>
          <CardContent id={"card-content"}>
            <form>
              <header>
                <h1>{courseName}</h1>
                <h5>{courseDescription}</h5>
              </header>
              <div id={"uploadQuiz-div"}>
                <Button
                  id={"uploadQuiz-button"}
                  onClick={renderUploadQuiz}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Upload Quiz
                </Button>
              </div>
              <div id={"uploadFile-div"}>
                <Button
                  id={"uploadFile-button"}
                  onClick={renderUploadFile}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Upload Files
                </Button>
              </div>
            </form>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6} id={"materials-list"}>
                <div>
                  <div className={"files"}>
                    <h1>Materials</h1>
                  </div>

                  {dataL.map(renderFiles)}
                </div>
              </Grid>
              <Grid item xs={6} id={"quizzes"}>
                <div>
                  <h1>Quiz</h1>
                  <Link
                    to={`/course/${id}/quizzes`}
                    className="btn btn-success"
                  >
                    see course quizzes
                  </Link>
                </div>
                {quizL.map(renderQuizes)}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Course;
