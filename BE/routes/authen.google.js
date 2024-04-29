const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport");
const controller = require("../controllers/user.controller");

// Auth
router.get(
  "/",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
// Auth Callback
router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/auth/google/failure",
  })
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    // Xóa phiên của người dùng và chuyển hướng đến trang chính
    req.session.destroy(function (err) {
      res.redirect("http://localhost:3000/");
    });
  });
});

// Success
router.get("/success", controller.successGoogleLogin);

// failure
router.get("/failure", controller.failureGoogleLogin);

module.exports = router;
