import { Link } from "react-router-dom";
import Form from "./Form";
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
 
const ForgotPassword = () => {
 
    const [email, setEmail] = useState('');
    const [validate, setValidate] = useState({});
 
    const validateforgotPassword = () => {
        let isValid = true;
 
        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true
            }
        });
 
        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })
 
            isValid = false
        }
        return isValid;
    }
 
    const forgotPassword = (e) => {
        e.preventDefault();
 
        const validate = validateforgotPassword();
 
        if (validate) {
 
            const formData = new FormData(e.currentTarget);
 
 
            axios.post('http://localhost:8082/user/sendPassResetMail',{
 
                email:  formData.get('email')
            },{
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
                .then(function (response) {
                    console.log(response);
                    if(response.status === 200) {
                        alert('Reset password link is sent to ' + email);
                        setValidate({});
                        setEmail('');
                    }
 
                })
                .catch(function (error) {
                    console.log(error);
                    alert(formData.get('email') + " not found!");
                });
 
        }
    }
 
 
    return (
        <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                 <Grid
                item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://www.deutsche-bank.de/dam/deutschebank/de/shared/db-og-image-default.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',}} >
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    ></Box>
                    {/* <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar> */}
                        <Typography component="h1" variant="h5" align="center">
                            Am uitat parola
                        </Typography>
 
                        <div className="auth-form-container text-start">
                            <form className="auth-form" method="POST" onSubmit={forgotPassword} autoComplete={'off'}>
                                <div className="email mb-3">
                                <TextField
                                 className={`form-control ${validate.validate && validate.validate.email ? 'is-invalid ' : ''}`}
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Email Address"
                                id="email"
                                minLength="5"
                                value={email}
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                            />
 
                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
                                    </div>
                                </div>
 
                                <div className="text-center">
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Reseteaza parola
                            </Button>                                </div>
                            </form>
 
                            <hr />
                            <div className="auth-option text-center pt-2"><Link className="text-link" to="/SignIn" >Înapoi la pagina de autentificare</Link></div>
                        </div>
 
        </Grid>
        </Grid>
    );
}
 
export default ForgotPassword;