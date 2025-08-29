// import React, { useEffect, useRef, useState } from 'react'
// import io from "socket.io-client";
// import { Badge, IconButton, TextField } from '@mui/material';
// import { Button } from '@mui/material';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff'
// import styles from "../styles/videoComponent.module.css";
// import CallEndIcon from '@mui/icons-material/CallEnd'
// import MicIcon from '@mui/icons-material/Mic'
// import MicOffIcon from '@mui/icons-material/MicOff'
// import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
// import ChatIcon from '@mui/icons-material/Chat'
// import server from '../environment';

// const server_url = server;

// var connections = {};

// const peerConfigConnections = {
//     "iceServers": [
//         { "urls": "stun:stun.l.google.com:19302" }
//     ]
// }

// export default function VideoMeetComponent() {

//     var socketRef = useRef();
//     let socketIdRef = useRef();

//     let localVideoref = useRef();

//     let [videoAvailable, setVideoAvailable] = useState(true);

//     let [audioAvailable, setAudioAvailable] = useState(true);

//     let [video, setVideo] = useState([]);

//     let [audio, setAudio] = useState();

//     let [screen, setScreen] = useState();

//     let [showModal, setModal] = useState(true);

//     let [screenAvailable, setScreenAvailable] = useState();

//     let [messages, setMessages] = useState([])

//     let [message, setMessage] = useState("");

//     let [newMessages, setNewMessages] = useState(3);

//     let [askForUsername, setAskForUsername] = useState(true);

//     let [username, setUsername] = useState("");

//     const videoRef = useRef([])

//     let [videos, setVideos] = useState([])

//     // TODO
//     // if(isChrome() === false) {


//     // }

//     useEffect(() => {
//         console.log("HELLO")
//         getPermissions();

//     })

//     let getDislayMedia = () => {
//         if (screen) {
//             if (navigator.mediaDevices.getDisplayMedia) {
//                 navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
//                     .then(getDislayMediaSuccess)
//                     .then((stream) => { })
//                     .catch((e) => console.log(e))
//             }
//         }
//     }

//     const getPermissions = async () => {
//         try {
//             const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoPermission) {
//                 setVideoAvailable(true);
//                 console.log('Video permission granted');
//             } else {
//                 setVideoAvailable(false);
//                 console.log('Video permission denied');
//             }

//             const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
//             if (audioPermission) {
//                 setAudioAvailable(true);
//                 console.log('Audio permission granted');
//             } else {
//                 setAudioAvailable(false);
//                 console.log('Audio permission denied');
//             }

//             if (navigator.mediaDevices.getDisplayMedia) {
//                 setScreenAvailable(true);
//             } else {
//                 setScreenAvailable(false);
//             }

//             if (videoAvailable || audioAvailable) {
//                 const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
//                 if (userMediaStream) {
//                     window.localStream = userMediaStream;
//                     if (localVideoref.current) {
//                         localVideoref.current.srcObject = userMediaStream;
//                     }
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (video !== undefined && audio !== undefined) {
//             getUserMedia();
//             console.log("SET STATE HAS ", video, audio);

//         }


//     }, [video, audio])
//     let getMedia = () => {
//         setVideo(videoAvailable);
//         setAudio(audioAvailable);
//         connectToSocketServer();

//     }




//     let getUserMediaSuccess = (stream) => {
//         try {
//             window.localStream.getTracks().forEach(track => track.stop())
//         } catch (e) { console.log(e) }

//         window.localStream = stream
//         localVideoref.current.srcObject = stream

//         for (let id in connections) {
//             if (id === socketIdRef.current) continue

//             connections[id].addStream(window.localStream)

//             connections[id].createOffer().then((description) => {
//                 console.log(description)
//                 connections[id].setLocalDescription(description)
//                     .then(() => {
//                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                     })
//                     .catch(e => console.log(e))
//             })
//         }

//         stream.getTracks().forEach(track => track.onended = () => {
//             setVideo(false);
//             setAudio(false);

//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { console.log(e) }

//             let blackSilence = (...args) => new MediaStream([black(...args), silence()])
//             window.localStream = blackSilence()
//             localVideoref.current.srcObject = window.localStream

//             for (let id in connections) {
//                 connections[id].addStream(window.localStream)

//                 connections[id].createOffer().then((description) => {
//                     connections[id].setLocalDescription(description)
//                         .then(() => {
//                             socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                         })
//                         .catch(e => console.log(e))
//                 })
//             }
//         })
//     }

//     let getUserMedia = () => {
//         if ((video && videoAvailable) || (audio && audioAvailable)) {
//             navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
//                 .then(getUserMediaSuccess)
//                 .then((stream) => { })
//                 .catch((e) => console.log(e))
//         } else {
//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { }
//         }
//     }





//     let getDislayMediaSuccess = (stream) => {
//         console.log("HERE")
//         try {
//             window.localStream.getTracks().forEach(track => track.stop())
//         } catch (e) { console.log(e) }

//         window.localStream = stream
//         localVideoref.current.srcObject = stream

//         for (let id in connections) {
//             if (id === socketIdRef.current) continue

//             connections[id].addStream(window.localStream)

//             connections[id].createOffer().then((description) => {
//                 connections[id].setLocalDescription(description)
//                     .then(() => {
//                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                     })
//                     .catch(e => console.log(e))
//             })
//         }

//         stream.getTracks().forEach(track => track.onended = () => {
//             setScreen(false)

//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { console.log(e) }

//             let blackSilence = (...args) => new MediaStream([black(...args), silence()])
//             window.localStream = blackSilence()
//             localVideoref.current.srcObject = window.localStream

//             getUserMedia()

//         })
//     }

//     let gotMessageFromServer = (fromId, message) => {
//         var signal = JSON.parse(message)

//         if (fromId !== socketIdRef.current) {
//             if (signal.sdp) {
//                 connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
//                     if (signal.sdp.type === 'offer') {
//                         connections[fromId].createAnswer().then((description) => {
//                             connections[fromId].setLocalDescription(description).then(() => {
//                                 socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
//                             }).catch(e => console.log(e))
//                         }).catch(e => console.log(e))
//                     }
//                 }).catch(e => console.log(e))
//             }

//             if (signal.ice) {
//                 connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
//             }
//         }
//     }




//     let connectToSocketServer = () => {
//         socketRef.current = io.connect(server_url, { secure: false })

//         socketRef.current.on('signal', gotMessageFromServer)

//         socketRef.current.on('connect', () => {
//             socketRef.current.emit('join-call', window.location.href)
//             socketIdRef.current = socketRef.current.id

//             socketRef.current.on('chat-message', addMessage)

//             socketRef.current.on('user-left', (id) => {
//                 setVideos((videos) => videos.filter((video) => video.socketId !== id))
//             })

//             socketRef.current.on('user-joined', (id, clients) => {
//                 clients.forEach((socketListId) => {

//                     connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
//                     // Wait for their ice candidate       
//                     connections[socketListId].onicecandidate = function (event) {
//                         if (event.candidate != null) {
//                             socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
//                         }
//                     }

//                     // Wait for their video stream
//                     connections[socketListId].onaddstream = (event) => {
//                         console.log("BEFORE:", videoRef.current);
//                         console.log("FINDING ID: ", socketListId);

//                         let videoExists = videoRef.current.find(video => video.socketId === socketListId);

//                         if (videoExists) {
//                             console.log("FOUND EXISTING");

//                             // Update the stream of the existing video
//                             setVideos(videos => {
//                                 const updatedVideos = videos.map(video =>
//                                     video.socketId === socketListId ? { ...video, stream: event.stream } : video
//                                 );
//                                 videoRef.current = updatedVideos;
//                                 return updatedVideos;
//                             });
//                         } else {
//                             // Create a new video
//                             console.log("CREATING NEW");
//                             let newVideo = {
//                                 socketId: socketListId,
//                                 stream: event.stream,
//                                 autoplay: true,
//                                 playsinline: true
//                             };

//                             setVideos(videos => {
//                                 const updatedVideos = [...videos, newVideo];
//                                 videoRef.current = updatedVideos;
//                                 return updatedVideos;
//                             });
//                         }
//                     };


//                     // Add the local video stream
//                     if (window.localStream !== undefined && window.localStream !== null) {
//                         connections[socketListId].addStream(window.localStream)
//                     } else {
//                         let blackSilence = (...args) => new MediaStream([black(...args), silence()])
//                         window.localStream = blackSilence()
//                         connections[socketListId].addStream(window.localStream)
//                     }
//                 })

//                 if (id === socketIdRef.current) {
//                     for (let id2 in connections) {
//                         if (id2 === socketIdRef.current) continue

//                         try {
//                             connections[id2].addStream(window.localStream)
//                         } catch (e) { }

//                         connections[id2].createOffer().then((description) => {
//                             connections[id2].setLocalDescription(description)
//                                 .then(() => {
//                                     socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
//                                 })
//                                 .catch(e => console.log(e))
//                         })
//                     }
//                 }
//             })
//         })
//     }

//     let silence = () => {
//         let ctx = new AudioContext()
//         let oscillator = ctx.createOscillator()
//         let dst = oscillator.connect(ctx.createMediaStreamDestination())
//         oscillator.start()
//         ctx.resume()
//         return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
//     }
//     let black = ({ width = 640, height = 480 } = {}) => {
//         let canvas = Object.assign(document.createElement("canvas"), { width, height })
//         canvas.getContext('2d').fillRect(0, 0, width, height)
//         let stream = canvas.captureStream()
//         return Object.assign(stream.getVideoTracks()[0], { enabled: false })
//     }

//     let handleVideo = () => {
//         setVideo(!video);
//         // getUserMedia();
//     }
//     let handleAudio = () => {
//         setAudio(!audio)
//         // getUserMedia();
//     }

//     useEffect(() => {
//         if (screen !== undefined) {
//             getDislayMedia();
//         }
//     }, [screen])
//     let handleScreen = () => {
//         setScreen(!screen);
//     }

//     let handleEndCall = () => {
//         try {
//             let tracks = localVideoref.current.srcObject.getTracks()
//             tracks.forEach(track => track.stop())
//         } catch (e) { }
//         window.location.href = "/"
//     }

//     let openChat = () => {
//         setModal(true);
//         setNewMessages(0);
//     }
//     let closeChat = () => {
//         setModal(false);
//     }
//     let handleMessage = (e) => {
//         setMessage(e.target.value);
//     }

//     const addMessage = (data, sender, socketIdSender) => {
//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: sender, data: data }
//         ]);
//         if (socketIdSender !== socketIdRef.current) {
//             setNewMessages((prevNewMessages) => prevNewMessages + 1);
//         }
//     };



//     let sendMessage = () => {
//         console.log(socketRef.current);
//         socketRef.current.emit('chat-message', message, username)
//         setMessage("");

//         // this.setState({ message: "", sender: username })
//     }

    
//     let connect = () => {
//         setAskForUsername(false);
//         getMedia();
//     }


//     return (
//         <div>

//             {askForUsername === true ?

//                 <div>


//                     <h2>Enter into Lobby </h2>
//                     <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
//                     <Button variant="contained" onClick={connect}>Connect</Button>


//                     <div>
//                         <video ref={localVideoref} autoPlay muted></video>
//                     </div>

//                 </div> :


//                 <div className={styles.meetVideoContainer}>

//                     {showModal ? <div className={styles.chatRoom}>

//                         <div className={styles.chatContainer}>
//                             <h1>Chat</h1>

//                             <div className={styles.chattingDisplay}>

//                                 {messages.length !== 0 ? messages.map((item, index) => {

//                                     console.log(messages)
//                                     return (
//                                         <div style={{ marginBottom: "20px" }} key={index}>
//                                             <p style={{ fontWeight: "bold" }}>{item.sender}</p>
//                                             <p>{item.data}</p>
//                                         </div>
//                                     )
//                                 }) : <p>No Messages Yet</p>}


//                             </div>

//                             <div className={styles.chattingArea}>
//                                 <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="outlined-basic" label="Enter Your chat" variant="outlined" />
//                                 <Button variant='contained' onClick={sendMessage}>Send</Button>
//                             </div>


//                         </div>
//                     </div> : <></>}


//                     <div className={styles.buttonContainers}>
//                         <IconButton onClick={handleVideo} style={{ color: "white" }}>
//                             {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
//                         </IconButton>
//                         <IconButton onClick={handleEndCall} style={{ color: "red" }}>
//                             <CallEndIcon  />
//                         </IconButton>
//                         <IconButton onClick={handleAudio} style={{ color: "white" }}>
//                             {audio === true ? <MicIcon /> : <MicOffIcon />}
//                         </IconButton>

//                         {screenAvailable === true ?
//                             <IconButton onClick={handleScreen} style={{ color: "white" }}>
//                                 {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
//                             </IconButton> : <></>}

//                         <Badge badgeContent={newMessages} max={999} color='orange'>
//                             <IconButton onClick={() => setModal(!showModal)} style={{ color: "white" }}>
//                                 <ChatIcon />                        </IconButton>
//                         </Badge>

//                     </div>


//                     <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted></video>

//                     <div className={styles.conferenceView}>
//                         {videos.map((video) => (
//                             <div key={video.socketId}>
//                                 <video

//                                     data-socket={video.socketId}
//                                     ref={ref => {
//                                         if (ref && video.stream) {
//                                             ref.srcObject = video.stream;
//                                         }
//                                     }}
//                                     autoPlay
//                                 >
//                                 </video>
//                             </div>

//                         ))}

//                     </div>

//                 </div>

//             }

//         </div>
//     )
// }


//src/pages/VideoMeet.jsx
// import React, { useEffect, useRef, useState } from 'react'
// import io from "socket.io-client";
// import { Badge, IconButton, TextField, Button } from '@mui/material';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import CallEndIcon from '@mui/icons-material/CallEnd';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
// import ChatIcon from '@mui/icons-material/Chat';
// import styles from "../styles/videoComponent.module.css";
// import server from '../environment';

// const server_url = server;

// const peerConfigConnections = {
//   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// };

// let connections = {};

// export default function VideoMeetComponent() {
//   const socketRef = useRef();
//   const socketIdRef = useRef();
//   const localVideoref = useRef();

//   const [videoAvailable, setVideoAvailable] = useState(true);
//   const [audioAvailable, setAudioAvailable] = useState(true);

//   const [video, setVideo] = useState();    // boolean after connect
//   const [audio, setAudio] = useState();    // boolean after connect
//   const [screen, setScreen] = useState(false);

//   const [showModal, setModal] = useState(false);
//   const [screenAvailable, setScreenAvailable] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [newMessages, setNewMessages] = useState(0);
//   const [askForUsername, setAskForUsername] = useState(true);
//   const [username, setUsername] = useState("");

//   const videoRef = useRef([]);
//   const [videos, setVideos] = useState([]);

//   // —————————————————————————————————————
//   // Permissions – run ONCE
//   // —————————————————————————————————————
//   useEffect(() => {
//     const getPermissions = async () => {
//       try {
//         // Try combined getUserMedia once
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setVideoAvailable(true);
//         setAudioAvailable(true);
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));

