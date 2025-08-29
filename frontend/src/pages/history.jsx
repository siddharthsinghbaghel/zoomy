// import React, { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../contexts/AuthContext'
// import { useNavigate } from 'react-router-dom';
// import Card from '@mui/material/Card';
// import Box from '@mui/material/Box';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import HomeIcon from '@mui/icons-material/Home';

// import { IconButton } from '@mui/material';
// export default function History() {


//     const { getHistoryOfUser } = useContext(AuthContext);

//     const [meetings, setMeetings] = useState([])


//     const routeTo = useNavigate();

//     useEffect(() => {
//         const fetchHistory = async () => {
//             try {
//                 const history = await getHistoryOfUser();
//                 setMeetings(history);
//             } catch {
//                 // IMPLEMENT SNACKBAR
//             }
//         }

//         fetchHistory();
//     }, [])

//     let formatDate = (dateString) => {

//         const date = new Date(dateString);
//         const day = date.getDate().toString().padStart(2, "0");
//         const month = (date.getMonth() + 1).toString().padStart(2, "0")
//         const year = date.getFullYear();

//         return `${day}/${month}/${year}`

//     }

//     return (
//         <div>

//             <IconButton onClick={() => {
//                 routeTo("/home")
//             }}>
//                 <HomeIcon />
//             </IconButton >
//             {
//                 (meetings.length !== 0) ? meetings.map((e, i) => {
//                     return (

//                         <>


//                             <Card key={i} variant="outlined">


//                                 <CardContent>
//                                     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                         Code: {e.meetingCode}
//                                     </Typography>

//                                     <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                                         Date: {formatDate(e.date)}
//                                     </Typography>

//                                 </CardContent>


//                             </Card>


//                         </>
//                     )
//                 }) : <></>

//             }

//         </div>
//     )
// }



// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, Typography, IconButton, Paper, Box } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';

// export default function History() {
//   const { getHistoryOfUser } = useContext(AuthContext);
//   const [meetings, setMeetings] = useState([]);
//   const routeTo = useNavigate();

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const history = await getHistoryOfUser();
//         setMeetings(history);
//       } catch {}
//     };
//     fetchHistory();
//   }, []);

//   let formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return `${date.getDate().toString().padStart(2, '0')}/${
//       (date.getMonth() + 1).toString().padStart(2, '0')
//     }/${date.getFullYear()}`;
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #f9fafb, #dbeafe)',
//         p: 3,
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           maxWidth: '800px',
//           mx: 'auto',
//           p: 3,
//           borderRadius: 3,
//           background: '#ffffffcc',
//           backdropFilter: 'blur(6px)',
//         }}
//       >
//         {/* Header */}
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//           <IconButton
//             sx={{ color: '#3b82f6', mr: 1 }}
//             onClick={() => routeTo('/home')}
//           >
//             <HomeIcon />
//           </IconButton>
//           <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
//             Meeting History
//           </Typography>
//         </Box>

//         {/* Meeting Cards */}
//         {meetings.length !== 0 ? (
//           meetings.map((e, i) => (
//             <Card
//               key={i}
//               elevation={3}
//               sx={{
//                 mb: 2,
//                 borderRadius: 2,
//                 transition: '0.3s',
//                 '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
//               }}
//             >
//               <CardContent>
//                 <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#111827' }}>
//                   Meeting Code: <span style={{ color: '#2563eb' }}>{e.meetingCode}</span>
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
//                   Date: {formatDate(e.date)}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: 'center', mt: 5, color: '#374151' }}>
//             No meetings yet. Start a new one!
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Paper,
//   Box,
//   Stack,
// } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import DeleteIcon from '@mui/icons-material/Delete';
// import axios from 'axios';

// export default function History() {
//   const { getHistoryOfUser } = useContext(AuthContext);
//   const [meetings, setMeetings] = useState([]);
//   const routeTo = useNavigate();

//   // Fetch meeting history
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const history = await getHistoryOfUser();
//         setMeetings(history);
//       } catch (error) {
//         console.error('Error fetching history:', error);
//       }
//     };
//     fetchHistory();
//   }, [getHistoryOfUser]);

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return `${date.getDate().toString().padStart(2, '0')}/${
//       (date.getMonth() + 1).toString().padStart(2, '0')
//     }/${date.getFullYear()}`;
//   };

//   // 🆕 Delete meeting handler
//   const handleDelete = async (meetingCode) => {
//     if (!window.confirm('Are you sure you want to delete this meeting?')) return;

//     try {
//       await axios.delete(
//         `http://localhost:8000/api/v1/users/delete_activity/${meetingCode}`
//       );
//       setMeetings((prev) => prev.filter((m) => m.meetingCode !== meetingCode));
//     } catch (err) {
//       console.error('Error deleting meeting:', err);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #f9fafb, #dbeafe)',
//         p: 3,
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           maxWidth: '800px',
//           mx: 'auto',
//           p: 3,
//           borderRadius: 3,
//           background: '#ffffffcc',
//           backdropFilter: 'blur(6px)',
//         }}
//       >
//         {/* Header */}
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//           <IconButton
//             sx={{ color: '#3b82f6', mr: 1 }}
//             onClick={() => routeTo('/home')}
//           >
//             <HomeIcon />
//           </IconButton>
//           <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
//             Meeting History
//           </Typography>
//         </Box>

