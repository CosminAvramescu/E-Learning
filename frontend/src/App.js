import logo from "./logo.svg";
import "./css/App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import AuthorizeTest from "./components/AuthorizePageTest";
import UpdatePassword from "./components/UpdatePassword";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom/dist";
import React, { useEffect, useState } from "react";
import Homepage from "./components/Homepage";
// import Discover from "./components/Discover";
import CoursePage from "./components/CoursePage";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import DragAndDropFile from "./components/UploadFile/DragAndDropFile";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import Course from "./components/Course/Course";
import SharedSpace from "./components/SharedSpace/SharedSpace";
import MyCourses from "./components/MyCourses";

import AddQuizComponent from "./components/teacher/AddQuizComponent";
import AddQuestionComponent from "./components/teacher/AddQuestionComponent";
import AddChoiceComponent from "./components/teacher/AddChoiceComponent";
import UpdateQuestionComponent from "./components/teacher/UpdateQuestionComponent";
import UpdateChoiceComponent from "./components/teacher/UpdateChoiceComponent";
import UpdateQuizComponent from "./components/teacher/UpdateQuizComponent";
import ListQuizComponent from "./components/teacher/ListQuizComponent";
import ListQuestionComponent from "./components/teacher/ListQuestionComponent";
import ListChoiceComponent from "./components/teacher/ListChoiceComponent";
import ListQuizQuestions from "./components/teacher/ListQuizQuestions";
import ListQuestionChoices from "./components/teacher/ListQuestionChoices";
import ListCourseQuizzes from "./components/teacher/ListCourseQuizzes";
import ListCourseQuizzesStudent from "./components/teacher/ListCourseQuizzesStudent";

import QuizTaker from "./components/QuizTaker";
import PersonalPage from "./components/PersonalPage";
import Footer from "./Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Daca nu esti logat, ar trebui ca la ruta "Home" sa ai pagina de SignUp */}
        {/* Daca esti logat, ar trebui ca la ruta "Home" sa ai pagina e ..... */}
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Homepage />} />
        {/* <Route path="/Discover" element={<Discover />} /> */}

        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        <Route path="/My-Courses" element={<MyCourses />} />
        <Route path="/Personal-Page" element={<PersonalPage />} />

        <Route path="/UploadFile/courseid=:id" element={<DragAndDropFile />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
        <Route path="/course/courseid=:id" element={<Course />} />
        <Route
          path="/course/courseid=:id/sharedSpace/sid=:id"
          element={<SharedSpace />}
        />

        <Route exact path="/" element={<ListQuizComponent />}></Route>
        <Route path="/quizzes" element={<ListQuizComponent />}></Route>
        <Route path="/add-quiz" element={<AddQuizComponent />}></Route>
        <Route path="/edit-quiz/:id" element={<UpdateQuizComponent />}></Route>
        <Route exact path="/" element={<ListQuestionComponent />}></Route>
        <Route path="/questions" element={<ListQuestionComponent />}></Route>
        <Route
          path="/quiz/:id/add-question"
          element={<AddQuestionComponent />}
        ></Route>
        <Route
          path="/course/:id/add-quiz"
          element={<AddQuizComponent />}
        ></Route>
        <Route path="/add-question" element={<AddQuestionComponent />}></Route>
        <Route
          path="/edit-question/:id"
          element={<UpdateQuestionComponent />}
        ></Route>
        <Route exact path="/" element={<ListQuestionComponent />}></Route>
        <Route path="/choices" element={<ListChoiceComponent />}></Route>
        <Route
          path="/question/:id/add-choice"
          element={<AddChoiceComponent />}
        ></Route>
        <Route path="/add-choice" element={<AddChoiceComponent />}></Route>
        <Route
          path="/edit-choice/:id"
          element={<UpdateChoiceComponent />}
        ></Route>
        <Route
          path="/quiz/:id/questions"
          element={<ListQuizQuestions />}
        ></Route>
        <Route
          path="/course/:id/quizzes"
          element={<ListCourseQuizzes />}
        ></Route>
        {/* <Route
          path="/course/:id/quizzes/student"
          element={<ListCourseQuizzesStudent />}
        ></Route> */}
        <Route
          forceRefresh={true}
          path="/question/:id/choices"
          element={<ListQuestionChoices />}
        ></Route>

        <Route
          forceRefresh={true}
          path="/quiz/:id/take"
          element={<QuizTaker />}
        ></Route>
      </Routes>
      <div className="footer">
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