//         window.localStream = stream;
//         if (localVideoref.current) localVideoref.current.srcObject = stream;
//       } catch (err) {
//         // If combined fails, test individually
//         try {
//           await navigator.mediaDevices.getUserMedia({ video: true });
//           setVideoAvailable(true);
//         } catch {
//           setVideoAvailable(false);
//         }
//         try {
//           await navigator.mediaDevices.getUserMedia({ audio: true });
//           setAudioAvailable(true);
//         } catch {
//           setAudioAvailable(false);
//         }
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
//       }
//     };
//     getPermissions();
//   }, []);

//   // —————————————————————————————————————
//   // Apply media whenever video/audio toggles
//   // —————————————————————————————————————
//   useEffect(() => {
//     if (typeof video === "boolean" && typeof audio === "boolean") {
//       getUserMedia();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [video, audio]);

//   // —————————————————————————————————————
//   // UI Handlers
//   // —————————————————————————————————————
//   const handleVideo = () => setVideo((v) => !v);
//   const handleAudio = () => setAudio((a) => !a);
//   const handleScreen = () => setScreen((s) => !s);

//   const handleEndCall = () => {
//     try {
//       const tracks = localVideoref.current?.srcObject?.getTracks() || [];
//       tracks.forEach((t) => t.stop());
//     } catch {}
//     window.location.href = "/";
//   };

//   const openChat = () => {
//     setModal(true);
//     setNewMessages(0);
//   };

//   const closeChat = () => setModal(false);

//   const sendMessage = () => {
//     if (!message.trim()) return;
//     socketRef.current?.emit('chat-message', message, username);
//     setMessage("");
//   };

//   // —————————————————————————————————————
//   // Connect flow
//   // —————————————————————————————————————
//   const connect = () => {
//     setAskForUsername(false);
//     // Initialize current desired tracks from available ones
//     setVideo(videoAvailable);
//     setAudio(audioAvailable);
//     connectToSocketServer();
//   };

//   // —————————————————————————————————————
//   // Media helpers
//   // —————————————————————————————————————
//   const getUserMedia = () => {
//     if ((video && videoAvailable) || (audio && audioAvailable)) {
//       navigator.mediaDevices
//         .getUserMedia({ video, audio })
//         .then(getUserMediaSuccess)
//         .catch((e) => console.log(e));
//     } else {
//       // turn off local tracks
//       try {
//         const tracks = localVideoref.current?.srcObject?.getTracks() || [];
//         tracks.forEach((t) => t.stop());
//       } catch {}
//     }
//   };

//   const getUserMediaSuccess = (stream) => {
//     try {
//       window.localStream?.getTracks().forEach((t) => t.stop());
//     } catch {}

//     window.localStream = stream;
//     if (localVideoref.current) localVideoref.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       pc.addStream(window.localStream);
//       pc.createOffer().then((description) => {
//         pc.setLocalDescription(description)
//           .then(() => {
//             socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription }));
//           })
//           .catch(console.log);
//       });
//     }

//     // When user stops camera/mic from browser UI
//     stream.getTracks().forEach((track) => {
//       track.onended = () => {
//         setVideo(false);
//         setAudio(false);
//         try {
//           const tracks = localVideoref.current?.srcObject?.getTracks() || [];
//           tracks.forEach((t) => t.stop());
//         } catch {}
//         const blackSilence = (...args) => new MediaStream([black(...args), silence()]);
//         window.localStream = blackSilence();
//         if (localVideoref.current) localVideoref.current.srcObject = window.localStream;

//         for (let id in connections) {
//           const pc = connections[id];
//           pc.addStream(window.localStream);
//           pc.createOffer().then((description) => {
//             pc.setLocalDescription(description)
//               .then(() => {
//                 socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription }));
//               })
//               .catch(console.log);
//           });
//         }
//       };
//     });
//   };

//   const getDisplayMedia = () => {
//     if (!screen) return;
//     if (!navigator.mediaDevices.getDisplayMedia) return;
//     navigator.mediaDevices
//       .getDisplayMedia({ video: true, audio: true })
//       .then(getDisplayMediaSuccess)
//       .catch(console.log);
//   };

//   const getDisplayMediaSuccess = (stream) => {
//     try {
//       window.localStream?.getTracks().forEach((t) => t.stop());
//     } catch {}

//     window.localStream = stream;
//     if (localVideoref.current) localVideoref.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       pc.addStream(window.localStream);
//       pc.createOffer().then((description) => {
//         pc.setLocalDescription(description)
//           .then(() => {
//             socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription }));
//           })
//           .catch(console.log);
//       });
//     }

//     // When user stops screen share
//     stream.getTracks().forEach((track) => {
//       track.onended = () => {
//         setScreen(false);
//         try {
//           const tracks = localVideoref.current?.srcObject?.getTracks() || [];
//           tracks.forEach((t) => t.stop());
//         } catch {}
//         const blackSilence = (...args) => new MediaStream([black(...args), silence()]);
//         window.localStream = blackSilence();
//         if (localVideoref.current) localVideoref.current.srcObject = window.localStream;
//         getUserMedia();
//       };
//     });
//   };

//   useEffect(() => {
//     if (screen) getDisplayMedia();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [screen]);

//   // —————————————————————————————————————
//   // WebRTC helpers
//   // —————————————————————————————————————
//   const gotMessageFromServer = (fromId, message) => {
//     const signal = JSON.parse(message);
//     if (fromId === socketIdRef.current) return;

//     if (signal.sdp) {
//       connections[fromId]
//         .setRemoteDescription(new RTCSessionDescription(signal.sdp))
//         .then(() => {
//           if (signal.sdp.type === 'offer') {
//             connections[fromId].createAnswer().then((description) => {
//               connections[fromId]
//                 .setLocalDescription(description)
//                 .then(() => {
//                   socketRef.current.emit('signal', fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
//                 })
//                 .catch(console.log);
//             });
//           }
//         })
//         .catch(console.log);
//     }
//     if (signal.ice) {
//       connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(console.log);
//     }
//   };

//   const connectToSocketServer = () => {
//     socketRef.current = io.connect(server_url, { secure: false });

//     socketRef.current.on('signal', gotMessageFromServer);

//     socketRef.current.on('connect', () => {
//       socketRef.current.emit('join-call', window.location.href);
//       socketIdRef.current = socketRef.current.id;

//       socketRef.current.on('chat-message', addMessage);
//       socketRef.current.on('user-left', (id) => {
//         setVideos((vs) => vs.filter((v) => v.socketId !== id));
//       });

//       socketRef.current.on('user-joined', (id, clients) => {
//         clients.forEach((socketListId) => {
//           connections[socketListId] = new RTCPeerConnection(peerConfigConnections);

//           connections[socketListId].onicecandidate = (event) => {
//             if (event.candidate) {
//               socketRef.current.emit('signal', socketListId, JSON.stringify({ ice: event.candidate }));
//             }
//           };

//           connections[socketListId].onaddstream = (event) => {
//             const exists = videoRef.current.find((v) => v.socketId === socketListId);
//             if (exists) {
//               setVideos((curr) => {
//                 const updated = curr.map((v) =>
//                   v.socketId === socketListId ? { ...v, stream: event.stream } : v
//                 );
//                 videoRef.current = updated;
//                 return updated;
//               });
//             } else {
//               const newVideo = {
//                 socketId: socketListId,
//                 stream: event.stream,
//                 autoplay: true,
//                 playsinline: true,
//               };
//               setVideos((curr) => {
//                 const updated = [...curr, newVideo];
//                 videoRef.current = updated;
//                 return updated;
//               });
//             }
//           };

//           // add local stream if present
//           if (window.localStream) {
//             connections[socketListId].addStream(window.localStream);
//           } else {
//             const blackSilence = (...args) => new MediaStream([black(...args), silence()]);
//             window.localStream = blackSilence();
//             connections[socketListId].addStream(window.localStream);
//           }
//         });

//         if (id === socketIdRef.current) {
//           for (let id2 in connections) {
//             if (id2 === socketIdRef.current) continue;
//             try {
//               connections[id2].addStream(window.localStream);
//             } catch {}
//             connections[id2].createOffer().then((description) => {
//               connections[id2]
//                 .setLocalDescription(description)
//                 .then(() => {
//                   socketRef.current.emit('signal', id2, JSON.stringify({ sdp: connections[id2].localDescription }));
//                 })
//                 .catch(console.log);
//             });
//           }
//         }
//       });
//     });
//   };

//   // —————————————————————————————————————
//   // Chat
//   // —————————————————————————————————————
//   const addMessage = (data, sender, socketIdSender) => {
//     setMessages((prev) => [...prev, { sender, data }]);
//     if (socketIdSender !== socketIdRef.current) {
//       setNewMessages((n) => n + 1);
//     }
//   };

//   // —————————————————————————————————————
//   // Utils for fallback tracks
//   // —————————————————————————————————————
//   const silence = () => {
//     const ctx = new AudioContext();
//     const oscillator = ctx.createOscillator();
//     const dst = oscillator.connect(ctx.createMediaStreamDestination());
//     oscillator.start();
//     ctx.resume();
//     return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
//   };

//   const black = ({ width = 640, height = 480 } = {}) => {
//     const canvas = Object.assign(document.createElement("canvas"), { width, height });
//     canvas.getContext("2d").fillRect(0, 0, width, height);
//     const stream = canvas.captureStream();
//     return Object.assign(stream.getVideoTracks()[0], { enabled: false });
//   };

//   // —————————————————————————————————————
//   // Render
//   // —————————————————————————————————————
//   return (
//     <div>
//       {askForUsername ? (
//         <div className={styles.lobby}>
//           <h2>Enter the Lobby</h2>
//           <TextField
//             label="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             variant="outlined"
//           />
//           <Button variant="contained" onClick={connect} sx={{ mt: 1 }}>
//             Connect
//           </Button>

//           <div className={styles.previewWrap}>
//             <video ref={localVideoref} autoPlay muted className={styles.previewVideo} />
//           </div>
//         </div>
//       ) : (
//         <div className={styles.meetVideoContainer}>
//           {/* Chat drawer */}
//           {showModal && (
//             <div className={styles.chatRoom}>
//               <div className={styles.chatContainer}>
//                 <h1>Chat</h1>

//                 <div className={styles.chattingDisplay}>
//                   {messages.length ? (
//                     messages.map((item, index) => (
//                       <div style={{ marginBottom: 16 }} key={index}>
//                         <p style={{ fontWeight: 600 }}>{item.sender}</p>
//                         <p>{item.data}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No Messages Yet</p>
//                   )}
//                 </div>

//                 <div className={styles.chattingArea}>
//                   <TextField
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     label="Type a message"
//                     variant="outlined"
//                     size="small"
//                   />
//                   <Button variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>
//                     Send
//                   </Button>
//                   <Button onClick={closeChat} sx={{ ml: 1 }}>
//                     Close
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Control bar */}
//           <div className={styles.buttonContainers}>
//             <IconButton onClick={handleVideo} className={styles.ctrlBtn}>
//               {video ? <VideocamIcon /> : <VideocamOffIcon />}
//             </IconButton>

//             <IconButton onClick={handleEndCall} className={styles.hangupBtn}>
//               <CallEndIcon />
//             </IconButton>

//             <IconButton onClick={handleAudio} className={styles.ctrlBtn}>
//               {audio ? <MicIcon /> : <MicOffIcon />}
//             </IconButton>

//             {screenAvailable && (
//               <IconButton onClick={handleScreen} className={styles.ctrlBtn}>
//                 {screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}
//               </IconButton>
//             )}

//             <Badge badgeContent={newMessages} max={999} color="error">
//               <IconButton onClick={openChat} className={styles.ctrlBtn}>
//                 <ChatIcon />
//               </IconButton>
//             </Badge>
//           </div>

//           {/* Local video */}
//           <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted />

//           {/* Remote videos */}
//           <div className={styles.conferenceView}>
//             {videos.map((v) => (
//               <div key={v.socketId}>
//                 <video
//                   data-socket={v.socketId}
//                   ref={(ref) => {
//                     if (ref && v.stream) ref.srcObject = v.stream;
//                   }}
//                   autoPlay
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//avg page no beautiful ui 

// import React, { useEffect, useRef, useState } from 'react';
// import io from "socket.io-client";
// import { Badge, IconButton, TextField, Button } from '@mui/material';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import CallEndIcon from '@mui/icons-material/CallEnd';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
// import ChatIcon from '@mui/icons-material/Chat';
// import styles from "../styles/videoComponent.module.css";
// import server from '../environment';

// const server_url = server;
// const peerConfigConnections = {
//   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// };

// let connections = {};

// export default function VideoMeetComponent() {
//   const socketRef = useRef();
//   const socketIdRef = useRef();
//   const localVideoref = useRef();

//   const [videoAvailable, setVideoAvailable] = useState(true);
//   const [audioAvailable, setAudioAvailable] = useState(true);
//   const [video, setVideo] = useState();
//   const [audio, setAudio] = useState();
//   const [screen, setScreen] = useState(false);
//   const [showModal, setModal] = useState(false);
//   const [screenAvailable, setScreenAvailable] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [newMessages, setNewMessages] = useState(0);
//   const [askForUsername, setAskForUsername] = useState(true);
//   const [username, setUsername] = useState("");
//   const videoRef = useRef([]);
//   const [videos, setVideos] = useState([]);

