const express= require("express");
const authController = require("../controller/userController");
const sosController = require("../controller/sosController");

const {errorHandler} = require("../utils/errorHandle");
const authMiddleware = require("../middleware/authMiddleware");
const authRouter = express.Router();


authRouter.post("/signup", errorHandler(authController.register));
authRouter.post("/login", errorHandler(authController.login));
authRouter.get("/getLoggedInUser", authMiddleware, errorHandler(authController.getUserProfile));

authRouter.post("/updateLoc", authMiddleware, errorHandler(authController.updateUserLocation));
authRouter.post("/sos/create", authMiddleware, errorHandler(sosController.createSOS));
authRouter.get("/sos/getAll", authMiddleware, errorHandler(sosController.getAllSOS));




module.exports = authRouter;