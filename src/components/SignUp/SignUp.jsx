import * as React from 'react';
import { Navigate } from "react-router-dom";
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Email, Password } from '@mui/icons-material';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const fName = data.get("firstName");
        const lName = data.get("lastName");
        const email = data.get('email');
        const password = data.get('password');

        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fName, lName, email, password })
            });

            if (response.status === 201) {
                alert("Registration Successful");
                setRedirect(true);
            } else {
                alert("Registration Failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred during registration");
        }

    }

    if (redirect) {
        return <Navigate to={"/signin"} />
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
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
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}



// import React, { useState } from 'react';
// import { withRouter } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// function SignUp(props) {
//     const [registrationError, setRegistrationError] = useState('');

//     async function handleSubmit(event) {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);

//         const fName = data.get('firstName');
//         const lName = data.get('lastName');
//         const email = data.get('email');
//         const password = data.get('password');

//         try {
//             const response = await fetch('http://localhost:4000/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ fName, lName, email, password }),
//             });

//             if (response.status === 201) {
//                 alert('Registration Successful');
//                 props.history.push('/signin'); // Redirect to "/signin" page
//             } else {
//                 setRegistrationError('Registration Failed');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setRegistrationError('An error occurred during registration');
//         }
//     }

//     const defaultTheme = createTheme();

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                         <LockOutlinedIcon />
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Sign up
//                     </Typography>
//                     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                         {/* Rest of your form code */}
//                         <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                             Sign Up
//                         </Button>
//                     </Box>
//                 </Box>
//             </Container>
//         </ThemeProvider>
//     );
// }

// export default withRouter(SignUp);