//   // ===========================
//   // 🔥 CLEANUP ON UNMOUNT
//   // ===========================
//   useEffect(() => {
//     return () => {
//       try {
//         const tracks = localVideoref.current?.srcObject?.getTracks() || [];
//         tracks.forEach((t) => t.stop());
//         window.localStream?.getTracks().forEach((t) => t.stop());
//       } catch (err) {
//         console.log("Cleanup error:", err);
//       }
//     };
//   }, []);

//   // ===========================
//   // Permissions
//   // ===========================
//   useEffect(() => {
//     const getPermissions = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setVideoAvailable(true);
//         setAudioAvailable(true);
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
//         window.localStream = stream;
//         if (localVideoref.current) localVideoref.current.srcObject = stream;
//       } catch {
//         try {
//           await navigator.mediaDevices.getUserMedia({ video: true });
//           setVideoAvailable(true);
//         } catch {
//           setVideoAvailable(false);
//         }
//         try {
//           await navigator.mediaDevices.getUserMedia({ audio: true });
//           setAudioAvailable(true);
//         } catch {
//           setAudioAvailable(false);
//         }
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
//       }
//     };
//     getPermissions();
//   }, []);

//   useEffect(() => {
//     if (typeof video === "boolean" && typeof audio === "boolean") {
//       getUserMedia();
//     }
//   }, [video, audio]);

//   const handleVideo = () => setVideo((v) => !v);
//   const handleAudio = () => setAudio((a) => !a);

//   const handleScreen = () => setScreen((s) => !s);

//   const handleEndCall = () => {
//     try {
//       const tracks = localVideoref.current?.srcObject?.getTracks() || [];
//       tracks.forEach((t) => t.stop());
//       window.localStream?.getTracks().forEach((t) => t.stop());
//     } catch {}
//     window.location.href = "/home";
//   };

//   const openChat = () => {
//     setModal(true);
//     setNewMessages(0);
//   };

//   const closeChat = () => setModal(false);

//   const sendMessage = () => {
//     if (!message.trim()) return;
//     socketRef.current?.emit('chat-message', message, username);
//     setMessage("");
//   };

//   const connect = () => {
//     setAskForUsername(false);
//     setVideo(videoAvailable);
//     setAudio(audioAvailable);
//     connectToSocketServer();
//   };

//   const getUserMedia = () => {
//     if ((video && videoAvailable) || (audio && audioAvailable)) {
//       navigator.mediaDevices
//         .getUserMedia({ video, audio })
//         .then(getUserMediaSuccess)
//         .catch(console.log);
//     } else {
//       try {
//         const tracks = localVideoref.current?.srcObject?.getTracks() || [];
//         tracks.forEach((t) => t.stop());
//       } catch {}
//     }
//   };

//   const getUserMediaSuccess = (stream) => {
//     try {
//       window.localStream?.getTracks().forEach((t) => t.stop());
//     } catch {}

//     window.localStream = stream;
//     if (localVideoref.current) localVideoref.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       pc.addStream(window.localStream);
//       pc.createOffer().then((description) => {
//         pc.setLocalDescription(description)
//           .then(() => {
//             socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription }));
//           })
//           .catch(console.log);
//       });
//     }
//   };

//   const getDisplayMedia = () => {
//     if (!screen || !navigator.mediaDevices.getDisplayMedia) return;
//     navigator.mediaDevices
//       .getDisplayMedia({ video: true, audio: true })
//       .then(getDisplayMediaSuccess)
//       .catch(console.log);
//   };

//   const getDisplayMediaSuccess = (stream) => {
//     try {
//       window.localStream?.getTracks().forEach((t) => t.stop());
//     } catch {}

//     window.localStream = stream;
//     if (localVideoref.current) localVideoref.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       pc.addStream(window.localStream);
//       pc.createOffer().then((description) => {
//         pc.setLocalDescription(description)
//           .then(() => {
//             socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription }));
//           })
//           .catch(console.log);
//       });
//     }

//     stream.getTracks().forEach((track) => {
//       track.onended = () => {
//         setScreen(false);
//         try {
//           const tracks = localVideoref.current?.srcObject?.getTracks() || [];
//           tracks.forEach((t) => t.stop());
//         } catch {}
//         getUserMedia();
//       };
//     });
//   };

//   useEffect(() => {
//     if (screen) getDisplayMedia();
//   }, [screen]);

//   const gotMessageFromServer = (fromId, message) => {
//     const signal = JSON.parse(message);
//     if (fromId === socketIdRef.current) return;

//     if (signal.sdp) {
//       connections[fromId]
//         .setRemoteDescription(new RTCSessionDescription(signal.sdp))
//         .then(() => {
//           if (signal.sdp.type === 'offer') {
//             connections[fromId].createAnswer().then((description) => {
//               connections[fromId]
//                 .setLocalDescription(description)
//                 .then(() => {
//                   socketRef.current.emit('signal', fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
//                 })
//                 .catch(console.log);
//             });
//           }
//         })
//         .catch(console.log);
//     }
//     if (signal.ice) {
//       connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(console.log);
//     }
//   };

//   const connectToSocketServer = () => {
//     socketRef.current = io.connect(server_url, { secure: false });
//     socketRef.current.on('signal', gotMessageFromServer);
//     socketRef.current.on('connect', () => {
//       socketRef.current.emit('join-call', window.location.href);
//       socketIdRef.current = socketRef.current.id;

//       socketRef.current.on('chat-message', addMessage);
//       socketRef.current.on('user-left', (id) => {
//         setVideos((vs) => vs.filter((v) => v.socketId !== id));
//       });

//       socketRef.current.on('user-joined', (id, clients) => {
//         clients.forEach((socketListId) => {
//           connections[socketListId] = new RTCPeerConnection(peerConfigConnections);

//           connections[socketListId].onicecandidate = (event) => {
//             if (event.candidate) {
//               socketRef.current.emit('signal', socketListId, JSON.stringify({ ice: event.candidate }));
//             }
//           };

//           connections[socketListId].onaddstream = (event) => {
//             const exists = videoRef.current.find((v) => v.socketId === socketListId);
//             if (exists) {
//               setVideos((curr) => {
//                 const updated = curr.map((v) =>
//                   v.socketId === socketListId ? { ...v, stream: event.stream } : v
//                 );
//                 videoRef.current = updated;
//                 return updated;
//               });
//             } else {
//               const newVideo = {
//                 socketId: socketListId,
//                 stream: event.stream,
//                 autoplay: true,
//                 playsinline: true,
//               };
//               setVideos((curr) => {
//                 const updated = [...curr, newVideo];
//                 videoRef.current = updated;
//                 return updated;
//               });
//             }
//           };

//           if (window.localStream) {
//             connections[socketListId].addStream(window.localStream);
//           }
//         });
//       });
//     });
//   };

//   const addMessage = (data, sender, socketIdSender) => {
//     setMessages((prev) => [...prev, { sender, data }]);
//     if (socketIdSender !== socketIdRef.current) {
//       setNewMessages((n) => n + 1);
//     }
//   };

//   return (
//     <div>
//       {askForUsername ? (
//         <div className={styles.lobby}>
//           <h2>Enter the Lobby</h2>
//           <TextField
//             label="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             variant="outlined"
//           />
//           <Button variant="contained" onClick={connect} sx={{ mt: 1 }}>
//             Connect
//           </Button>
//           <div className={styles.previewWrap}>
//             <video ref={localVideoref} autoPlay muted className={styles.previewVideo} />
//           </div>
//         </div>
//       ) : (
//         <div className={styles.meetVideoContainer}>
//           {showModal && (
//             <div className={styles.chatRoom}>
//               <div className={styles.chatContainer}>
//                 <h1>Chat</h1>
//                 <div className={styles.chattingDisplay}>
//                   {messages.length ? (
//                     messages.map((item, index) => (
//                       <div style={{ marginBottom: 16 }} key={index}>
//                         <p style={{ fontWeight: 600 }}>{item.sender}</p>
//                         <p>{item.data}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No Messages Yet</p>
//                   )}
//                 </div>
//                 <div className={styles.chattingArea}>
//                   <TextField
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     label="Type a message"
//                     variant="outlined"
//                     size="small"
//                   />
//                   <Button variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>
//                     Send
//                   </Button>
//                   <Button onClick={closeChat} sx={{ ml: 1 }}>
//                     Close
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className={styles.buttonContainers}>
//             <IconButton onClick={handleVideo} className={styles.ctrlBtn}>
//               {video ? <VideocamIcon /> : <VideocamOffIcon />}
//             </IconButton>
//             <IconButton onClick={handleEndCall} className={styles.hangupBtn}>
//               <CallEndIcon />
//             </IconButton>
//             <IconButton onClick={handleAudio} className={styles.ctrlBtn}>
//               {audio ? <MicIcon /> : <MicOffIcon />}
//             </IconButton>
//             {screenAvailable && (
//               <IconButton onClick={handleScreen} className={styles.ctrlBtn}>
//                 {screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}
//               </IconButton>
//             )}
//             <Badge badgeContent={newMessages} max={999} color="error">
//               <IconButton onClick={openChat} className={styles.ctrlBtn}>
//                 <ChatIcon />
//               </IconButton>
//             </Badge>
//           </div>

//           <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted />

//           <div className={styles.conferenceView}>
//             {videos.map((v) => (
//               <div key={v.socketId}>
//                 <video
//                   data-socket={v.socketId}
//                   ref={(ref) => {
//                     if (ref && v.stream) ref.srcObject = v.stream;
//                   }}
//                   autoPlay
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


  // this is good ui  but we are adding some validation username issues


// import React, { useEffect, useRef, useState } from 'react';
// import io from "socket.io-client";
// import Draggable from 'react-draggable';
// import { Badge, IconButton, TextField, Button } from '@mui/material';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import CallEndIcon from '@mui/icons-material/CallEnd';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
// import ChatIcon from '@mui/icons-material/Chat';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import styles from "../styles/videoComponent.module.css";
// import server from '../environment';

// const server_url = server;
// const peerConfigConnections = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
// let connections = {};

// export default function VideoMeetComponent() {
//   const socketRef = useRef();
//   const socketIdRef = useRef();
//   const localVideoref = useRef();
//   const videoRef = useRef([]);

//   const [videoAvailable, setVideoAvailable] = useState(true);
//   const [audioAvailable, setAudioAvailable] = useState(true);
//   const [video, setVideo] = useState();
//   const [audio, setAudio] = useState();
//   const [screen, setScreen] = useState(false);
//   const [screenAvailable, setScreenAvailable] = useState(false);
//   const [showModal, setModal] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [newMessages, setNewMessages] = useState(0);
//   const [askForUsername, setAskForUsername] = useState(true);
//   const [username, setUsername] = useState("");
//   const [videos, setVideos] = useState([]);

//   // ===================== Cleanup on unmount =====================
//   useEffect(() => {
//     return () => {
//       try {
//         const tracks = localVideoref.current?.srcObject?.getTracks() || [];
//         tracks.forEach((t) => t.stop());
//         window.localStream?.getTracks().forEach((t) => t.stop());
//       } catch {}
//     };
//   }, []);

//   // ===================== Permissions =====================
//   useEffect(() => {
//     const getPermissions = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setVideoAvailable(true);
//         setAudioAvailable(true);
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
//         window.localStream = stream;
//         if (localVideoref.current) localVideoref.current.srcObject = stream;
//       } catch {
//         try {
//           await navigator.mediaDevices.getUserMedia({ video: true });
//           setVideoAvailable(true);
//         } catch { setVideoAvailable(false); }
//         try {
//           await navigator.mediaDevices.getUserMedia({ audio: true });
//           setAudioAvailable(true);
//         } catch { setAudioAvailable(false); }
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
//       }
//     };
//     getPermissions();
//   }, []);

//   useEffect(() => {
//     if (typeof video === "boolean" && typeof audio === "boolean") {
//       getUserMedia();
//     }
//   }, [video, audio]);

//   // ===================== Handlers =====================
//   const handleVideo = () => setVideo((v) => !v);
//   const handleAudio = () => setAudio((a) => !a);
//   const handleScreen = () => setScreen((s) => !s);
//   const handleEndCall = () => {
//     try {
//       const tracks = localVideoref.current?.srcObject?.getTracks() || [];
//       tracks.forEach((t) => t.stop());
//       window.localStream?.getTracks().forEach((t) => t.stop());
//     } catch {}
//     window.location.href = "/home";
//   };
//   const openChat = () => { setModal(true); setNewMessages(0); };
//   const closeChat = () => setModal(false);
//   const sendMessage = () => {
//     if (!message.trim()) return;
//     socketRef.current?.emit('chat-message', message, username);
//     setMessage("");
//   };
//   const connect = () => { setAskForUsername(false); setVideo(videoAvailable); setAudio(audioAvailable); connectToSocketServer(); };

//   // ===================== User Media =====================
//   const getUserMedia = () => {
//     if ((video && videoAvailable) || (audio && audioAvailable)) {
//       navigator.mediaDevices.getUserMedia({ video, audio }).then(getUserMediaSuccess).catch(console.log);
//     } else {
//       try { const tracks = localVideoref.current?.srcObject?.getTracks() || []; tracks.forEach((t) => t.stop()); } catch {}
//     }
//   };

//   const getUserMediaSuccess = (stream) => {
//     try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     window.localStream = stream;
//     if (localVideoref.current) localVideoref.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       pc.addStream(window.localStream);
//       pc.createOffer().then((description) => {
//         pc.setLocalDescription(description)
//           .then(() => socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription })))
//           .catch(console.log);
//       });
//     }
//   };

//   const getDisplayMedia = () => {
//     if (!screen || !navigator.mediaDevices.getDisplayMedia) return;
//     navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(getDisplayMediaSuccess).catch(console.log);
//   };

//   const getDisplayMediaSuccess = (stream) => {
//     try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     window.localStream = stream;
//     if (localVideoref.current) localVideoref.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       pc.addStream(window.localStream);
//       pc.createOffer().then((description) => {
//         pc.setLocalDescription(description)
//           .then(() => socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription })))
//           .catch(console.log);
//       });
//     }

//     stream.getTracks().forEach((track) => {
//       track.onended = () => {
//         setScreen(false);
//         try { const tracks = localVideoref.current?.srcObject?.getTracks() || []; tracks.forEach((t) => t.stop()); } catch {}
//         getUserMedia();
//       };
//     });
//   };

//   useEffect(() => { if (screen) getDisplayMedia(); }, [screen]);

