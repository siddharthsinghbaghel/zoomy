// import { Router } from "express";
// import { addToHistory, getUserHistory, login, register } from "../controllers/user.controller.js";



// const router = Router();

// router.route("/login").post(login)
// router.route("/register").post(register)
// router.route("/add_to_activity").post(addToHistory)
// router.route("/get_all_activity").get(getUserHistory)

// export default router;

// import { Router } from "express";
// import {
//   addToHistory,
//   getUserHistory,
//   login,
//   register,
//   deleteMeeting,  // 🆕 Add this
// } from "../controllers/user.controller.js";

// const router = Router();

// router.route("/login").post(login);
// router.route("/register").post(register);
// router.route("/add_to_activity").post(addToHistory);
// router.route("/get_all_activity").get(getUserHistory);

// // 🆕 Delete Meeting Route
// router.route("/delete_activity/:meetingCode").delete(deleteMeeting);

// export default router;


import { Router } from "express";
import {
  addToHistory,
  getUserHistory,
  login,
  register,
  deleteHistory,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity").post(addToHistory);
router.route("/get_all_activity").get(getUserHistory);

// 🆕 New route for deleting a specific meeting
router.route("/delete_activity/:id").delete(deleteHistory);

export default router;
