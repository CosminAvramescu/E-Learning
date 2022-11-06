import Start from "./Start";
import Quiz from "./Quiz";
import Result from "./Result";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function QuizTaker() {
  const [quizs, setQuizs] = useState([]);
  const [question, setQuesion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [marks, setMarks] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const { id } = useParams();
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/v1/quizzes/questions/" + id)
      .then((response) => {
        setQuizs(response.data);
        console.log(response.data);
        console.log("the wanted id is: " + id);
      });
  }, []);

  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuesion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  };

  const checkAnswer = (event, selected) => {
    setQuizScore(quizScore + question.score);
    if (!selectedAnswer) {
      setSelectedAnswer(selected);
      //to highlight correct answer:
      for (let i = 0; i < question.noOfChoices; i++) {
        if (question.choiceList[i].isCorrect === true) {
          setCorrectAnswer(question.choiceList[i].answer);
        }
      }
      if (selected.isCorrect === true) {
        setCorrectAnswer(selected.answer);
        event.target.classList.add("bg-success");
        console.log("THIS IS THE SCORE FOR THE QUESTION: " + question.score);
        setMarks(marks + question.score);
      } else {
        event.target.classList.add("bg-danger");
      }
    }
  };

  const nextQuestion = () => {
    setCorrectAnswer("");
    setSelectedAnswer("");
    const wrongBtn = document.querySelector("button.bg-danger");
    wrongBtn?.classList.remove("bg-danger");
    const rightBtn = document.querySelector("button.bg-success");
    rightBtn?.classList.remove("bg-success");
    setQuestionIndex(questionIndex + 1);
  };

  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  };

  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer("");
    setSelectedAnswer("");
    setQuestionIndex(0);
    setMarks(0);
    setQuizScore(0);
    const wrongBtn = document.querySelector("button.bg-danger");
    wrongBtn?.classList.remove("bg-danger");
    const rightBtn = document.querySelector("button.bg-success");
    rightBtn?.classList.remove("bg-success");
  };

  return (
    <>
      <Start startQuiz={startQuiz} showStart={showStart} />
      <Quiz
        showQuiz={showQuiz}
        question={question}
        quizs={quizs}
        checkAnswer={checkAnswer}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
        questionIndex={questionIndex}
        nextQuestion={nextQuestion}
        showTheResult={showTheResult}
      />
      <Result
        showResult={showResult}
        quizs={quizs}
        marks={marks}
        quizScore={quizScore}
        startOver={startOver}
      />
    </>
  );
}
export default QuizTaker;
