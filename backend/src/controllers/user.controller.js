// import httpStatus from "http-status";
// import { User } from "../models/user.model.js";
// import bcrypt, { hash } from "bcrypt"

// import crypto from "crypto"
// import { Meeting } from "../models/meeting.model.js";
// const login = async (req, res) => {

//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ message: "Please Provide" })
//     }

//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" })
//         }


//         let isPasswordCorrect = await bcrypt.compare(password, user.password)

//         if (isPasswordCorrect) {
//             let token = crypto.randomBytes(20).toString("hex");

//             user.token = token;
//             await user.save();
//             return res.status(httpStatus.OK).json({ token: token })
//         } else {
//             return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or password" })
//         }

//     } catch (e) {
//         return res.status(500).json({ message: `Something went wrong ${e}` })
//     }
// }


// const register = async (req, res) => {
//     const { name, username, password } = req.body;


//     try {
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(httpStatus.FOUND).json({ message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             name: name,
//             username: username,
//             password: hashedPassword
//         });

//         await newUser.save();

//         res.status(httpStatus.CREATED).json({ message: "User Registered" })

//     } catch (e) {
//         res.json({ message: `Something went wrong ${e}` })
//     }

// }


// const getUserHistory = async (req, res) => {
//     const { token } = req.query;

//     try {
//         const user = await User.findOne({ token: token });
//         const meetings = await Meeting.find({ user_id: user.username })
//         res.json(meetings)
//     } catch (e) {
//         res.json({ message: `Something went wrong ${e}` })
//     }
// }

// const addToHistory = async (req, res) => {
//     const { token, meeting_code } = req.body;

//     try {
//         const user = await User.findOne({ token: token });

//         const newMeeting = new Meeting({
//             user_id: user.username,
//             meetingCode: meeting_code
//         })

//         await newMeeting.save();

//         res.status(httpStatus.CREATED).json({ message: "Added code to history" })
//     } catch (e) {
//         res.json({ message: `Something went wrong ${e}` })
//     }
// }


// export { login, register, getUserHistory, addToHistory }

// import httpStatus from "http-status";
// import { User } from "../models/user.model.js";
// import { Meeting } from "../models/meeting.model.js";
// import bcrypt from "bcrypt";
// import crypto from "crypto";

// // 🆕 Delete meeting function
// const deleteMeeting = async (req, res) => {
//   const { meetingCode } = req.params;

//   try {
//     const deleted = await Meeting.findOneAndDelete({ meetingCode });
//     if (!deleted) {
//       return res.status(httpStatus.NOT_FOUND).json({ message: "Meeting not found" });
//     }
//     return res.status(httpStatus.OK).json({ message: "Meeting deleted successfully" });
//   } catch (error) {
//     return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       message: `Something went wrong: ${error.message}`,
//     });
//   }
// };

// const login = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Please Provide" });
//   }

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res
//         .status(httpStatus.NOT_FOUND)
//         .json({ message: "User Not Found" });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (isPasswordCorrect) {
//       const token = crypto.randomBytes(20).toString("hex");
//       user.token = token;
//       await user.save();
//       return res.status(httpStatus.OK).json({ token });
//     } else {
//       return res
//         .status(httpStatus.UNAUTHORIZED)
//         .json({ message: "Invalid Username or password" });
//     }
//   } catch (e) {
//     return res.status(500).json({ message: `Something went wrong ${e}` });
//   }
// };

// const register = async (req, res) => {
//   const { name, username, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res
//         .status(httpStatus.FOUND)
//         .json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       username,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(httpStatus.CREATED).json({ message: "User Registered" });
//   } catch (e) {
//     res.json({ message: `Something went wrong ${e}` });
//   }
// };

// const getUserHistory = async (req, res) => {
//   const { token } = req.query;

//   try {
//     const user = await User.findOne({ token });
//     const meetings = await Meeting.find({ user_id: user.username });
//     res.json(meetings);
//   } catch (e) {
//     res.json({ message: `Something went wrong ${e}` });
//   }
// };

// const addToHistory = async (req, res) => {
//   const { token, meeting_code } = req.body;

//   try {
//     const user = await User.findOne({ token });

//     const newMeeting = new Meeting({
//       user_id: user.username,
//       meetingCode: meeting_code,
//     });

//     await newMeeting.save();

//     res.status(httpStatus.CREATED).json({ message: "Added code to history" });
//   } catch (e) {
//     res.json({ message: `Something went wrong ${e}` });
//   }
// };

// export { login, register, getUserHistory, addToHistory, deleteMeeting };


import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";

// Login
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token });
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid username or password" });
    }
  } catch (e) {
    return res.status(500).json({ message: `Something went wrong: ${e}` });
  }
};

// Register
const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.FOUND).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(httpStatus.CREATED).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong: ${e}` });
  }
};

// Get user meeting history
const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Invalid token or user not found" });
    }

    const meetings = await Meeting.find({ user_id: user.username });
    res.json(meetings);
  } catch (e) {
    res.status(500).json({ message: `Something went wrong: ${e}` });
  }
};

// Add meeting to history
const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Invalid token" });
    }

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();
    res.status(httpStatus.CREATED).json({ message: "Meeting added to history" });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong: ${e}` });
  }
};

// 🆕 Delete a single meeting by ID
const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMeeting = await Meeting.findByIdAndDelete(id);
    if (!deletedMeeting) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Meeting not found" });
    }

    res.status(httpStatus.OK).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error deleting meeting: ${error}` });
  }
};

export { login, register, getUserHistory, addToHistory, deleteHistory };
