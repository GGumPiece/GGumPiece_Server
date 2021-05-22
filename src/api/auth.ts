import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator";

const router = express.Router();

import auth from "../middleware/auth";
import User from "../models/User";

/**
 *  @route Post api/auth
 *  @desc Authenticate user & get token(로그인)
 *  @access Public
 */
router.post(
  "/",
  [
    check("id", "Please include a valid id").exists(), // isEmail()에서 이메일이 아니므로 exists()로 변경
    check("password", "Password is required").exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, password } = req.body;

    try {
      let user = await User.findOne({ id });

      if (!user) {
        res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }
      // Encrpyt password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/*
 *  @route GET api/auth
 *  @desc Test Route
 *  @access Public
 */
router.get("/", auth, async function (req: Request, res: Response) {
  try {
    const user = await User.findById(req.body.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Err");
  }
});

module.exports = router;
