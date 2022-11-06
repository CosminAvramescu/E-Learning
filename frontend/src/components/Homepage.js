import React, { Component, useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import "../css/uifont.css";
import "../css/props.css";
import "../css/App.css";

import "../css/grid-home.css";
import Course1 from "../ui/course-1.png";
import Course2 from "../ui/course-2.jpg";
import Course3 from "../ui/course-3.jpg";
import Course4 from "../ui/course-4.jpg";
import axios from "axios";

// card
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Navigate, NavLink } from "react-router-dom";
import { render } from "@testing-library/react";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import { Add, Favorite, Save } from "@mui/icons-material";
import Searchbar from "./Searchbar";
import { IconButton, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Cookies, useCookies } from "react-cookie";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

function Homepage() {
  const [courseDetails, setCourseDetails] = useState([]);
  const [searchedCourseDetails, setSearchedCourseDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "userId",
    "email",
    "role",
  ]);

  function searchValuesFromSearchbar(value) {
    let newSearchedCourseDetails = [];
    for (let i = 0; i < courseDetails.length; i++) {
      if (courseDetails[i].title.toLowerCase().includes(value)) {
        newSearchedCourseDetails.push(courseDetails[i]);
      }
    }
    setSearchedCourseDetails(newSearchedCourseDetails);
  }

  const saveMyCourse = (courseId) => {
    axios
      .post(
        "http://localhost:8082/course/saveMyCourse/" +
          cookies.userId +
          "/" +
          courseId
      )
      .then((response) => {
        navigate("/My-Courses");
        console.log("saveMyCourse response: " + response);
      });
  };

  const renderCard = (card, index) => {
    // console.log("Individual card details from render card: " + card);
    if (cookies.role === "student") {
      return (
        <NavLink
          to={"/course/courseid=" + card.id}
          className="course rel card-wrapper"
          key={"course-" + card.id}
        >
          <Card
            sx={{ maxWidth: 345 }}
            onClick={() => {
              navigate("/course/courseid=" + card.id);
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={Course2}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                style={{ zIndex: 5 }}
                aria-label="add to favorites"
                className="favoritesButton"
                onClick={() => saveMyCourse(card.id)}
              >
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </NavLink>
      );
    } else {
      return (
        <NavLink
          to={"/course/courseid=" + card.id}
          className="course rel card-wrapper"
          key={"course-" + card.id}
        >
          <Card
            sx={{ maxWidth: 345 }}
            onClick={() => {
              navigate("/course/courseid=" + card.id);
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={Course2}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        </NavLink>
      );
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8082/course/getAllCourses").then((response) => {
      // window.location.reload(false);
      let newCourseList = [];
      // console.log(
      //   "Respone from getAllCourses: " + JSON.stringify(response.data)
      // );
      for (var i = 0; i < response.data.length; i++) {
        newCourseList.push({
          id: response.data[i].id,
          image: "https://picsum.photos/200/300",
          title: response.data[i].courseName,
          description: response.data[i].courseDescription,
          firstName: response.data[i].user.firstName,
          lastName: response.data[i].user.lastName,
          email: response.data[i].user.email,
        });
      }
      setCourseDetails(newCourseList);
      setSearchedCourseDetails(newCourseList);
      setLoading(false);
      // console.log("Card details list: " + courseDetails);
    });
  }, []);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  if (cookies.role === "student") {
    return (
      <div className="main-container">
        <div className="search-bar">
          {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
  
                </Search> */}
          <TextField
            className="inputRounded"
            variant="outlined"
            fullWidth
            placeholder="Search by name.."
            margin="none"
            onChange={(event) =>
              searchValuesFromSearchbar(event.currentTarget.value.toLowerCase())
            }
          />
        </div>
        <div className="side-bar">
          <Sidebar />
        </div>
        <div className="content-container">
          <div className="discover-container">
            {searchedCourseDetails.map(renderCard)}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main-container">
        <div className="side-bar">
          <Sidebar />
        </div>
        <div className="search-bar">
          {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
  
                </Search> */}
          <TextField
            className="inputRounded"
            variant="outlined"
            fullWidth
            placeholder="Search by name.."
            margin="none"
            onChange={(event) =>
              searchValuesFromSearchbar(event.currentTarget.value.toLowerCase())
            }
          />
        </div>
        <div className="content-container">
          <Button
            variant="outlined"
            startIcon={<AddBoxRoundedIcon />}
            onClick={() => {
              navigate("/createcourse");
            }}
          >
            Add new course
          </Button>
          <div className="discover-container">
            {searchedCourseDetails.map(renderCard)}
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
