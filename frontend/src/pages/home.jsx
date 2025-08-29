// import React, { useContext, useState } from 'react'
// import withAuth from '../utils/withAuth'
// import { useNavigate } from 'react-router-dom'
// import "../App.css";
// import { Button, IconButton, TextField } from '@mui/material';
// import RestoreIcon from '@mui/icons-material/Restore';
// import { AuthContext } from '../contexts/AuthContext';

// function HomeComponent() {


//     let navigate = useNavigate();
//     const [meetingCode, setMeetingCode] = useState("");


//     const {addToUserHistory} = useContext(AuthContext);
//     let handleJoinVideoCall = async () => {
//         await addToUserHistory(meetingCode)
//         navigate(`/${meetingCode}`)
//     }

//     return (
//         <>

//             <div className="navBar">

//                 <div style={{ display: "flex", alignItems: "center" }}>

//                     <h2>Apna Video Call</h2>
//                 </div>

//                 <div style={{ display: "flex", alignItems: "center" }}>
//                     <IconButton onClick={
//                         () => {
//                             navigate("/history")
//                         }
//                     }>
//                         <RestoreIcon />
//                     </IconButton>
//                     <p>History</p>

//                     <Button onClick={() => {
//                         localStorage.removeItem("token")
//                         navigate("/auth")
//                     }}>
//                         Logout
//                     </Button>
//                 </div>


//             </div>


//             <div className="meetContainer">
//                 <div className="leftPanel">
//                     <div>
//                         <h2>Providing Quality Video Call Just Like Quality Education</h2>

//                         <div style={{ display: 'flex', gap: "10px" }}>

//                             <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
//                             <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>

//                         </div>
//                     </div>
//                 </div>
//                 <div className='rightPanel'>
//                     <img srcSet='/logo3.png' alt="" />
//                 </div>
//             </div>
//         </>
//     )
// }


// export default withAuth(HomeComponent)


// this is simple home page an ui 


// import React, { useContext, useState } from 'react';
// import withAuth from '../utils/withAuth';
// import { useNavigate } from 'react-router-dom';
// import "../App.css";
// import { Button, IconButton, TextField, Paper, Typography, Box } from '@mui/material';
// import RestoreIcon from '@mui/icons-material/Restore';
// import { AuthContext } from '../contexts/AuthContext';

// function HomeComponent() {
//   let navigate = useNavigate();
//   const [meetingCode, setMeetingCode] = useState("");
//   const { addToUserHistory } = useContext(AuthContext);