//   const gotMessageFromServer = (fromId, message) => {
//     const signal = JSON.parse(message);
//     if (fromId === socketIdRef.current) return;

//     if (signal.sdp) {
//       connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
//         if (signal.sdp.type === 'offer') {
//           connections[fromId].createAnswer().then((description) => {
//             connections[fromId].setLocalDescription(description).then(() => {
//               socketRef.current.emit('signal', fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
//             }).catch(console.log);
//           });
//         }
//       }).catch(console.log);
//     }
//     if (signal.ice) {
//       connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(console.log);
//     }
//   };

//   // ===================== Socket Connections =====================
//   const connectToSocketServer = () => {
//     socketRef.current = io.connect(server_url, { secure: false });
//     socketRef.current.on('signal', gotMessageFromServer);

//     socketRef.current.on('connect', () => {
//       socketRef.current.emit('join-call', window.location.href);
//       socketIdRef.current = socketRef.current.id;

//       socketRef.current.on('chat-message', addMessage);
//       socketRef.current.on('user-left', (id) => setVideos((vs) => vs.filter((v) => v.socketId !== id)));

//       socketRef.current.on('user-joined', (id, clients) => {
//         clients.forEach((socketListId) => {
//           connections[socketListId] = new RTCPeerConnection(peerConfigConnections);

//           connections[socketListId].onicecandidate = (event) => {
//             if (event.candidate) socketRef.current.emit('signal', socketListId, JSON.stringify({ ice: event.candidate }));
//           };

//           connections[socketListId].onaddstream = (event) => {
//             const exists = videoRef.current.find((v) => v.socketId === socketListId);
//             if (exists) {
//               setVideos((curr) => {
//                 const updated = curr.map((v) => v.socketId === socketListId ? { ...v, stream: event.stream } : v);
//                 videoRef.current = updated;
//                 return updated;
//               });
//             } else {
//               const newVideo = { socketId: socketListId, stream: event.stream, autoplay: true, playsinline: true };
//               setVideos((curr) => { const updated = [...curr, newVideo]; videoRef.current = updated; return updated; });
//             }
//           };

//           if (window.localStream) connections[socketListId].addStream(window.localStream);
//         });
//       });
//     });
//   };

//   const addMessage = (data, sender, socketIdSender) => {
//     setMessages((prev) => [...prev, { sender, data }]);
//     if (socketIdSender !== socketIdRef.current) setNewMessages((n) => n + 1);
//   };

//   return (
//     <div>
//       {askForUsername ? (
//         <div className={styles.lobby}>
//           <h2>Enter the Lobby</h2>
//           <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" />
//           <Button variant="contained" onClick={connect} sx={{ mt: 1 }}>Connect</Button>
//           <div className={styles.previewWrap}>
//             <video ref={localVideoref} autoPlay muted className={styles.previewVideo} />
//           </div>
//         </div>
//       ) : (
//         <div className={styles.meetVideoContainer}>
//           {/* Back button */}
//           <IconButton onClick={() => window.location.href = "/home"} className={styles.backButton}>
//             <ArrowBackIcon style={{ color: "#fff" }} />
//           </IconButton>

//           {/* Chat */}
//           {showModal && (
//             <div className={styles.chatRoom}>
//               <div className={styles.chatContainer}>
//                 <h1>Chat</h1>
//                 <div className={styles.chattingDisplay}>
//                   {messages.length ? messages.map((item, index) => (
//                     <div style={{ marginBottom: 16 }} key={index}>
//                       <p style={{ fontWeight: 600 }}>{item.sender}</p>
//                       <p>{item.data}</p>
//                     </div>
//                   )) : <p>No Messages Yet</p>}
//                 </div>
//                 <div className={styles.chattingArea}>
//                   <TextField value={message} onChange={(e) => setMessage(e.target.value)} label="Type a message" variant="outlined" size="small" />
//                   <Button variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>Send</Button>
//                   <Button onClick={closeChat} sx={{ ml: 1 }}>Close</Button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Controls */}
//           <div className={styles.buttonContainers}>
//             <IconButton onClick={handleVideo} className={styles.ctrlBtn}>{video ? <VideocamIcon /> : <VideocamOffIcon />}</IconButton>
//             <IconButton onClick={handleEndCall} className={styles.hangupBtn}><CallEndIcon /></IconButton>
//             <IconButton onClick={handleAudio} className={styles.ctrlBtn}>{audio ? <MicIcon /> : <MicOffIcon />}</IconButton>
//             {screenAvailable && <IconButton onClick={handleScreen} className={styles.ctrlBtn}>{screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}</IconButton>}
//             <Badge badgeContent={newMessages} max={999} color="error">
//               <IconButton onClick={openChat} className={styles.ctrlBtn}><ChatIcon /></IconButton>
//             </Badge>
//           </div>

//           {/* Draggable local video */}
//           <Draggable bounds="parent">
//             <video ref={localVideoref} autoPlay muted className={styles.meetUserVideo} />
//           </Draggable>

//           {/* Remote videos */}
//           <div className={styles.conferenceView}>
//             {videos.map((v) => (
//               <div key={v.socketId}>
//                 <video
//                   data-socket={v.socketId}
//                   ref={(ref) => { if (ref && v.stream) ref.srcObject = v.stream; }}
//                   autoPlay
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


//this is final page
// import React, { useEffect, useRef, useState } from 'react';
// import io from "socket.io-client";
// import { Badge, IconButton, TextField, Button } from '@mui/material';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import CallEndIcon from '@mui/icons-material/CallEnd';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
// import ChatIcon from '@mui/icons-material/Chat';
// import styles from "../styles/videoComponent.module.css";
// import server from '../environment';

// const server_url = server;
// const peerConfigConnections = {
//   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// };

// let connections = {};

// export default function VideoMeetComponent() {
//   const socketRef = useRef();
//   const socketIdRef = useRef();
//   const localVideoref = useRef();
//   const draggableVideoRef = useRef();

//   const [videoAvailable, setVideoAvailable] = useState(true);
//   const [audioAvailable, setAudioAvailable] = useState(true);
//   const [video, setVideo] = useState();
//   const [audio, setAudio] = useState();
//   const [screen, setScreen] = useState(false);
//   const [showModal, setModal] = useState(false);
//   const [screenAvailable, setScreenAvailable] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [newMessages, setNewMessages] = useState(0);
//   const [askForUsername, setAskForUsername] = useState(true);
//   const [username, setUsername] = useState("");
//   const [videos, setVideos] = useState([]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch (err) { console.log("Cleanup error:", err); }
//     };
//   }, []);

//   // Permissions
//   useEffect(() => {
//     const getPermissions = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setVideoAvailable(true);
//         setAudioAvailable(true);
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
//         window.localStream = stream;
//         if (localVideoref.current) localVideoref.current.srcObject = stream;
//       } catch {
//         try { await navigator.mediaDevices.getUserMedia({ video: true }); setVideoAvailable(true); } catch { setVideoAvailable(false); }
//         try { await navigator.mediaDevices.getUserMedia({ audio: true }); setAudioAvailable(true); } catch { setAudioAvailable(false); }
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
//       }
//     };
//     getPermissions();
//   }, []);

//   useEffect(() => {
//     if (typeof video === "boolean" && typeof audio === "boolean") { getUserMedia(); }
//   }, [video, audio]);

//   const handleVideo = () => setVideo((v) => !v);
//   const handleAudio = () => setAudio((a) => !a);
//   const handleScreen = () => setScreen((s) => !s);

//   const handleEndCall = () => {
//     try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     window.location.href = "/home";
//   };

//   const openChat = () => { setModal(true); setNewMessages(0); };
//   const closeChat = () => setModal(false);

//   const sendMessage = () => {
//     if (!message.trim()) return;
//     socketRef.current?.emit('chat-message', message, username);
//     setMessage("");
//   };

//   const connect = () => {
//     if (!username.trim()) { alert("Please enter a username!"); return; }
//     setAskForUsername(false);
//     setVideo(videoAvailable);
//     setAudio(audioAvailable);
//     connectToSocketServer();
//   };

//   const getUserMedia = () => {
//     if ((video && videoAvailable) || (audio && audioAvailable)) {
//       navigator.mediaDevices.getUserMedia({ video, audio }).then(getUserMediaSuccess).catch(console.log);
//     } else {
//       try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     }
//   };

//   const getUserMediaSuccess = (stream) => {
//     try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     window.localStream = stream;
//     if (draggableVideoRef.current) draggableVideoRef.current.srcObject = stream;
//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       pc.addStream(window.localStream);
//       pc.createOffer().then((description) => {
//         pc.setLocalDescription(description)
//           .then(() => { socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription })); })
//           .catch(console.log);
//       });
//     }
//   };

//   const getDisplayMedia = () => {
//     if (!screen || !navigator.mediaDevices.getDisplayMedia) return;
//     navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(getDisplayMediaSuccess).catch(console.log);
//   };

//   const getDisplayMediaSuccess = (stream) => {
//     try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     window.localStream = stream;
//     if (draggableVideoRef.current) draggableVideoRef.current.srcObject = stream;
//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       pc.addStream(window.localStream);
//       pc.createOffer().then((description) => {
//         pc.setLocalDescription(description)
//           .then(() => { socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription })); })
//           .catch(console.log);
//       });
//     }
//     stream.getTracks().forEach((track) => {
//       track.onended = () => {
//         setScreen(false);
//         try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//         getUserMedia();
//       };
//     });
//   };

//   useEffect(() => { if (screen) getDisplayMedia(); }, [screen]);

//   const gotMessageFromServer = (fromId, message) => {
//     const signal = JSON.parse(message);
//     if (fromId === socketIdRef.current) return;
//     if (!connections[fromId]) return;
//     if (signal.sdp) {
//       connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
//         if (signal.sdp.type === 'offer') {
//           connections[fromId].createAnswer().then((description) => {
//             connections[fromId].setLocalDescription(description).then(() => {
//               socketRef.current.emit('signal', fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
//             }).catch(console.log);
//           });
//         }
//       }).catch(console.log);
//     }
//     if (signal.ice) { connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(console.log); }
//   };

//   const connectToSocketServer = () => {
//     socketRef.current = io.connect(server_url, { secure: false });
//     socketRef.current.on('signal', gotMessageFromServer);
//     socketRef.current.on('connect', () => {
//       socketRef.current.emit('join-call', window.location.href);
//       socketIdRef.current = socketRef.current.id;
//       socketRef.current.on('chat-message', addMessage);
//       socketRef.current.on('user-left', (id) => { setVideos((vs) => vs.filter((v) => v.socketId !== id)); });
//       socketRef.current.on('user-joined', (id, clients) => {
//         clients.forEach((socketListId) => {
//           connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
//           connections[socketListId].onicecandidate = (event) => {
//             if (event.candidate) { socketRef.current.emit('signal', socketListId, JSON.stringify({ ice: event.candidate })); }
//           };
//           connections[socketListId].onaddstream = (event) => {
//             setVideos((curr) => {
//               const exists = curr.find((v) => v.socketId === socketListId);
//               if (exists) { return curr.map((v) => v.socketId === socketListId ? { ...v, stream: event.stream } : v); }
//               else { return [...curr, { socketId: socketListId, stream: event.stream, autoplay: true, playsinline: true }]; }
//             });
//           };
//           if (window.localStream) { connections[socketListId].addStream(window.localStream); }
//         });
//       });
//     });
//   };

//   const addMessage = (data, sender, socketIdSender) => {
//     setMessages((prev) => [...prev, { sender, data }]);
//     if (socketIdSender !== socketIdRef.current) { setNewMessages((n) => n + 1); }
//   };

//   const dragVideo = (event) => {
//     const video = event.currentTarget;
//     let shiftX = event.clientX - video.getBoundingClientRect().left;
//     let shiftY = event.clientY - video.getBoundingClientRect().top;
//     video.style.position = 'absolute';
//     video.style.zIndex = 1000;
//     function moveAt(pageX, pageY) {
//       const minX = 0, minY = 0, maxX = window.innerWidth - video.offsetWidth, maxY = window.innerHeight - video.offsetHeight;
//       let newX = pageX - shiftX, newY = pageY - shiftY;
//       if (newX < minX) newX = minX;
//       if (newY < minY) newY = minY;
//       if (newX > maxX) newX = maxX;
//       if (newY > maxY) newY = maxY;
//       video.style.left = newX + 'px';
//       video.style.top = newY + 'px';
//     }
//     moveAt(event.pageX, event.pageY);
//     function onMouseMove(event) { moveAt(event.pageX, event.pageY); }
//     document.addEventListener('mousemove', onMouseMove);
//     video.onmouseup = function () { document.removeEventListener('mousemove', onMouseMove); video.onmouseup = null; };
//     video.ondragstart = function () { return false; };
//   };

//   return (
//     <div>
//       {askForUsername ? (
//         <div className={styles.lobby}>
//           {/* Back to Home Button */}
//           <Button
//             variant="contained"
//             color="secondary"
//             sx={{ position: "absolute", top: 20, left: 20, zIndex: 1000 }}
//             onClick={() => { window.location.href = "/home"; }}
//           >
//             Back to Home
//           </Button>

//           <h2>Enter the Lobby</h2>
//           <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" />
//           <Button variant="contained" onClick={connect} sx={{ mt: 1 }}>Connect</Button>
//           <div className={styles.previewWrap}>
//             <video ref={localVideoref} autoPlay muted className={styles.previewVideo} />
//           </div>
//         </div>
//       ) : (
//         <div className={styles.meetVideoContainer}>
//           {showModal && (
//             <div className={styles.chatRoom}>
//               <div className={styles.chatContainer}>
//                 <h1>Chat</h1>
//                 <div className={styles.chattingDisplay}>
//                   {messages.length ? messages.map((item, index) => (
//                     <div style={{ marginBottom: 16 }} key={index}>
//                       <p style={{ fontWeight: 600 }}>{item.sender}</p>
//                       <p>{item.data}</p>
//                     </div>
//                   )) : <p>No Messages Yet</p>}
//                 </div>
//                 <div className={styles.chattingArea}>
//                   <TextField value={message} onChange={(e) => setMessage(e.target.value)} label="Type a message" variant="outlined" size="small" />
//                   <Button variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>Send</Button>
//                   <Button onClick={closeChat} sx={{ ml: 1 }}>Close</Button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className={styles.buttonContainers}>
//             <IconButton onClick={handleVideo} className={styles.ctrlBtn}>{video ? <VideocamIcon /> : <VideocamOffIcon />}</IconButton>
//             <IconButton onClick={handleEndCall} className={styles.hangupBtn}><CallEndIcon /></IconButton>
//             <IconButton onClick={handleAudio} className={styles.ctrlBtn}>{audio ? <MicIcon /> : <MicOffIcon />}</IconButton>
//             {screenAvailable && <IconButton onClick={handleScreen} className={styles.ctrlBtn}>{screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}</IconButton>}
//             <Badge badgeContent={newMessages} max={999} color="error">
//               <IconButton onClick={openChat} className={styles.ctrlBtn}><ChatIcon /></IconButton>
//             </Badge>
//           </div>

