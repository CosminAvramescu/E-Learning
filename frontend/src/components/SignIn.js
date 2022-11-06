import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import { useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { Navigate, NavigationType, useLocation } from "react-router-dom";

const theme = createTheme();

function SignIn() {
  const email = useState("");

  const [validate, setValidate] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies([
    "userId",
    "email",
    "role",
  ]);

  const validateLogIn = () => {
    let isValid = true;

    let validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    axios
      .post(
        "http://localhost:8082/signIn",
        {
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
        if (response.status === 200) {
          console.log("Response: " + response.data.jwt);
          let expireDate = new Date();
          const expireDays = 2;
          expireDate.setTime(
            expireDate.getTime() + expireDays * 24 * 60 * 60 * 1000
          );

          expireDate = parseFloat(expireDate);

          const decoded_jwt = jwt_decode(response.data.jwt);

          setCookie("userId", decoded_jwt.userId, {
            expires: expireDate,
            path: "/",
          });
          setCookie("email", decoded_jwt.email, {
            expires: expireDate,
            path: "/",
          });
          setCookie("role", decoded_jwt.role, {
            expires: expireDate,
            path: "/",
          });
          setCookie("firstName", decoded_jwt.firstName, {
            expires: expireDate,
            path: "/",
          });
          setCookie("lastName", decoded_jwt.lastName, {
            expires: expireDate,
            path: "/",
          });

          navigate("/Home");
        }
      })
      .catch(function (error) {
        console.log("Error in Sign In: " + error);
        if (error.response.status === 404) {
          alert("No user found with given details.");
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.deutsche-bank.de/dam/deutschebank/de/shared/db-og-image-default.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                className={`form-control`}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                minLength="5"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link variant="body2" href="/ForgotPassword">
                    {"Forgot password?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" href="/SignUp">
                    {"Create new account"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
