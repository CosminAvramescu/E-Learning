import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
// import * as React from "@types/react";
import axios from "axios";
import {useState, useEffect} from "react";
 
function UpdatePassword() {
    const [dataisLoaded, setDataisLoaded] = useState(false);
    const [codeFromApi, setCodeFromApi] = useState("initialString");
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const navigate = useNavigate()
 
    const handleSubmit = (event) => {
 
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        axios.put('http://localhost:8082/user/updatePassword', {
 
            email: params.email,
            parola: formData.get('password1')
 
        }, {    
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    navigate("/")
                }
            })
            .catch(function (error) {
                console.log(error);
                alert(error.status + " " + error.message);
            });
    }
    const validateAccess = async () => {
 
        return await axios.get("http://localhost:8080/users/getPassResetCode")
            .then(function (response) {
                if (response.status === 200) {
 
                    setCodeFromApi(response.data.code);
                } else {
                    alert(response.status + " " + response.message);
                }
 
            })
            .catch(function (error) {
                console.log(error);
                alert(error.status + " " + error.message);
            })
    }
 
    useEffect(() => {
        if (codeFromApi === 'initialString')
            validateAccess()
    })
    if (codeFromApi === 'initialString')
        return <h1>Loading...</h1>
    else if (codeFromApi === params.code)
        return (
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                 <Grid
                item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://colorlib.com/cdn-cgi/image/width=1200,height=800,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/sites/2/skin-care-WordPress-themes.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',}} ></Grid>
 
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Resetare parola
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password1"
                                label="Password"
                                type="password"
                                id="password"
                                minLength="5"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password2"
                                label="Password"
                                type="password"
                                id="password"
                                minLength="5"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Resează parola
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
 
        );
    else return <h1>Not authorized</h1>
}
 
export default UpdatePassword;