//           <video className={styles.meetUserVideo} ref={draggableVideoRef} autoPlay muted style={{ cursor: "grab" }} onMouseDown={dragVideo} />

//           <div className={styles.conferenceView}>
//             {videos.map((v) => (
//               <div key={v.socketId}>
//                 <video data-socket={v.socketId} ref={(ref) => { if (ref && v.stream) ref.srcObject = v.stream; }} autoPlay />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// without whiteboard jsx


// import React, { useEffect, useRef, useState } from 'react';
// import io from "socket.io-client";
// import { Badge, IconButton, TextField, Button } from '@mui/material';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import CallEndIcon from '@mui/icons-material/CallEnd';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
// import ChatIcon from '@mui/icons-material/Chat';
// import { Player } from '@lottiefiles/react-lottie-player';
// import styles from "../styles/videoComponent.module.css";
// import server from '../environment';

// const server_url = server;
// const peerConfigConnections = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
// let connections = {};

// export default function VideoMeetComponent() {
//   const socketRef = useRef();
//   const socketIdRef = useRef();
//   const localVideoref = useRef();
//   const draggableVideoRef = useRef();
//   const chatRef = useRef();

//   const [videoAvailable, setVideoAvailable] = useState(true);
//   const [audioAvailable, setAudioAvailable] = useState(true);
//   const [video, setVideo] = useState();
//   const [audio, setAudio] = useState();
//   const [screen, setScreen] = useState(false);
//   const [showModal, setModal] = useState(false);
//   const [screenAvailable, setScreenAvailable] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [newMessages, setNewMessages] = useState(0);
//   const [askForUsername, setAskForUsername] = useState(true);
//   const [username, setUsername] = useState("");
//   const [videos, setVideos] = useState([]);
  
//   const [chatPos, setChatPos] = useState({ x: 0, y: 0 });
//   const [videoPos, setVideoPos] = useState({ x: window.innerWidth - 270, y: 80 });

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     };
//   }, []);

//   // Permissions
//   useEffect(() => {
//     const getPermissions = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setVideoAvailable(true); setAudioAvailable(true);
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
//         window.localStream = stream;
//         if (localVideoref.current) localVideoref.current.srcObject = stream;
//       } catch {
//         try { await navigator.mediaDevices.getUserMedia({ video: true }); setVideoAvailable(true); } catch { setVideoAvailable(false); }
//         try { await navigator.mediaDevices.getUserMedia({ audio: true }); setAudioAvailable(true); } catch { setAudioAvailable(false); }
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
//       }
//     };
//     getPermissions();
//   }, []);

//   useEffect(() => { if (typeof video === "boolean" && typeof audio === "boolean") getUserMedia(); }, [video, audio]);

//   const handleVideo = () => setVideo((v) => !v);
//   const handleAudio = () => setAudio((a) => !a);
//   const handleScreen = () => setScreen((s) => !s);
//   const handleEndCall = () => { try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {} window.location.href = "/home"; };
//   const openChat = () => { setModal(true); setNewMessages(0); };
//   const closeChat = () => setModal(false);

//   // --- Send text message ---
//   const sendMessage = () => {
//     if (!message.trim()) return;
//     socketRef.current?.emit('chat-message', message, username);
//     setMessage("");
//   };

//   // --- Send emoji as chat message ---
//   const sendEmoji = (emoji) => {
//     socketRef.current?.emit('chat-message', emoji, username);
//   };

//   const connect = () => {
//     if (!username.trim()) { alert("Please enter a username!"); return; }
//     setAskForUsername(false);
//     setVideo(videoAvailable); setAudio(audioAvailable);
//     connectToSocketServer();
//   };

//   const getUserMedia = () => {
//     if ((video && videoAvailable) || (audio && audioAvailable)) {
//       navigator.mediaDevices.getUserMedia({ video, audio }).then(getUserMediaSuccess).catch(console.log);
//     } else { try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {} }
//   };

//   const getUserMediaSuccess = (stream) => {
//     try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     window.localStream = stream;
//     if (draggableVideoRef.current) draggableVideoRef.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       pc.addStream(window.localStream);
//       pc.createOffer().then((description) => {
//         pc.setLocalDescription(description).then(() => { socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription })); }).catch(console.log);
//       });
//     }
//   };

//   const getDisplayMedia = () => {
//     if (!screen || !navigator.mediaDevices.getDisplayMedia) return;
//     navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(getDisplayMediaSuccess).catch(console.log);
//   };

//   const getDisplayMediaSuccess = (stream) => {
//     try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     window.localStream = stream;
//     if (draggableVideoRef.current) draggableVideoRef.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       pc.addStream(window.localStream);
//       pc.createOffer().then((description) => {
//         pc.setLocalDescription(description).then(() => { socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription })); }).catch(console.log);
//       });
//     }

//     stream.getTracks().forEach((track) => {
//       track.onended = () => { setScreen(false); try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {} getUserMedia(); };
//     });
//   };

//   useEffect(() => { if (screen) getDisplayMedia(); }, [screen]);

//   const gotMessageFromServer = (fromId, message) => {
//     const signal = JSON.parse(message);
//     if (fromId === socketIdRef.current) return;
//     if (!connections[fromId]) return;
//     if (signal.sdp) {
//       connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
//         if (signal.sdp.type === 'offer') {
//           connections[fromId].createAnswer().then((description) => {
//             connections[fromId].setLocalDescription(description).then(() => {
//               socketRef.current.emit('signal', fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
//             }).catch(console.log);
//           });
//         }
//       }).catch(console.log);
//     }
//     if (signal.ice) { connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(console.log); }
//   };

//   const connectToSocketServer = () => {
//     socketRef.current = io.connect(server_url, { secure: false });
//     socketRef.current.on('signal', gotMessageFromServer);
//     socketRef.current.on('connect', () => {
//       socketRef.current.emit('join-call', window.location.href);
//       socketIdRef.current = socketRef.current.id;
//       socketRef.current.on('chat-message', addMessage);
//       socketRef.current.on('user-left', (id) => { setVideos((vs) => vs.filter((v) => v.socketId !== id)); });
//       socketRef.current.on('user-joined', (id, clients) => {
//         clients.forEach((socketListId) => {
//           connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
//           connections[socketListId].onicecandidate = (event) => { if (event.candidate) socketRef.current.emit('signal', socketListId, JSON.stringify({ ice: event.candidate })); };
//           connections[socketListId].onaddstream = (event) => {
//             setVideos((curr) => {
//               const exists = curr.find((v) => v.socketId === socketListId);
//               if (exists) { return curr.map((v) => v.socketId === socketListId ? { ...v, stream: event.stream } : v); }
//               else { return [...curr, { socketId: socketListId, stream: event.stream, autoplay: true, playsinline: true }]; }
//             });
//           };
//           if (window.localStream) { connections[socketListId].addStream(window.localStream); }
//         });
//       });
//     });
//   };

//   const addMessage = (data, sender, socketIdSender) => {
//     setMessages((prev) => [...prev, { sender, data }]);
//     if (socketIdSender !== socketIdRef.current) { setNewMessages((n) => n + 1); }
//   };

//   // Draggable local video
//   const dragVideo = (event) => {
//     const video = draggableVideoRef.current;
//     const shiftX = event.clientX - video.getBoundingClientRect().left;
//     const shiftY = event.clientY - video.getBoundingClientRect().top;

//     const moveAt = (pageX, pageY) => {
//       let newX = pageX - shiftX;
//       let newY = pageY - shiftY;
//       const maxX = window.innerWidth - video.offsetWidth;
//       const maxY = window.innerHeight - video.offsetHeight;
//       if (newX < 0) newX = 0; if (newY < 0) newY = 0;
//       if (newX > maxX) newX = maxX; if (newY > maxY) newY = maxY;
//       setVideoPos({ x: newX, y: newY });
//     };

//     const onMouseMove = (event) => moveAt(event.pageX, event.pageY);
//     document.addEventListener("mousemove", onMouseMove);
//     document.onmouseup = () => { document.removeEventListener("mousemove", onMouseMove); document.onmouseup = null; };
//   };

//   // Draggable chat
//   const dragChat = (e) => {
//     const chat = chatRef.current;
//     const shiftX = e.clientX - chat.getBoundingClientRect().left;
//     const shiftY = e.clientY - chat.getBoundingClientRect().top;

//     const moveAt = (pageX, pageY) => {
//       let newX = pageX - shiftX;
//       let newY = pageY - shiftY;
//       const maxX = window.innerWidth - chat.offsetWidth;
//       const maxY = window.innerHeight - chat.offsetHeight;
//       if (newX < 0) newX = 0; if (newY < 0) newY = 0;
//       if (newX > maxX) newX = maxX; if (newY > maxY) newY = maxY;
//       setChatPos({ x: newX, y: newY });
//     };

//     const onMouseMove = (event) => moveAt(event.pageX, event.pageY);
//     document.addEventListener("mousemove", onMouseMove);
//     document.onmouseup = () => { document.removeEventListener("mousemove", onMouseMove); document.onmouseup = null; };
//   };

//   // Center chat when it opens
//   useEffect(() => {
//     if (showModal && chatRef.current) {
//       const chat = chatRef.current;
//       const centerX = (window.innerWidth - chat.offsetWidth) / 2;
//       const centerY = (window.innerHeight - chat.offsetHeight) / 2;
//       setChatPos({ x: centerX, y: centerY });
//     }
//   }, [showModal]);

//   return (
//     <div>
//       {askForUsername ? (
//         <div className={styles.lobby}>
//           <Button variant="contained" color="secondary" sx={{ position: "absolute", top: 20, left: 20, zIndex: 1000 }} onClick={() => { window.location.href = "/home"; }}>
//             Back to Home
//           </Button>
//           <h2>Enter the Lobby</h2>
//           <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" sx={{ input: { color: "#fff" } }} />
//           <Button variant="contained" onClick={connect} sx={{ mt: 1 }}>Connect</Button>
//           <div className={styles.previewWrap}>
//             <video ref={localVideoref} autoPlay muted className={styles.previewVideo} />
//           </div>
//         </div>
//       ) : (
//         <div className={styles.meetVideoContainer}>
//           {/* Lottie Background */}
//           <Player
//             autoplay
//             loop
//             src="https://assets2.lottiefiles.com/packages/lf20_3rwasyjy.json"
//             style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
//           />

//           {/* Draggable chat */}
//           {showModal && (
//             <div
//               ref={chatRef}
//               className={styles.chatRoom}
//               style={{ left: chatPos.x, top: chatPos.y, position: "absolute" }}
//             >
//               <div className={styles.chatHeader} onMouseDown={dragChat}>
//                 Chat
//               </div>
//               <div className={styles.chatContainer}>
//                 <div className={styles.chattingDisplay}>
//                   {messages.length ? messages.map((item, index) => (
//                     <div key={index} style={{ marginBottom: 12 }}>
//                       <p style={{ fontWeight: 600, color: "#fff" }}>{item.sender}</p>
//                       <p style={{ color: "#eee", fontSize: "1.1rem" }}>{item.data}</p>
//                     </div>
//                   )) : <p style={{ color: "#ccc" }}>No Messages Yet</p>}
//                 </div>
//                 <div className={styles.chattingArea}>
//                   <TextField
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     label="Type a message"
//                     variant="outlined"
//                     size="small"
//                     sx={{ input: { color: "#fff" }, backgroundColor: "#1a2b5c", borderRadius: 1 }}
//                   />
//                   <Button variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>Send</Button>
//                   <Button onClick={closeChat} sx={{ ml: 1 }}>Close</Button>
//                 </div>

//                 {/* Emoji bar inside chat */}
//                 <div style={{ marginTop: 8, display: "flex", gap: "8px", justifyContent: "center" }}>
//                   {["😂","🔥","🎉","👍","❤️","🙌"].map((emoji, idx) => (
//                     <Button key={idx} onClick={() => sendEmoji(emoji)} sx={{ minWidth: 36, fontSize: "1.5rem" }}>
//                       {emoji}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Draggable local video */}
//           <video
//             className={styles.meetUserVideo}
//             ref={draggableVideoRef}
//             autoPlay
//             muted
//             style={{ left: videoPos.x, top: videoPos.y, position: "absolute", cursor: "grab", zIndex: 1000 }}
//             onMouseDown={dragVideo}
//           />

//           {/* Conference view */}
//           <div className={styles.conferenceView}>
//             {videos.map((v) => (
//               <div key={v.socketId}>
//                 <video data-socket={v.socketId} ref={(ref) => { if (ref && v.stream) ref.srcObject = v.stream; }} autoPlay />
//               </div>
//             ))}
//           </div>

//           {/* Top buttons */}
//           <div className={styles.buttonContainersBottom}>
//             <IconButton onClick={handleVideo} sx={{ color: video ? "#00e676" : "#aaa" }} title="Toggle Video">{video ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}</IconButton>
//             <IconButton onClick={handleEndCall} sx={{ color: "#f44336" }} title="End Call"><CallEndIcon fontSize="large" /></IconButton>
//             <IconButton onClick={handleAudio} sx={{ color: audio ? "#2196f3" : "#aaa" }} title="Toggle Audio">{audio ? <MicIcon fontSize="large" /> : <MicOffIcon fontSize="large" />}</IconButton>
//             {screenAvailable && (<IconButton onClick={handleScreen} sx={{ color: screen ? "#ff9800" : "#aaa" }} title="Share Screen">{screen ? <StopScreenShareIcon fontSize="large" /> : <ScreenShareIcon fontSize="large" />}</IconButton>)}
//             <IconButton onClick={openChat} sx={{ color: newMessages ? "#ffeb3b" : "#fff" }} title="Open Chat"><ChatIcon fontSize="large" /></IconButton>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// with white board jsx
// import React, { useEffect, useRef, useState } from 'react';
// import io from "socket.io-client";
// import { Badge, IconButton, TextField, Button } from '@mui/material';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import CallEndIcon from '@mui/icons-material/CallEnd';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import ScreenShareIcon from '@mui/icons-material/ScreenShare';
// import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
// import ChatIcon from '@mui/icons-material/Chat';
// import BrushIcon from '@mui/icons-material/Brush';
// import ClearIcon from '@mui/icons-material/Clear';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { Player } from '@lottiefiles/react-lottie-player';
// import styles from "../styles/videoComponent.module.css";
// import server from '../environment';
// import Draggable from "react-draggable";


