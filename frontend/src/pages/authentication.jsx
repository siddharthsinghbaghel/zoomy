// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { AuthContext } from '../contexts/AuthContext';
// import { Snackbar } from '@mui/material';



// // TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

// export default function Authentication() {

    

//     const [username, setUsername] = React.useState();
//     const [password, setPassword] = React.useState();
//     const [name, setName] = React.useState();
//     const [error, setError] = React.useState();
//     const [message, setMessage] = React.useState();


//     const [formState, setFormState] = React.useState(0);

//     const [open, setOpen] = React.useState(false)


//     const { handleRegister, handleLogin } = React.useContext(AuthContext);

//     let handleAuth = async () => {
//         try {
//             if (formState === 0) {

//                 let result = await handleLogin(username, password)


//             }
//             if (formState === 1) {
//                 let result = await handleRegister(name, username, password);
//                 console.log(result);
//                 setUsername("");
//                 setMessage(result);
//                 setOpen(true);
//                 setError("")
//                 setFormState(0)
//                 setPassword("")
//             }
//         } catch (err) {

//             console.log(err);
//             let message = (err.response.data.message);
//             setError(message);
//         }
//     }


//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Grid container component="main" sx={{ height: '100vh' }}>
//                 <CssBaseline />
//                 <Grid
//                     item
//                     xs={false}
//                     sm={4}
//                     md={7}
//                     sx={{
//                         backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
//                         backgroundRepeat: 'no-repeat',
//                         backgroundColor: (t) =>
//                             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 />
//                 <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                     <Box
//                         sx={{
//                             my: 8,
//                             mx: 4,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                             <LockOutlinedIcon />
//                         </Avatar>


//                         <div>
//                             <Button variant={formState === 0 ? "contained" : ""} onClick={() => { setFormState(0) }}>
//                                 Sign In
//                             </Button>
//                             <Button variant={formState === 1 ? "contained" : ""} onClick={() => { setFormState(1) }}>
//                                 Sign Up
//                             </Button>
//                         </div>

//                         <Box component="form" noValidate sx={{ mt: 1 }}>
//                             {formState === 1 ? <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="username"
//                                 label="Full Name"
//                                 name="username"
//                                 value={name}
//                                 autoFocus
//                                 onChange={(e) => setName(e.target.value)}
//                             /> : <></>}

//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="username"
//                                 label="Username"
//                                 name="username"
//                                 value={username}
//                                 autoFocus
//                                 onChange={(e) => setUsername(e.target.value)}

//                             />
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 value={password}
//                                 type="password"
//                                 onChange={(e) => setPassword(e.target.value)}

//                                 id="password"
//                             />

//                             <p style={{ color: "red" }}>{error}</p>

//                             <Button
//                                 type="button"
//                                 fullWidth
//                                 variant="contained"
//                                 sx={{ mt: 3, mb: 2 }}
//                                 onClick={handleAuth}
//                             >
//                                 {formState === 0 ? "Login " : "Register"}
//                             </Button>

//                         </Box>
//                     </Box>
//                 </Grid>
//             </Grid>

//             <Snackbar

//                 open={open}
//                 autoHideDuration={4000}
//                 message={message}
//             />

//         </ThemeProvider>
//     );
// }



 //average auth with no back to home 

// import React, { useContext, useState } from "react";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Snackbar,
//   ToggleButton,
//   ToggleButtonGroup,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { AuthContext } from "../contexts/AuthContext";

// export default function Authentication() {
//   const { handleRegister, handleLogin } = useContext(AuthContext);
//   const [tab, setTab] = useState(0);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");
//   const [open, setOpen] = useState(false);

//   const handleAuth = async () => {
//     try {
//       if (tab === 0) {
//         await handleLogin(username, password);
//       } else {
//         const result = await handleRegister(name, username, password);
//         setMessage(result);
//         setOpen(true);
//         setTab(0);
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error occurred");
//       setOpen(true);
//     }
//   };

//   return (
//     <Grid container component="main" sx={{ height: "100vh" }}>
//       <CssBaseline />
//       {/* Left Side Image */}
//       <Grid
//         item
//         xs={false}
//         sm={6}
//         sx={{
//           background: "linear-gradient(135deg, #93c5fd, #e0f2fe)",
//         }}
//       />
//       {/* Right Side Form */}
//       <Grid
//         item
//         xs={12}
//         sm={6}
//         component={Paper}
//         elevation={6}
//         square
//         sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
//       >
//         <Box
//           sx={{
//             my: 5,
//             mx: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             maxWidth: 400,
//             width: "100%",
//           }}
//         >
//           <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5" gutterBottom>
//             {tab === 0 ? "Sign In" : "Sign Up"}
//           </Typography>

//           <ToggleButtonGroup
//             value={tab}
//             exclusive
//             onChange={(e, val) => setTab(val)}
//             sx={{ mb: 2 }}
//           >
//             <ToggleButton value={0}>Sign In</ToggleButton>
//             <ToggleButton value={1}>Sign Up</ToggleButton>
//           </ToggleButtonGroup>

//           {tab === 1 && (
//             <TextField
//               margin="normal"
//               fullWidth
//               label="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           )}
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <Button
//             variant="contained"
//             fullWidth
//             sx={{ mt: 3 }}
//             onClick={handleAuth}
//           >
//             {tab === 0 ? "Login" : "Register"}
//           </Button>
//         </Box>
//       </Grid>

//       <Snackbar
//         open={open}
//         autoHideDuration={4000}
//         message={message}
//         onClose={() => setOpen(false)}
//       />
//     </Grid>
//   );
// }

// auth with back to home and good ui 

import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Grid,
  Paper,
  Typography,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Authentication() {
  const { handleRegister, handleLogin } = useContext(AuthContext);
  const [tab, setTab] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (tab === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setTab(0);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
      setOpen(true);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      {/* LEFT SIDE - Animation & Branding */}
      <Grid
        item
        xs={false}
        sm={6}
        sx={{
          background: "linear-gradient(135deg, #93c5fd, #3b82f6)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 3,
          position: "relative",
        }}
      >
        {/* Back to Home Button */}
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "white",
            backgroundColor: "rgba(255,255,255,0.2)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.4)" },
          }}
        >
          <HomeIcon />
        </IconButton>

        {/* Animation */}
        <Player
          autoplay
          loop
          src="https://assets10.lottiefiles.com/packages/lf20_ydo1amjm.json"
          style={{ height: "300px", width: "300px" }}
        />

        {/* Branding Text */}
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
          InstaMeet
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            maxWidth: 400,
            mt: 1,
            fontWeight: 300,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Connect with anyone, anywhere. Seamless video calls at your fingertips.
        </Typography>
      </Grid>

      {/* RIGHT SIDE - Auth Form */}
      <Grid
        item
        xs={12}
        sm={6}
        component={Paper}
        elevation={6}
        square
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            my: 5,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 400,
            width: "100%",
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" gutterBottom>
            {tab === 0 ? "Sign In" : "Sign Up"}
          </Typography>

          {/* Toggle SignIn/SignUp */}
          <ToggleButtonGroup
            value={tab}
            exclusive
            onChange={(e, val) => setTab(val)}
            sx={{ mb: 2 }}
          >
            <ToggleButton value={0}>Sign In</ToggleButton>
            <ToggleButton value={1}>Sign Up</ToggleButton>
          </ToggleButtonGroup>

          {tab === 1 && (
            <TextField
              margin="normal"
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleAuth}
          >
            {tab === 0 ? "Login" : "Register"}
          </Button>
        </Box>
      </Grid>

      {/* Snackbar for Messages */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </Grid>
  );
}
