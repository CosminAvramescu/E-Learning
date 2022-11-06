import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Form from "./Form";
import { useState } from "react";

const theme = createTheme();

function SignUp() {
  const [validate, setValidate] = useState(true);
  const [email, setEmail] = useState("");

  const validateLogIn = () => {
    // let isValid = true;

    // let validator = Form.validator({
    //     email: {
    //         value: email,
    //         isRequired: true,
    //         isEmail: true
    //     }
    // });

    // if (validator !== null) {
    //     setValidate({
    //         validate: validator.errors
    //     })

    //     isValid = false
    // }
    // return isValid;
    // let regex = /^[a-zA-Z]{5,30}@.*\.[a-zA-Z]{2,3}$/;
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    setValidate(regex.test(email));
    console.log(validate);
  };

  const emailRef = useRef();
  const navigate = useNavigate();
  let eroareMail = "";
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    let errors = false;
    if (!regex.test(formData.get("email"))) {
      alert("Adresa de email introdusă nu este validă!");
      errors = true;
    }
    if (!formData.get("password").match("^[a-zA-Z0-9*!@]{3,30}$")) {
      alert("Parola introdusă nu este validă!");
      errors = true;
    }
    if (!formData.get("firstName").match("^[a-zA-Z ]{3,30}$")) {
      alert("Numele introdus nu este valid! ");
      errors = true;
    }
    if (errors) return;

    axios
      .post(
        "http://localhost:8082/user/signUp",
        {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),

          //   data_nasterii: formData.get('birthDate'),
          email: formData.get("email"),
          password: formData.get("password"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          navigate("/SignIn");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("Exista deja un utilizator cu adresa " + formData.get("email"));
      });
  };

  const [value, setValue] = React.useState(new Date("2000-05-30T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  //error={this.nameErrorBool()}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  //inputProps={{ inputMode: 'alphabetic'}}
                  // helperText = "Numele nu poate contine cifre"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  //error={this.nameErrorBool()}
                  autoComplete="given-name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  // className={`form-control `}
                  ref={emailRef}
                  required
                  fullWidth
                  id="email"
                  label="Email Adress"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                    validateLogIn();
                  }}
                  {...eroareMail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" href="/SignIn">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