// const server_url = server;
// const peerConfigConnections = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
// let connections = {};

// export default function VideoMeetComponent() {
//   const socketRef = useRef();
//   const socketIdRef = useRef();
//   const localVideoref = useRef();
//   const draggableVideoRef = useRef();
//   const chatRef = useRef();
//   const canvasRef = useRef();

//   // --- State ---
//   const [videoAvailable, setVideoAvailable] = useState(true);
//   const [audioAvailable, setAudioAvailable] = useState(true);
//   const [video, setVideo] = useState();
//   const [audio, setAudio] = useState();
//   const [screen, setScreen] = useState(false);
//   const [showModal, setModal] = useState(false);
//   const [screenAvailable, setScreenAvailable] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [newMessages, setNewMessages] = useState(0);
//   const [askForUsername, setAskForUsername] = useState(true);
//   const [username, setUsername] = useState("");
//   const [videos, setVideos] = useState([]);

//   // Whiteboard
//   const [showWhiteboard, setShowWhiteboard] = useState(false);
//   const [tool, setTool] = useState("pen");
//   const [color, setColor] = useState("#000000"); // default black
//   const [isDrawing, setIsDrawing] = useState(false);
//   const lastPosRef = useRef(null);

//   // Positions (draggable)
//   const [chatPos, setChatPos] = useState({ x: 80, y: 60 });
//   const [videoPos, setVideoPos] = useState({ x: window.innerWidth - 270, y: 80 });

//   // --- Cleanup on unmount ---
//   useEffect(() => {
//     return () => {
//       try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//       try { socketRef.current?.disconnect(); } catch {}
//     };
//   }, []);

//   // --- Permissions ---
//   useEffect(() => {
//     const getPermissions = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setVideoAvailable(true); setAudioAvailable(true);
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
//         window.localStream = stream;
//         if (localVideoref.current) localVideoref.current.srcObject = stream;
//       } catch {
//         try { await navigator.mediaDevices.getUserMedia({ video: true }); setVideoAvailable(true); } catch { setVideoAvailable(false); }
//         try { await navigator.mediaDevices.getUserMedia({ audio: true }); setAudioAvailable(true); } catch { setAudioAvailable(false); }
//         setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
//       }
//     };
//     getPermissions();
//   }, []);

//   useEffect(() => {
//     if (typeof video === "boolean" && typeof audio === "boolean") getUserMedia();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [video, audio]);

//   // --- Controls ---
//   const handleVideo = () => setVideo((v) => !v);
//   const handleAudio = () => setAudio((a) => !a);
//   const handleScreen = () => setScreen((s) => !s);
//   const handleEndCall = () => { try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {} window.location.href = "/home"; };
//   const openChat = () => { setModal(true); setNewMessages(0); };
//   const closeChat = () => setModal(false);

//  const sendMessage = () => {
//   if (!message.trim()) return;
//   socketRef.current?.emit('chat-message', message, username);
//   setMessage("");
// };


//   const sendEmoji = (emoji) => {
//   socketRef.current?.emit("chat-message", emoji, username);
// };


//   const connect = () => {
//     if (!username.trim()) { alert("Please enter a username!"); return; }
//     setAskForUsername(false);
//     setVideo(videoAvailable); setAudio(audioAvailable);
//     connectToSocketServer();
//   };

//   // --- Media ---
//   const getUserMedia = () => {
//     if ((video && videoAvailable) || (audio && audioAvailable)) {
//       navigator.mediaDevices.getUserMedia({ video, audio }).then(getUserMediaSuccess).catch(console.log);
//     } else {
//       try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     }
//   };

//   const getUserMediaSuccess = (stream) => {
//     try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     window.localStream = stream;
//     if (draggableVideoRef.current) draggableVideoRef.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       try {
//         pc.addStream(window.localStream);
//         pc.createOffer().then((description) => {
//           pc.setLocalDescription(description).then(() => {
//             socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription }));
//           }).catch(console.log);
//         }).catch(console.log);
//       } catch (err) {
//         console.warn("addStream/createOffer error:", err);
//       }
//     }
//   };

//   const getDisplayMedia = () => {
//     if (!screen || !navigator.mediaDevices.getDisplayMedia) return;
//     navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(getDisplayMediaSuccess).catch(console.log);
//   };

//   const getDisplayMediaSuccess = (stream) => {
//     try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
//     window.localStream = stream;
//     if (draggableVideoRef.current) draggableVideoRef.current.srcObject = stream;

//     for (let id in connections) {
//       if (id === socketIdRef.current) continue;
//       const pc = connections[id];
//       try {
//         pc.addStream(window.localStream);
//         pc.createOffer().then((description) => {
//           pc.setLocalDescription(description).then(() => {
//             socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription }));
//           }).catch(console.log);
//         }).catch(console.log);
//       } catch (err) {
//         console.warn("screen share addStream error:", err);
//       }
//     }

//     stream.getTracks().forEach((track) => {
//       track.onended = () => { setScreen(false); try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {} getUserMedia(); };
//     });
//   };

//   useEffect(() => { if (screen) getDisplayMedia(); }, [screen]);

//   // --- WebRTC signalling ---
//   const gotMessageFromServer = (fromId, message) => {
//     try {
//       const signal = JSON.parse(message);
//       if (fromId === socketIdRef.current) return;
//       if (!connections[fromId]) return;
//       if (signal.sdp) {
//         connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
//           if (signal.sdp.type === 'offer') {
//             connections[fromId].createAnswer().then((description) => {
//               connections[fromId].setLocalDescription(description).then(() => {
//                 socketRef.current.emit('signal', fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
//               }).catch(console.log);
//             }).catch(console.log);
//           }
//         }).catch(console.log);
//       }
//       if (signal.ice) { connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(console.log); }
//     } catch (err) {
//       console.error("gotMessageFromServer parse error", err);
//     }
//   };

//   const connectToSocketServer = () => {
//     socketRef.current = io.connect(server_url, { secure: false });
//     socketRef.current.on('signal', gotMessageFromServer);
//     socketRef.current.on('connect', () => {
//       socketRef.current.emit('join-call', window.location.href);
//       socketIdRef.current = socketRef.current.id;
//       socketRef.current.on('chat-message', addMessage);
//       socketRef.current.on('user-left', (id) => { setVideos((vs) => vs.filter((v) => v.socketId !== id)); });

//       socketRef.current.on('user-joined', (id, clients) => {
//         clients.forEach((socketListId) => {
//           connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
//           connections[socketListId].onicecandidate = (event) => { if (event.candidate) socketRef.current.emit('signal', socketListId, JSON.stringify({ ice: event.candidate })); };
//           connections[socketListId].onaddstream = (event) => {
//             setVideos((curr) => {
//               const exists = curr.find((v) => v.socketId === socketListId);
//               if (exists) { return curr.map((v) => v.socketId === socketListId ? { ...v, stream: event.stream } : v); }
//               else { return [...curr, { socketId: socketListId, stream: event.stream, autoplay: true, playsinline: true }]; }
//             });
//           };
//           if (window.localStream) { try { connections[socketListId].addStream(window.localStream); } catch(e) { console.warn(e); } }
//         });
//       });

//       // Whiteboard socket listeners
//       socketRef.current.on("wb-draw", drawRemote);
//       socketRef.current.on("wb-clear", clearCanvasRemote);
//     });
//   };

//   const addMessage = (data, sender, socketIdSender) => {
//     setMessages((prev) => [...prev, { sender, data }]);
//     if (socketIdSender !== socketIdRef.current) { setNewMessages((n) => n + 1); }
//   };

//   // --- Dragging handlers ---
//   // Chat drag
//   const dragChat = (e) => {
//     const chat = chatRef.current;
//     if (!chat) return;
//     const shiftX = e.clientX - chat.getBoundingClientRect().left;
//     const shiftY = e.clientY - chat.getBoundingClientRect().top;

//     const moveAt = (pageX, pageY) => {
//       let newX = pageX - shiftX;
//       let newY = pageY - shiftY;
//       const maxX = window.innerWidth - chat.offsetWidth;
//       const maxY = window.innerHeight - chat.offsetHeight;
//       if (newX < 0) newX = 0; if (newY < 0) newY = 0;
//       if (newX > maxX) newX = maxX; if (newY > maxY) newY = maxY;
//       setChatPos({ x: newX, y: newY });
//     };

//     const onMouseMove = (event) => moveAt(event.pageX, event.pageY);
//     document.addEventListener("mousemove", onMouseMove);
//     document.onmouseup = () => { document.removeEventListener("mousemove", onMouseMove); document.onmouseup = null; };
//   };

//   // Local video drag
//   const dragVideo = (event) => {
//     const videoEl = draggableVideoRef.current;
//     if (!videoEl) return;
//     const shiftX = event.clientX - videoEl.getBoundingClientRect().left;
//     const shiftY = event.clientY - videoEl.getBoundingClientRect().top;

//     const moveAt = (pageX, pageY) => {
//       let newX = pageX - shiftX;
//       let newY = pageY - shiftY;
//       const maxX = window.innerWidth - videoEl.offsetWidth;
//       const maxY = window.innerHeight - videoEl.offsetHeight;
//       if (newX < 0) newX = 0; if (newY < 0) newY = 0;
//       if (newX > maxX) newX = maxX; if (newY > maxY) newY = maxY;
//       setVideoPos({ x: newX, y: newY });
//     };

//     const onMouseMove = (event) => moveAt(event.pageX, event.pageY);
//     document.addEventListener("mousemove", onMouseMove);
//     document.onmouseup = () => { document.removeEventListener("mousemove", onMouseMove); document.onmouseup = null; };
//   };

//   // --- Whiteboard handlers ---
//   const startDrawing = (e) => {
//     // pointer coords relative to canvas
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
//     const y = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;
//     lastPosRef.current = { x, y };
//     setIsDrawing(true);
//   };

//   const endDrawing = () => {
//     lastPosRef.current = null;
//     setIsDrawing(false);
//   };

//   const draw = (e) => {
//     if (!isDrawing || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
//     const y = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;

//     const prev = lastPosRef.current ?? { x, y };

//     ctx.beginPath();
//     ctx.moveTo(prev.x, prev.y);
//     ctx.lineTo(x, y);
//     ctx.strokeStyle = tool === "pen" ? color : "#ffffff";
//     ctx.lineWidth = tool === "pen" ? 2 : 18;
//     ctx.lineCap = "round";
//     ctx.stroke();

//     // update lastPos
//     lastPosRef.current = { x, y };

//     // emit segment (send prev so remote can draw a continuous line)
//     if (socketRef.current && socketRef.current.connected) {
//       socketRef.current.emit("wb-draw", {
//         roomId: window.location.href,
//         seg: { x, y, prev, tool, color }
//       });
//     }
//   };

//   const drawRemote = (seg) => {
//     if (!canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.beginPath();
//     ctx.moveTo(seg.prev?.x ?? seg.x, seg.prev?.y ?? seg.y);
//     ctx.lineTo(seg.x, seg.y);
//     ctx.strokeStyle = seg.tool === "pen" ? seg.color : "#ffffff";
//     ctx.lineWidth = seg.tool === "pen" ? 2 : 18;
//     ctx.lineCap = "round";
//     ctx.stroke();
//   };

//   const clearBoard = () => {
//     if (!canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     if (socketRef.current && socketRef.current.connected) socketRef.current.emit("wb-clear", { roomId: window.location.href });
//   };

//   const clearCanvasRemote = () => {
//     if (!canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//   };

//   // --- UI ---
//   return (
//     <div>
//       {askForUsername ? (
//         <div className={styles.lobby}>
//           <Button variant="contained" color="secondary" sx={{ position: "absolute", top: 20, left: 20, zIndex: 1000 }} onClick={() => { window.location.href = "/home"; }}>
//             Back to Home
//           </Button>
//           <h2>Enter the Lobby</h2>
//           <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" sx={{ input: { color: "#fff" } }} />
//           <Button variant="contained" onClick={connect} sx={{ mt: 1 }}>Connect</Button>
//           <div className={styles.previewWrap}>
//             <video ref={localVideoref} autoPlay muted className={styles.previewVideo} />
//           </div>
//         </div>
//       ) : (
//         <div className={styles.meetVideoContainer}>
//           {/* Background */}
//           <Player autoplay loop src="https://assets2.lottiefiles.com/packages/lf20_3rwasyjy.json" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }} />

//           {/* Chat Modal (draggable header) */}
//         {/* Chat Modal */}
// {showModal && (
//   <Draggable handle=".chatHeader">
//     <div 
//       ref={chatRef} 
//       className={styles.chatRoom} 
//       style={{ position: "absolute", zIndex: 2000 }}
//     >
//       <div className="chatHeader" style={{ cursor: "move", background: "#222", padding: "8px", color: "#fff" }}>
//         Chat
//       </div>
//       <div className={styles.chatContainer}>
//         <div className={styles.chattingDisplay}>
//           {messages.length ? messages.map((item, index) => (
//             <div key={index} style={{ marginBottom: 12 }}>
//               <p style={{ fontWeight: 600, color: "#fff" }}>{item.sender}</p>
//               <p style={{ color: "#eee" }}>{item.data}</p>
//             </div>
//           )) : <p style={{ color: "#ccc" }}>No Messages Yet</p>}
//         </div>