//         {/* Meeting Cards */}
//         {meetings.length !== 0 ? (
//           meetings.map((e, i) => (
//             <Card
//               key={i}
//               elevation={3}
//               sx={{
//                 mb: 2,
//                 borderRadius: 2,
//                 transition: '0.3s',
//                 '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
//               }}
//             >
//               <CardContent>
//                 <Stack
//                   direction="row"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <div>
//                     <Typography
//                       variant="body1"
//                       sx={{ fontWeight: 'bold', color: '#111827' }}
//                     >
//                       Meeting Code:{' '}
//                       <span style={{ color: '#2563eb' }}>{e.meetingCode}</span>
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{ color: '#6b7280', mt: 0.5 }}
//                     >
//                       Date: {formatDate(e.date)}
//                     </Typography>
//                   </div>

//                   {/* 🆕 Delete Button */}
//                   <IconButton
//                     color="error"
//                     onClick={() => handleDelete(e.meetingCode)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Stack>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Typography
//             variant="body1"
//             sx={{ textAlign: 'center', mt: 5, color: '#374151' }}
//           >
//             No meetings yet. Start a new one!
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// }
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Paper,
  Box,
  Stack,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Checkbox
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [selected, setSelected] = useState([]); // ✅ store selected meeting IDs
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dialog, setDialog] = useState({ open: false, id: null, bulk: false, clearAll: false });
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, [getHistoryOfUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()}`;
  };

  // ✅ Toggle single meeting selection
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  // ✅ Select All toggle
  const handleSelectAll = () => {
    if (selected.length === meetings.length) {
      setSelected([]); // deselect all
    } else {
      setSelected(meetings.map((m) => m._id)); // select all
    }
  };

  // ✅ Delete single, bulk, or all
  const handleDeleteConfirm = async () => {
    try {
      if (dialog.clearAll) {
        // Clear entire history
        await Promise.all(
          meetings.map((m) =>
            axios.delete(`http://localhost:8000/api/v1/users/delete_activity/${m._id}`)
          )
        );
        setMeetings([]);
        setSelected([]);
        setSnackbar({ open: true, message: 'All meeting history cleared!', severity: 'success' });
      } else if (dialog.bulk) {
        // Bulk delete
        await Promise.all(
          selected.map((id) =>
            axios.delete(`http://localhost:8000/api/v1/users/delete_activity/${id}`)
          )
        );
        setMeetings((prev) => prev.filter((m) => !selected.includes(m._id)));
        setSelected([]);
        setSnackbar({ open: true, message: 'Selected meetings deleted!', severity: 'success' });
      } else {
        // Single delete
        await axios.delete(`http://localhost:8000/api/v1/users/delete_activity/${dialog.id}`);
        setMeetings((prev) => prev.filter((m) => m._id !== dialog.id));
        setSnackbar({ open: true, message: 'Meeting deleted successfully!', severity: 'success' });
      }
    } catch (err) {
      console.error('Error deleting meeting:', err);
      setSnackbar({ open: true, message: 'Error deleting meeting!', severity: 'error' });
    }
    setDialog({ open: false, id: null, bulk: false, clearAll: false });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f9fafb, #dbeafe)',
        p: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          p: 3,
          borderRadius: 3,
          background: '#ffffffcc',
          backdropFilter: 'blur(6px)',
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ color: '#3b82f6', mr: 1 }} onClick={() => routeTo('/home')}>
              <HomeIcon />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
              Meeting History
            </Typography>
          </Box>

          {/* Bulk actions */}
          {meetings.length > 0 && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Checkbox
                checked={selected.length === meetings.length}
                indeterminate={selected.length > 0 && selected.length < meetings.length}
                onChange={handleSelectAll}
              />
              <Button
                variant="outlined"
                color="error"
                disabled={selected.length === 0}
                onClick={() => setDialog({ open: true, bulk: true })}
              >
                Delete Selected
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setDialog({ open: true, clearAll: true })}
              >
                Clear All
              </Button>
            </Stack>
          )}
        </Box>

        {/* Meeting list */}
        {meetings.length !== 0 ? (
          meetings.map((e) => (
            <Card
              key={e._id}
              elevation={3}
              sx={{
                mb: 2,
                borderRadius: 2,
                transition: '0.3s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
              }}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Checkbox
                      checked={selected.includes(e._id)}
                      onChange={() => handleSelect(e._id)}
                    />
                    <div>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#111827' }}>
                        Meeting Code: <span style={{ color: '#2563eb' }}>{e.meetingCode}</span>
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
                        Date: {formatDate(e.date)}
                      </Typography>
                    </div>
                  </Stack>
                  <IconButton color="error" onClick={() => setDialog({ open: true, id: e._id })}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', mt: 5, color: '#374151' }}
          >
            No meetings yet. Start a new one!
          </Typography>
        )}
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={dialog.open}
        onClose={() => setDialog({ open: false, id: null, bulk: false, clearAll: false })}
      >
        <DialogTitle>
          {dialog.clearAll
            ? 'Clear All History'
            : dialog.bulk
            ? 'Delete Meetings'
            : 'Delete Meeting'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialog.clearAll
              ? 'Are you sure you want to clear your entire history? This action cannot be undone.'
              : dialog.bulk
              ? 'Are you sure you want to delete all selected meetings? This action cannot be undone.'
              : 'Are you sure you want to delete this meeting record? This action cannot be undone.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialog({ open: false, id: null, bulk: false, clearAll: false })}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

