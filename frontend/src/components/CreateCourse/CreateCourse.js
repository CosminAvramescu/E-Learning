import React from "react";
import { TextField } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./CreateCourse.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Cookies, useCookies } from "react-cookie";

function CreateCourse() {
  const [category, setCategory] = React.useState("");

  const [cookies, setCookie, removeCookie] = useCookies([
    "userId",
    "email",
    "role",
  ]);

  const userId = cookies.userId;

  const handleCreateButton = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "http://localhost:8082/course/add-course/" + userId + "/" + category,
      {
        courseName: document.getElementById("course-name").value,
        courseDescription: document.getElementById("course-description").value,
      }
    );
    console.log(
      "http://localhost:8082/course/add-course/" + userId + "/" + category
    );
    renderCourse(response);
  };

  const renderCourse = (response) => {
    window.location.replace("http://localhost:3000/course/courseid=" + response.data.id);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div id={"wrapper-div"}>
      <h1 id={'title'}>
        Create Course
      </h1>
      <Card variant="outlined" id={'card'}>
        <CardContent id={'card-content'}>
          <form>
            <div id={"name-div"}>
              <TextField
                fullWidth
                label="Course Name"
                id="course-name"
                multiline
                maxRows={5}
              />
            </div>
            <div id={"description-div"}>
              <TextField
                fullWidth
                label="Course Description"
                id="course-description"
                multiline
                maxRows={5}
              />
            </div>
            <div id={"dropdown-div"}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value={"OOP"}>OOP</MenuItem>
                  <MenuItem value={"Security"}>Security</MenuItem>
                  <MenuItem value={"DevOps"}>DevOps</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div id={"button-div"}>
              <Button
                  id={"create-button"}
                  onClick={handleCreateButton}
                  type="submit"
                  variant="contained"
                  color="primary"
              >
                Create Course
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateCourse;
