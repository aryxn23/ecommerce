import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
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

export default function SignIn() {

    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const { userEmail, setUserEmail } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const email = data.get('email');
        const password = data.get('password');

        const response = await fetch(`${process.env.REACT_APP_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (response.ok) {
            // console.log(response);
            setUserEmail(email);
            setLoggedIn(true);
            setRedirect(true);
        } else {
            alert('wrong credentials');
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                // const response = await fetch(`http://localhost:4000/user?email=${userEmail}`, {
                const response = await fetch(`${process.env.REACT_APP_URL}/user?email=${userEmail}`, {

                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.user);
                    setUser(data.user);
                } else {
                    alert('Error occurred while fetching data');
                }
            } catch (error) {
                alert('Error occurred while fetching data');
            }
        }

        if (loggedIn) {
            fetchData();
        }
    }, [loggedIn, userEmail, setUser]);

    if (redirect) {
        return <Navigate to={"/"} />
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
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
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
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
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}