//         <div className={styles.chattingArea}>
//           <TextField
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             label="Type a message"
//             variant="outlined"
//             size="small"
//             sx={{ input: { color: "#fff" }, backgroundColor: "#1a2b5c", borderRadius: 1 }}
//           />
//           <Button variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>Send</Button>
//           <Button onClick={() => sendEmoji("🎉")} sx={{ ml: 1 }}>🎉</Button>
//           <Button onClick={() => sendEmoji("🔥")} sx={{ ml: 1 }}>🔥</Button>
//           <Button onClick={() => sendEmoji("😂")} sx={{ ml: 1 }}>😂</Button>
//           <Button onClick={() => sendEmoji("👍")} sx={{ ml: 1 }}>👍</Button>
//           <Button onClick={closeChat} sx={{ ml: 1 }}>Close</Button>
//         </div>
//       </div>
//     </div>
//   </Draggable>
// )}

//           {/* Whiteboard Modal (keeps your UI intact) */}
//           {showWhiteboard && (
//             <div style={{ position: "absolute", top: 60, left: 60, background: "#fff", border: "2px solid #333", zIndex: 2200, padding: "8px", borderRadius: "8px" }}>
//               <div style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
//                 <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ marginRight: 8 }} />
//                 <IconButton onClick={() => setTool("pen")} color={tool === "pen" ? "primary" : "default"}><BrushIcon /></IconButton>
//                 <IconButton onClick={() => setTool("eraser")} color={tool === "eraser" ? "primary" : "default"}><ClearIcon /></IconButton>
//                 <IconButton onClick={clearBoard} color="error"><DeleteForeverIcon /></IconButton>
//                 <Button onClick={() => setShowWhiteboard(false)} sx={{ ml: 1 }}>Close</Button>
//               </div>

//               <canvas
//                 ref={canvasRef}
//                 width={800}
//                 height={500}
//                 style={{ border: "1px solid #ccc", cursor: tool === "eraser" ? "cell" : "crosshair" }}
//                 onMouseDown={startDrawing}
//                 onMouseUp={endDrawing}
//                 onMouseMove={draw}
//                 onTouchStart={(e) => { e.preventDefault(); startDrawing(e.touches[0]); }}
//                 onTouchMove={(e) => { e.preventDefault(); draw(e.touches[0]); }}
//                 onTouchEnd={(e) => { e.preventDefault(); endDrawing(); }}
//               />
//             </div>
//           )}

//           {/* Local draggable video */}
//           <video
//             className={styles.meetUserVideo}
//             ref={draggableVideoRef}
//             autoPlay
//             muted
//             style={{ left: videoPos.x, top: videoPos.y, position: "absolute", cursor: "grab", zIndex: 1000 }}
//             onMouseDown={dragVideo}
//           />

//           {/* Remote videos */}
//           <div className={styles.conferenceView}>
//             {videos.map((v) => (
//               <div key={v.socketId}>
//                 <video data-socket={v.socketId} ref={(ref) => { if (ref && v.stream) ref.srcObject = v.stream; }} autoPlay />
//               </div>
//             ))}
//           </div>

//           {/* Control bar */}
//           <div className={styles.buttonContainersBottom}>
//             <IconButton onClick={handleVideo} sx={{ color: video ? "#00e676" : "#aaa" }} title="Toggle Video">
//               {video ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}
//             </IconButton>

//             <IconButton onClick={handleEndCall} sx={{ color: "#f44336" }} title="End Call">
//               <CallEndIcon fontSize="large" />
//             </IconButton>

//             <IconButton onClick={handleAudio} sx={{ color: audio ? "#2196f3" : "#aaa" }} title="Toggle Audio">
//               {audio ? <MicIcon fontSize="large" /> : <MicOffIcon fontSize="large" />}
//             </IconButton>

//             {screenAvailable && (
//               <IconButton onClick={handleScreen} sx={{ color: screen ? "#ff9800" : "#aaa" }} title="Share Screen">
//                 {screen ? <StopScreenShareIcon fontSize="large" /> : <ScreenShareIcon fontSize="large" />}
//               </IconButton>
//             )}

//             <IconButton onClick={openChat} sx={{ color: newMessages ? "#ffeb3b" : "#fff" }} title="Open Chat">
//               <ChatIcon fontSize="large" />
//             </IconButton>

//             <IconButton onClick={() => setShowWhiteboard(true)} sx={{ color: "#fff" }} title="Open Whiteboard">
//               <BrushIcon fontSize="large" />
//             </IconButton>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// lest make notes and file sharing code in it 

import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client";
import { Badge, IconButton, TextField, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import BrushIcon from '@mui/icons-material/Brush';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadIcon from '@mui/icons-material/Download';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Player } from '@lottiefiles/react-lottie-player';
import styles from "../styles/videoComponent.module.css";
import server from '../environment';
import Draggable from "react-draggable";

const server_url = server;
const peerConfigConnections = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
let connections = {};

export default function VideoMeetComponent() {
  const socketRef = useRef();
  const socketIdRef = useRef();
  const localVideoref = useRef();
  const draggableVideoRef = useRef();
  const chatRef = useRef();
  const canvasRef = useRef();

  // --- State (existing) ---
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [video, setVideo] = useState();
  const [audio, setAudio] = useState();
  const [screen, setScreen] = useState(false);
  const [showModal, setModal] = useState(false);
  const [screenAvailable, setScreenAvailable] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [newMessages, setNewMessages] = useState(0);
  const [askForUsername, setAskForUsername] = useState(true);
  const [username, setUsername] = useState("");
  const [videos, setVideos] = useState([]);

  // --- Whiteboard (existing) ---
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPosRef = useRef(null);

  // --- Notes (NEW) ---
  

  const [showNotes, setShowNotes] = useState(false);
  // private note (left) stored in localStorage
  const [privateNote, setPrivateNote] = useState("");
  // team note (right) shared via socket
  const [teamNote, setTeamNote] = useState("");
  // shared files in team area
  const [teamFiles, setTeamFiles] = useState([]); // { id, name, type, dataUrl, sender }
  const notesDebounceRef = useRef(null);



  
  const [privateFiles, setPrivateFiles] = useState([]); // uploaded files
const [privateNoteElements, setPrivateNoteElements] = useState([]); // array of {type: 'text'|'file', content: string|fileRecord}
const privateNoteRef = useRef(null);


  const handlePrivateFileSelect = (files) => {
  if (!files || !files.length) return;
  for (let i = 0; i < files.length; ++i) {
    const f = files[i];
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const fileRecord = {
        id: Date.now() + "-" + Math.random().toString(36).slice(2),
        name: f.name,
        type: f.type,
        dataUrl
      };
      setPrivateFiles((prev) => [...prev, fileRecord]);
    };
    reader.readAsDataURL(f);
  }
};



  // Positions (draggable)
  const [chatPos, setChatPos] = useState({ x: 80, y: 60 });
  const [videoPos, setVideoPos] = useState({ x: window.innerWidth - 270, y: 80 });

  // --- Lifecycle cleanup ---
  useEffect(() => {
    // init private note from localStorage
    const saved = window.localStorage.getItem("private_note_v1");
    if (saved) setPrivateNote(saved);
    return () => {
      try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
      try { socketRef.current?.disconnect(); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Permissions (existing) ---
  useEffect(() => {
    const getPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setVideoAvailable(true); setAudioAvailable(true);
        setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
        window.localStream = stream;
        if (localVideoref.current) localVideoref.current.srcObject = stream;
      } catch {
        try { await navigator.mediaDevices.getUserMedia({ video: true }); setVideoAvailable(true); } catch { setVideoAvailable(false); }
        try { await navigator.mediaDevices.getUserMedia({ audio: true }); setAudioAvailable(true); } catch { setAudioAvailable(false); }
        setScreenAvailable(Boolean(navigator.mediaDevices.getDisplayMedia));
      }
    };
    getPermissions();
  }, []);

  useEffect(() => {
    if (typeof video === "boolean" && typeof audio === "boolean") getUserMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video, audio]);

  // --- Controls (existing) ---
  const handleVideo = () => setVideo((v) => !v);
  const handleAudio = () => setAudio((a) => !a);
  const handleScreen = () => setScreen((s) => !s);
  const handleEndCall = () => { try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {} window.location.href = "/home"; };
  const openChat = () => { setModal(true); setNewMessages(0); };
  const closeChat = () => setModal(false);

  const sendMessage = () => {
    if (!message.trim()) return;
    socketRef.current?.emit('chat-message', message, username);
    setMessage("");
  };

  const sendEmoji = (emoji) => {
    socketRef.current?.emit("chat-message", emoji, username);
  };

  const connect = () => {
    if (!username.trim()) { alert("Please enter a username!"); return; }
    setAskForUsername(false);
    setVideo(videoAvailable); setAudio(audioAvailable);
    connectToSocketServer();
  };

  // --- Media helpers (existing) ---
  const getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices.getUserMedia({ video, audio }).then(getUserMediaSuccess).catch(console.log);
    } else { try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {} }
  };

  const getUserMediaSuccess = (stream) => {
    try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
    window.localStream = stream;
    if (draggableVideoRef.current) draggableVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;
      const pc = connections[id];
      try {
        pc.addStream(window.localStream);
        pc.createOffer().then((description) => {
          pc.setLocalDescription(description).then(() => {
            socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription }));
          }).catch(console.log);
        }).catch(console.log);
      } catch (err) {
        console.warn("addStream/createOffer error:", err);
      }
    }
  };

  const getDisplayMedia = () => {
    if (!screen || !navigator.mediaDevices.getDisplayMedia) return;
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(getDisplayMediaSuccess).catch(console.log);
  };

  const getDisplayMediaSuccess = (stream) => {
    try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {}
    window.localStream = stream;
    if (draggableVideoRef.current) draggableVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;
      const pc = connections[id];
      try {
        pc.addStream(window.localStream);
        pc.createOffer().then((description) => {
          pc.setLocalDescription(description).then(() => {
            socketRef.current.emit('signal', id, JSON.stringify({ sdp: pc.localDescription }));
          }).catch(console.log);
        }).catch(console.log);
      } catch (err) {
        console.warn("screen share addStream error:", err);
      }
    }

    stream.getTracks().forEach((track) => {
      track.onended = () => { setScreen(false); try { window.localStream?.getTracks().forEach((t) => t.stop()); } catch {} getUserMedia(); };
    });
  };

  useEffect(() => { if (screen) getDisplayMedia(); }, [screen]);

  // --- WebRTC signalling (existing) ---
  const gotMessageFromServer = (fromId, message) => {
    try {
      const signal = JSON.parse(message);
      if (fromId === socketIdRef.current) return;
      if (!connections[fromId]) return;
      if (signal.sdp) {
        connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
          if (signal.sdp.type === 'offer') {
            connections[fromId].createAnswer().then((description) => {
              connections[fromId].setLocalDescription(description).then(() => {
                socketRef.current.emit('signal', fromId, JSON.stringify({ sdp: connections[fromId].localDescription }));
              }).catch(console.log);
            }).catch(console.log);
          }
        }).catch(console.log);
      }
      if (signal.ice) { connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(console.log); }
    } catch (err) {
      console.error("gotMessageFromServer parse error", err);
    }
  };

  // -------------------------
  // connectToSocketServer (attach socket listeners)
  // -------------------------
  const connectToSocketServer = () => {
   
    socketRef.current = io.connect(server_url, { secure: false });
    socketRef.current.on('signal', gotMessageFromServer);

    socketRef.current.on('connect', () => {
      socketRef.current.emit('join-call', window.location.href);
      socketIdRef.current = socketRef.current.id;

      // avoid duplicates
      socketRef.current.off('chat-message');
      socketRef.current.on('chat-message', addMessage);

      socketRef.current.off('user-left');
      socketRef.current.on('user-left', (id) => { setVideos((vs) => vs.filter((v) => v.socketId !== id)); });

      socketRef.current.on('user-joined', (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
          connections[socketListId].onicecandidate = (event) => { if (event.candidate) socketRef.current.emit('signal', socketListId, JSON.stringify({ ice: event.candidate })); };
          connections[socketListId].onaddstream = (event) => {
            setVideos((curr) => {
              const exists = curr.find((v) => v.socketId === socketListId);
              if (exists) { return curr.map((v) => v.socketId === socketListId ? { ...v, stream: event.stream } : v); }
              else { return [...curr, { socketId: socketListId, stream: event.stream, autoplay: true, playsinline: true }]; }
            });
          };
          if (window.localStream) { try { connections[socketListId].addStream(window.localStream); } catch(e) { console.warn(e); } }
        });
      });

      // Whiteboard listeners (prevent duplicates)
      socketRef.current.off("wb-draw");
      socketRef.current.off("wb-clear");
      socketRef.current.on("wb-draw", drawRemote);
      socketRef.current.on("wb-clear", clearCanvasRemote);

      // ==== NOTES listeners (NEW) - prevent duplicates ====
      socketRef.current.off("team-notes-update");
      socketRef.current.off("team-file");
      socketRef.current.on("team-notes-update", ({ content }) => {
        setTeamNote(content || "");
      });
      socketRef.current.on("team-file", (fileRecord) => {
        // append to teamFiles (if not present)
        setTeamFiles((prev) => {
          if (prev.find(f => f.id === fileRecord.id)) return prev;
          return [...prev, fileRecord];
        });
      });
    });
  };

  const addMessage = (data, sender, socketIdSender) => {
    setMessages((prev) => [...prev, { sender, data }]);
    if (socketIdSender !== socketIdRef.current) { setNewMessages((n) => n + 1); }
  };

  // -------------------------
  // Whiteboard handlers (existing)
  // -------------------------
  const startDrawing = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;
    lastPosRef.current = { x, y };
    setIsDrawing(true);
  };

  const endDrawing = () => { lastPosRef.current = null; setIsDrawing(false); };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;
    const prev = lastPosRef.current ?? { x, y };

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === "pen" ? color : "#ffffff";
    ctx.lineWidth = tool === "pen" ? 2 : 18;
    ctx.lineCap = "round";
    ctx.stroke();

    lastPosRef.current = { x, y };

    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("wb-draw", {
        roomId: window.location.href,
        seg: { x, y, prev, tool, color }
      });
    }
  };

  const drawRemote = (seg) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(seg.prev?.x ?? seg.x, seg.prev?.y ?? seg.y);
    ctx.lineTo(seg.x, seg.y);
    ctx.strokeStyle = seg.tool === "pen" ? seg.color : "#ffffff";
    ctx.lineWidth = seg.tool === "pen" ? 2 : 18;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const clearBoard = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (socketRef.current && socketRef.current.connected) socketRef.current.emit("wb-clear", { roomId: window.location.href });
  };

  const clearCanvasRemote = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  // -------------------------
  // NOTES: client-side helper functions (NEW)
  // -------------------------
  // Private note change — autosave to localStorage
  const handlePrivateChange = (val) => {
    setPrivateNote(val);
    window.localStorage.setItem("private_note_v1", val);
  };

  

  // Download Private Notes
