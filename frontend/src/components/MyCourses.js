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

import { NavLink } from "react-router-dom";
import { render } from "@testing-library/react";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import { Add, Favorite, Save } from "@mui/icons-material";
import Searchbar from "./Searchbar";
import { IconButton, TextField } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Cookies, useCookies } from "react-cookie";

function MyCourses() {
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState(1);
  const [searchedCourseDetails, setSearchedCourseDetails] = useState([]);
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
        console.log("saveMyCourse response: " + response);
      });
  };

  const renderCard = (card, index) => {
    // console.log("Individual card details from render card: " + card);
    return (
      <NavLink
        to={"/course/courseid=" + card.id}
        className="course rel card-wrapper"
        key={"course-" + card.id}
      >
        <Card sx={{ maxWidth: 345 }}>
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
        {/* <div
          className="block"
          style={{
            background: "#545454",
          }}
        >
          <div className="user abs aic flex">
            <div className="meta rel">
              <h2 className="s15 name fontb cfff">
                {card.firstName} {card.lastName}
              </h2>
              <h2 className="s13 uname fontn cfff">{card.email}</h2>
            </div>
          </div>

          <div className="dura abs">
            <h2 className="s13 name fontb cfff">{card.description}</h2>
          </div>

          <div className="course-title abs">
            <h2 className="s15 name fontb cfff">{card.title}</h2>
          </div>
        </div> */}
      </NavLink>
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/course/getStudentSavedCourses", {
        headers: {
          userId: cookies.userId,
        },
      })
      .then((response) => {
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
        setLoading(0);
        // console.log("Card details list: " + courseDetails);
      })
      .catch(function (error) {
        console.log("error: " + error.response.status);
        if (error.response.status == 404) {
          setLoading(404);
          return;
        }
      });
  }, []);

  if (loading === 1) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (loading === 404) {
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
          <Searchbar />
        </div>
        <div className="side-bar">
          <Sidebar />
        </div>
        <div className="content-container">
          <div className="discover-container">
            <h1>You didn't subscribed to any courses yet :(</h1>
          </div>
        </div>

        <div className="footer">2022: E-learning App</div>
      </div>
    );
  }

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

      <div className="footer">2022: E-learning App</div>
    </div>
  );
}

export default MyCourses;
