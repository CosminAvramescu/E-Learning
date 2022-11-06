import React, { Component, useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import "../css/uifont.css";
import "../css/props.css";
import "../css/App.css";

import "../css/grid-home.css";

import axios from "axios";

// card
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { NavLink } from "react-router-dom";
import { render } from "@testing-library/react";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import { Add, Favorite, Save } from "@mui/icons-material";
import Searchbar from "./Searchbar";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Cookies, useCookies } from "react-cookie";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(course, quiz, grade) {
//   return { course, quiz, grade};
// }

const rows = [];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
}));

function PersonalPage() {
  const [grade, setGradeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies([
    "userId",
    "email",
    "role",
  ]);
  const [studentId, setStudentId] = useState(cookies.userId);
  const [id, setId] = useState(cookies.id);

  useEffect(() => {
    axios
      .get("http://localhost:8082/grade/allGrades/" + studentId)
      .then((response) => {
        let newGradeList = [];
        for (var i = 0; i < response.data.length; i++) {
          newGradeList.push({
            courseName: response.data[i].courseName,
            grade: response.data[i].grade,
            quizId: response.data[i].quizId,
          });
        }
        setGradeDetails(newGradeList);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="main-container">
      <div className="search-bar">
        <Searchbar />
      </div>
      <div className="side-bar">
        <Sidebar />
      </div>
      <div className="content-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Course </StyledTableCell>
                <StyledTableCell align="right">Quiz</StyledTableCell>
                <StyledTableCell align="right">Grade</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grade.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.courseName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.quizId}</StyledTableCell>
                  <StyledTableCell align="right">{row.grade}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="content-container">
          <div className="discover-container">{console.log(grade)}</div>
        </div>
      </div>
      <div className="footer">2022: E-learning App</div>
    </div>
  );
}

export default PersonalPage;