//   let handleJoinVideoCall = async () => {
//     await addToUserHistory(meetingCode);
//     navigate(`/${meetingCode}`);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f9fafb, #e0f2fe)",
//         p: 3,
//       }}
//     >
//       {/* Navbar */}
//       <Box
//         sx={{
//           background: "#ffffffcc",
//           backdropFilter: "blur(6px)",
//           borderRadius: 3,
//           p: 2,
//           mb: 5,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           boxShadow: 3,
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" color="#1e293b">
//           Apna Video Call
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <IconButton color="primary" onClick={() => navigate("/history")}>
//             <RestoreIcon />
//           </IconButton>
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={() => {
//               localStorage.removeItem("token");
//               navigate("/auth");
//             }}
//           >
//             Logout
//           </Button>
//         </Box>
//       </Box>

//       {/* Meeting Box */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           mt: 10,
//         }}
//       >
//         <Paper
//           elevation={5}
//           sx={{
//             p: 5,
//             width: "100%",
//             maxWidth: "500px",
//             borderRadius: 3,
//             textAlign: "center",
//             background: "#ffffff",
//           }}
//         >
//           <Typography variant="h4" fontWeight={600} mb={3} color="#1e293b">
//             Start or Join a Meeting
//           </Typography>
//           <TextField
//             fullWidth
//             label="Meeting Code"
//             variant="outlined"
//             value={meetingCode}
//             onChange={(e) => setMeetingCode(e.target.value)}
//             sx={{ mb: 3 }}
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             size="large"
//             onClick={handleJoinVideoCall}
//           >
//             Join Meeting
//           </Button>
//         </Paper>
//       </Box>
//     </Box>
//   );
// }

// export default withAuth(HomeComponent);

// this is animated home page and ui
// import React, { useContext, useState } from 'react';
// import withAuth from '../utils/withAuth';
// import { useNavigate } from 'react-router-dom';
// import "../App.css";
// import { 
//   Button, 
//   IconButton, 
//   TextField, 
//   Paper, 
//   Typography,  // ✅ FIXED: Added Typography here
//   Box 
// } from '@mui/material';
// import RestoreIcon from '@mui/icons-material/Restore';
// import { AuthContext } from '../contexts/AuthContext';
// import Lottie from "lottie-react";
// import videoAnimation from "../styles/Saying hi animation.json"; // ✅ Make sure this path is correct

// function HomeComponent() {
//   let navigate = useNavigate();
//   const [meetingCode, setMeetingCode] = useState("");
//   const { addToUserHistory } = useContext(AuthContext);

//   let handleJoinVideoCall = async () => {
//     await addToUserHistory(meetingCode);
//     navigate(`/${meetingCode}`);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         position: "relative",
//         overflow: "hidden",
//         p: 3,
//       }}
//     >
//       {/* ✅ Lottie Background */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           zIndex: 0,
//           opacity: 0.15,
//           pointerEvents: "none",
//         }}
//       >
//         <Lottie animationData={videoAnimation} loop />
//       </Box>

//       {/* Main Content */}
//       <Box sx={{ position: "relative", zIndex: 1 }}>
//         {/* Navbar */}
//         <Box
//           sx={{
//             background: "#ffffffcc",
//             backdropFilter: "blur(6px)",
//             borderRadius: 3,
//             p: 2,
//             mb: 5,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             boxShadow: 3,
//           }}
//         >
//           {/* <img src="/logo.png" alt="Meet Me" style={{ height: "40px" }} /> */}
//            <Box
//             component="img"
//             src="/logo.png"
//             alt="Meet Me"
//             sx={{ height: 40, cursor: "pointer" }}
//             onClick={() => navigate("/")} // ✅ Navigate to Landing Page
//           />
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <IconButton color="primary" onClick={() => navigate("/history")}>
//               <RestoreIcon />
//             </IconButton>
//             <Button
//               variant="outlined"
//               color="error"
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 navigate("/auth");
//               }}
//             >
//               Logout
//             </Button>
//           </Box>
//         </Box>

//         {/* Meeting Box */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             mt: 10,
//           }}
//         >
//           <Paper
//             elevation={5}
//             sx={{
//               p: 5,
//               width: "100%",
//               maxWidth: "500px",
//               borderRadius: 3,
//               textAlign: "center",
//               background: "#ffffff",
//             }}
//           >
//             <Typography variant="h4" fontWeight={600} mb={3} color="#1e293b">
//               Start or Join a Meeting
//             </Typography>
//             <TextField
//               fullWidth
//               label="Meeting Code"
//               variant="outlined"
//               value={meetingCode}
//               onChange={(e) => setMeetingCode(e.target.value)}
//               sx={{ mb: 3 }}
//             />
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               size="large"
//               onClick={handleJoinVideoCall}
//             >
//               Join Meeting
//             </Button>
//           </Paper>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default withAuth(HomeComponent);


import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { 
  Button, 
  IconButton, 
  TextField, 
  Paper, 
  Typography,
  Box 
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import Lottie from "lottie-react";
import videoAnimation from "../styles/Saying hi animation.json"; // ✅ Make sure this path is correct

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) {
      alert("Please enter a meeting code!");
      return;
    }
    await addToUserHistory(meetingCode);
    navigate(`/videomeet?code=${meetingCode}`); // ✅ Navigate with query param
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth"); // ✅ Adjust according to your auth route
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        p: 3,
      }}
    >
      {/* Lottie Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.15,
          pointerEvents: "none",
        }}
      >
        <Lottie animationData={videoAnimation} loop />
      </Box>

      {/* Main Content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* Navbar */}
        <Box
          sx={{
            background: "#ffffffcc",
            backdropFilter: "blur(6px)",
            borderRadius: 3,
            p: 2,
            mb: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: 3,
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Meet Me"
            sx={{ height: 40, cursor: "pointer" }}
            onClick={() => navigate("/")} // ✅ Navigate to Home / Landing
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton color="primary" onClick={() => navigate("/history")}>
              <RestoreIcon />
            </IconButton>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>

        {/* Meeting Box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 10,
          }}
        >
          <Paper
            elevation={5}
            sx={{
              p: 5,
              width: "100%",
              maxWidth: "500px",
              borderRadius: 3,
              textAlign: "center",
              background: "#ffffff",
            }}
          >
            <Typography variant="h4" fontWeight={600} mb={3} color="#1e293b">
              Start or Join a Meeting
            </Typography>
            <TextField
              fullWidth
              label="Meeting Code"
              variant="outlined"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleJoinVideoCall}
            >
              Join Meeting
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default withAuth(HomeComponent);
