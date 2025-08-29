// import React from 'react'
// import "../App.css"
// import { Link, useNavigate } from 'react-router-dom'
// export default function LandingPage() {


//     const router = useNavigate();

//     return (
//         <div className='landingPageContainer'>
//             <nav>
//                 <div className='navHeader'>
//                     <h2>Apna Video Call</h2>
//                 </div>
//                 <div className='navlist'>
//                     <p onClick={() => {
//                         router("/aljk23")
//                     }}>Join as Guest</p>
//                     <p onClick={() => {
//                         router("/auth")

//                     }}>Register</p>
//                     <div onClick={() => {
//                         router("/auth")

//                     }} role='button'>
//                         <p>Login</p>
//                     </div>
//                 </div>
//             </nav>


//             <div className="landingMainContainer">
//                 <div>
//                     <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>

//                     <p>Cover a distance by Apna Video Call</p>
//                     <div role='button'>
//                         <Link to={"/auth"}>Get Started</Link>
//                     </div>
//                 </div>
//                 <div>

//                     <img src="/mobile.png" alt="" />

//                 </div>
//             </div>



//         </div>
//     )
// }


// import React from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';

// export default function LandingPage() {
//   const router = useNavigate();

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #f9fafb, #bfdbfe, #93c5fd)',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         p: 3,
//       }}
//     >
//       {/* Navbar */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           background: '#ffffffaa',
//           backdropFilter: 'blur(6px)',
//           borderRadius: 3,
//           p: 2,
//           mb: 4,
//           boxShadow: 3,
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" color="#1e293b">
//           Apna Video Call
//         </Typography>
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <Button color="primary" variant="outlined" onClick={() => router('/auth')}>
//             Login
//           </Button>
//           <Button color="primary" variant="contained" onClick={() => router('/auth')}>
//             Get Started
//           </Button>
//         </Box>
//       </Box>

//       {/* Hero Section */}
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: { xs: 'column', md: 'row' },
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexGrow: 1,
//           px: { xs: 2, md: 6 },
//         }}
//       >
//         <Box sx={{ maxWidth: '500px', textAlign: { xs: 'center', md: 'left' } }}>
//           <Typography variant="h2" fontWeight="bold" gutterBottom color="#1e293b">
//             Connect Seamlessly
//           </Typography>
//           <Typography variant="h6" color="#374151" mb={3}>
//             High-quality video calls with just one click. Stay close to your loved ones, no matter where you are.
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             sx={{ backgroundColor: '#2563eb', fontWeight: 'bold' }}
//             component={Link}
//             to="/auth"
//           >
//             Start Calling
//           </Button>
//         </Box>

//         <Box
//           component="img"
//           src="/mobile.png"
//           alt="Video Call"
//           sx={{
//             width: { xs: '80%', md: '400px' },
//             borderRadius: 3,
//             boxShadow: 5,
//             mt: { xs: 4, md: 0 },
//           }}
//         />
//       </Box>
//     </Box>
//   );
// }

 // updated logo and video

// import React from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';

// export default function LandingPage() {
//   const router = useNavigate();

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         p: 3,
//       }}
//     >
//       {/* Navbar */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           background: 'rgba(255,255,255,0.85)',
//           backdropFilter: 'blur(6px)',
//           borderRadius: 3,
//           p: 2,
//           mb: 4,
//           boxShadow: 3,
//         }}
//       >
//         {/* Logo + Brand */}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Box
//             component="img"
//             src="/logo.png" // Place your logo in public/logo.png
//             alt="Meet Me Logo"
//             sx={{ width: 40, height: 40 }}
//           />
//           <Typography
//             variant="h5"
//             fontWeight="bold"
//             sx={{
//               background: 'linear-gradient(to right, #6366f1, #ec4899)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}
//           >
//             InstaMeet
//           </Typography>
//         </Box>

//         {/* Navbar Buttons */}
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <Button color="primary" variant="outlined" onClick={() => router('/auth')}>
//             Login
//           </Button>
//           <Button color="primary" variant="contained" onClick={() => router('/auth')}>
//             Get Started
//           </Button>
//         </Box>
//       </Box>

//       {/* Hero Section */}
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: { xs: 'column', md: 'row' },
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexGrow: 1,
//           px: { xs: 2, md: 6 },
//         }}
//       >
//         {/* Left Content */}
//         <Box sx={{ maxWidth: '500px', textAlign: { xs: 'center', md: 'left' } }}>
//           <Typography
//             variant="h2"
//             fontWeight="bold"
//             gutterBottom
//             sx={{ color: '#ffffff' }}
//           >
//             Connect Seamlessly
//           </Typography>
//           <Typography variant="h6" sx={{ color: '#f3f4f6', mb: 3 }}>
//             High-quality video calls with just one click. Stay close to your loved ones, no matter where you are.
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             sx={{
//               backgroundColor: '#2563eb',
//               fontWeight: 'bold',
//               '&:hover': { backgroundColor: '#1d4ed8' },
//             }}
//             component={Link}
//             to="/auth"
//           >
//             Start Calling
//           </Button>
//         </Box>

//         {/* Animated Video Section */}
//         <Box
//           component="video"
//           src="/video-demo.mp4" // Place a video in public/video-demo.mp4
//           autoPlay
//           muted
//           loop
//           playsInline
//           sx={{
//             width: { xs: '90%', md: '450px' },
//             borderRadius: 3,
//             boxShadow: 5,
//             mt: { xs: 4, md: 0 },
//           }}
//         />
//       </Box>
//     </Box>
//   );
// }


// clickable logo to home page 

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const router = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 3,
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(6px)',
          borderRadius: 3,
          p: 2,
          mb: 4,
          boxShadow: 3,
        }}
      >
        {/* Logo + Brand (Clickable) */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
          onClick={() => router('/auth')}
        >
          <Box
            component="img"
            src="/logo.png" // Place your logo in public/logo.png
            alt="Meet Me Logo"
            sx={{ width: 50, height: 50 }}
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(to right, #6366f1, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            InstaMeet
          </Typography>
        </Box>

        {/* Navbar Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="primary" variant="outlined" onClick={() => router('/auth')}>
            Login
          </Button>
          <Button color="primary" variant="contained" onClick={() => router('/auth')}>
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          flexGrow: 1,
          px: { xs: 2, md: 6 },
        }}
      >
        {/* Left Content */}
        <Box sx={{ maxWidth: '500px', textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ color: '#ffffff' }}
          >
            Connect Seamlessly
          </Typography>
          <Typography variant="h6" sx={{ color: '#f3f4f6', mb: 3 }}>
            High-quality video calls with just one click. Stay close to your loved ones, no matter where you are.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#2563eb',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#1d4ed8' },
            }}
            component={Link}
            to="/auth"
          >
            Start Calling
          </Button>
        </Box>

        {/* Animated Video Section */}
        <Box
          component="video"
          src="/video-demo.mp4" // Place a video in public/video-demo.mp4
          autoPlay
          muted
          loop
          playsInline
          sx={{
            width: { xs: '90%', md: '450px' },
            borderRadius: 3,
            boxShadow: 5,
            mt: { xs: 4, md: 0 },
          }}
        />
      </Box>
    </Box>
  );
}