const exportPrivateAsTxt = () => {
  const blob = new Blob([privateNote], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'private-notes.txt';
  link.click();
};

// Download Team Notes
const exportTeamAsTxt = () => {
  const blob = new Blob([teamNote], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'team-notes.txt';
  link.click();
};

  // Team note change — optimistic local update, debounce emit
  const handleTeamChange = (val) => {
    setTeamNote(val);
    if (!socketRef.current || !socketRef.current.connected) return;
    if (notesDebounceRef.current) clearTimeout(notesDebounceRef.current);
    notesDebounceRef.current = setTimeout(() => {
      socketRef.current.emit("team-notes-update", { roomId: window.location.href, content: val });
      notesDebounceRef.current = null;
    }, 400); // 400ms debounce
  };

  // File upload handler: read file as dataURL and emit
  const handleFileSelect = async (files) => {
    if (!files || !files.length) return;
    for (let i = 0; i < files.length; ++i) {
      const f = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result; // base64 data url
        const fileRecord = {
          id: Date.now() + "-" + Math.random().toString(36).slice(2),
          name: f.name,
          type: f.type,
          dataUrl,
          sender: username || "Anonymous"
        };
        // append locally
        setTeamFiles((prev) => [...prev, fileRecord]);
        // emit to room (server will broadcast to others)
        if (socketRef.current && socketRef.current.connected) {
          socketRef.current.emit("team-file", { roomId: window.location.href, file: fileRecord });
        }
      };
      reader.readAsDataURL(f);
    }
  };

  // Download a dataUrl file locally
  const downloadDataUrl = (file) => {
    try {
      const a = document.createElement("a");
      a.href = file.dataUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("download error", err);
    }
  };

  // -------------------------
  // Dragging handlers for chat & video (kept from your code)
  // -------------------------
  const dragChat = (e) => {
    const chat = chatRef.current;
    if (!chat) return;
    const shiftX = e.clientX - chat.getBoundingClientRect().left;
    const shiftY = e.clientY - chat.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      let newX = pageX - shiftX;
      let newY = pageY - shiftY;
      const maxX = window.innerWidth - chat.offsetWidth;
      const maxY = window.innerHeight - chat.offsetHeight;
      if (newX < 0) newX = 0; if (newY < 0) newY = 0;
      if (newX > maxX) newX = maxX; if (newY > maxY) newY = maxY;
      setChatPos({ x: newX, y: newY });
    };

    const onMouseMove = (event) => moveAt(event.pageX, event.pageY);
    document.addEventListener("mousemove", onMouseMove);
    document.onmouseup = () => { document.removeEventListener("mousemove", onMouseMove); document.onmouseup = null; };
  };

  const dragVideo = (event) => {
    const videoEl = draggableVideoRef.current;
    if (!videoEl) return;
    const shiftX = event.clientX - videoEl.getBoundingClientRect().left;
    const shiftY = event.clientY - videoEl.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      let newX = pageX - shiftX;
      let newY = pageY - shiftY;
      const maxX = window.innerWidth - videoEl.offsetWidth;
      const maxY = window.innerHeight - videoEl.offsetHeight;
      if (newX < 0) newX = 0; if (newY < 0) newY = 0;
      if (newX > maxX) newX = maxX; if (newY > maxY) newY = maxY;
      setVideoPos({ x: newX, y: newY });
    };

    const onMouseMove = (event) => moveAt(event.pageX, event.pageY);
    document.addEventListener("mousemove", onMouseMove);
    document.onmouseup = () => { document.removeEventListener("mousemove", onMouseMove); document.onmouseup = null; };
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div>
      {askForUsername ? (
        <div className={styles.lobby}>
          <Button variant="contained" color="secondary" sx={{ position: "absolute", top: 20, left: 20, zIndex: 1000 }} onClick={() => { window.location.href = "/home"; }}>
            Back to Home
          </Button>
          <h2>Enter the Lobby</h2>
          <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" sx={{ input: { color: "#fff" } }} />
          <Button variant="contained" onClick={connect} sx={{ mt: 1 }}>Connect</Button>
          <div className={styles.previewWrap}>
            <video ref={localVideoref} autoPlay muted className={styles.previewVideo} />
          </div>
        </div>
      ) : (
        <div className={styles.meetVideoContainer}>
          {/* Background */}
          <Player autoplay loop src="https://assets2.lottiefiles.com/packages/lf20_3rwasyjy.json" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }} />

          {/* Chat Modal */}
          {showModal && (
            <Draggable handle=".chatHeader">
              <div ref={chatRef} className={styles.chatRoom} style={{ position: "absolute", zIndex: 2000 }}>
                <div className="chatHeader" style={{ cursor: "move", background: "#222", padding: "8px", color: "#fff" }}>Chat</div>
                <div className={styles.chatContainer}>
                  <div className={styles.chattingDisplay}>
                    {messages.length ? messages.map((item, index) => (
                      <div key={index} style={{ marginBottom: 12 }}>
                        <p style={{ fontWeight: 600, color: "#fff" }}>{item.sender}</p>
                        <p style={{ color: "#eee" }}>{item.data}</p>
                      </div>
                    )) : <p style={{ color: "#ccc" }}>No Messages Yet</p>}
                  </div>
                  <div className={styles.chattingArea}>
                    <TextField value={message} onChange={(e) => setMessage(e.target.value)} label="Type a message" variant="outlined" size="small" sx={{ input: { color: "#fff" }, backgroundColor: "#1a2b5c", borderRadius: 1 }} />
                    <Button variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>Send</Button>
                    <Button onClick={() => sendEmoji("🎉")} sx={{ ml: 1 }}>🎉</Button>
                    <Button onClick={() => sendEmoji("🔥")} sx={{ ml: 1 }}>🔥</Button>
                    <Button onClick={() => sendEmoji("😂")} sx={{ ml: 1 }}>😂</Button>
                    <Button onClick={() => sendEmoji("👍")} sx={{ ml: 1 }}>👍</Button>
                    <Button onClick={closeChat} sx={{ ml: 1 }}>Close</Button>
                  </div>
                </div>
              </div>
            </Draggable>
          )}
{showNotes && (
  <Draggable handle=".notesHeader">
    <div
      style={{
        position: "absolute",
        top: "10vh",
        left: "10vw",
        width: "80vw",
        height: "80vh",
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        padding: 12,
        zIndex: 2300,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="notesHeader"
        style={{
          cursor: "move",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          background: "#f5f5f5",
          borderRadius: "8px 8px 0 0",
          fontSize: 16,
          fontWeight: 600,
          boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <DescriptionIcon fontSize="medium" /> Notes
        </div>
        <Button
          variant="outlined"
          size="small"
          style={{ borderRadius: 6 }}
          onClick={() => setShowNotes(false)}
        >
          Close
        </Button>
      </div>

      {/* Content */}
      <div style={{ display: "flex", flex: 1, gap: 12, marginTop: 12 }}>
        {/* Left Panel: Private Notes */}
        <div
          style={{
            flex: "0 0 45%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 12,
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span style={{ fontWeight: 600 }}>Private Notes (only you)</span>
            <div style={{ display: "flex", gap: 8 }}>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  cursor: "pointer",
                  fontSize: 12,
                  padding: "4px 6px",
                  border: "1px solid #ddd",
                  borderRadius: 4,
                  background: "#fafafa",
                }}
              >
                <AttachFileIcon fontSize="small" /> Upload
                <input
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  onChange={(e) => handlePrivateFileSelect(e.target.files)}
                />
              </label>

              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={exportPrivateAsTxt}
              >
                Download .txt
              </Button>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={privateNote}
            onChange={(e) => handlePrivateChange(e.target.value)}
            style={{
              flex: 1,
              width: "100%",
              resize: "none",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 14,
              background: "#fdfdfd",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
            }}
          />

          {/* Files List */}
          <div
            style={{
              marginTop: 10,
              maxHeight: 120,
              overflowY: "auto",
              borderTop: "1px solid #eee",
              paddingTop: 6,
            }}
          >
            {privateFiles.length ? (
              privateFiles.map((f) => (
                <div
                  key={f.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "4px 0",
                    fontSize: 12,
                    cursor: "pointer",
                    borderRadius: 4,
                    "&:hover": { background: "#f5f5f5" },
                  }}
                >
                  <span>{f.name}</span>
                  <Button
                    size="small"
                    onClick={() => downloadDataUrl(f)}
                    startIcon={<DownloadIcon />}
                  >
                    Download
                  </Button>
                </div>
              ))
            ) : (
              <div style={{ fontSize: 12, color: "#999" }}>No files uploaded</div>
            )}
          </div>

          <div style={{ marginTop: 6, fontSize: 10, color: "#666" }}>
            Autosaved to local
          </div>
        </div>

        {/* Right Panel: Team Notes */}
        <div
          style={{
            flex: "1 1 55%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 12,
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span style={{ fontWeight: 600 }}>Team Notes (shared)</span>
            <div style={{ display: "flex", gap: 8 }}>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  cursor: "pointer",
                  fontSize: 12,
                  padding: "4px 6px",
                  border: "1px solid #ddd",
                  borderRadius: 4,
                  background: "#fafafa",
                }}
              >
                <AttachFileIcon fontSize="small" /> Upload
                <input
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
              </label>

              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={exportTeamAsTxt}
              >
                Download .txt
              </Button>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={teamNote}
            onChange={(e) => handleTeamChange(e.target.value)}
            placeholder="Team notes (collaborative)"
            style={{
              flex: 1,
              width: "100%",
              resize: "none",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 14,
              background: "#fdfdfd",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
            }}
          />

          {/* Shared Files */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Shared files</div>
            <div
              style={{
                maxHeight: 140,
                overflowY: "auto",
                border: "1px solid #eee",
                padding: 8,
                borderRadius: 6,
              }}
            >
              {teamFiles.length ? (
                teamFiles.map((f) => (
                  <div
                    key={f.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 6,
                      borderBottom: "1px solid #f3f3f3",
                      borderRadius: 4,
                      "&:hover": { background: "#f9f9f9" },
                    }}
                  >
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <AttachFileIcon fontSize="small" />
                      <div>
                        <div style={{ fontSize: 13 }}>{f.name}</div>
                        <div style={{ fontSize: 11, color: "#666" }}>{f.sender}</div>
                      </div>
                    </div>
                    <Button
                      size="small"
                      onClick={() => downloadDataUrl(f)}
                      startIcon={<DownloadIcon />}
                    >
                      Download
                    </Button>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: 12, color: "#999" }}>No files shared yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Draggable>
)}


          {/* Whiteboard Modal (keeps your UI intact) */}
          {showWhiteboard && (
            <div style={{ position: "absolute", top: 60, left: 60, background: "#fff", border: "2px solid #333", zIndex: 2200, padding: "8px", borderRadius: "8px" }}>
              <div style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ marginRight: 8 }} />
                <IconButton onClick={() => setTool("pen")} color={tool === "pen" ? "primary" : "default"}><BrushIcon /></IconButton>
                <IconButton onClick={() => setTool("eraser")} color={tool === "eraser" ? "primary" : "default"}><ClearIcon /></IconButton>
                <IconButton onClick={clearBoard} color="error"><DeleteForeverIcon /></IconButton>
                <Button onClick={() => setShowWhiteboard(false)} sx={{ ml: 1 }}>Close</Button>
              </div>

              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                style={{ border: "1px solid #ccc", cursor: tool === "eraser" ? "cell" : "crosshair" }}
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseMove={draw}
                onTouchStart={(e) => { e.preventDefault(); startDrawing(e.touches[0]); }}
                onTouchMove={(e) => { e.preventDefault(); draw(e.touches[0]); }}
                onTouchEnd={(e) => { e.preventDefault(); endDrawing(); }}
              />
            </div>
          )}

          {/* Local draggable video */}
          <video
            className={styles.meetUserVideo}
            ref={draggableVideoRef}
            autoPlay
            muted
            style={{ left: videoPos.x, top: videoPos.y, position: "absolute", cursor: "grab", zIndex: 1000 }}
            onMouseDown={dragVideo}
          />

          {/* Remote videos */}
          <div className={styles.conferenceView}>
            {videos.map((v) => (
              <div key={v.socketId}>
                <video data-socket={v.socketId} ref={(ref) => { if (ref && v.stream) ref.srcObject = v.stream; }} autoPlay />
              </div>
            ))}
          </div>

          {/* Control bar */}
          <div className={styles.buttonContainersBottom}>
            <IconButton onClick={handleVideo} sx={{ color: video ? "#00e676" : "#aaa" }} title="Toggle Video">
              {video ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}
            </IconButton>

            <IconButton onClick={handleEndCall} sx={{ color: "#f44336" }} title="End Call"><CallEndIcon fontSize="large" /></IconButton>

            <IconButton onClick={handleAudio} sx={{ color: audio ? "#2196f3" : "#aaa" }} title="Toggle Audio">
              {audio ? <MicIcon fontSize="large" /> : <MicOffIcon fontSize="large" />}
            </IconButton>

            {screenAvailable && (
              <IconButton onClick={handleScreen} sx={{ color: screen ? "#ff9800" : "#aaa" }} title="Share Screen">
                {screen ? <StopScreenShareIcon fontSize="large" /> : <ScreenShareIcon fontSize="large" />}
              </IconButton>
            )}

            <IconButton onClick={openChat} sx={{ color: newMessages ? "#ffeb3b" : "#fff" }} title="Open Chat"><ChatIcon fontSize="large" /></IconButton>

            <IconButton onClick={() => setShowWhiteboard(true)} sx={{ color: "#fff" }} title="Open Whiteboard"><BrushIcon fontSize="large" /></IconButton>

            <IconButton onClick={() => setShowNotes(true)} sx={{ color: "#fff" }} title="Open Notes"><DescriptionIcon fontSize="large" /></IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
