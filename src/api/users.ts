import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator"; // 유효성검사

const router = express.Router();

import User from "../models/User";

/**
 *  @route Post api/users
 *  @desc Register User
 *  @access Public
 */

//회원가입
router.post(
  "/",
  [ //try-catch문 전에 check로 비어있으면 안되는 항목들 check로 유효성 검사
    check("name", "Name is required").not().isEmpty(),
    check("id", "id is required").not().isEmpty(), // isEmail은 있는데.. 체크할 필요가 없나?
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);  //try-catch문 전에 validationResult 함수로 위에 check로 되어있는 항목들을 쭉 검사
    if (!errors.isEmpty()) { //만약 errors가 비어있지 않으면! 유효성검사에서 뭔가 에러가 생긴 것
      return res.status(400).json({ errors: errors.array() });
    }
    //errors가 채워져 있으면 유효성검사 통과 된 것이므로 아래 코드 실행 
    const { name, id, password } = req.body;

    try {
      // See if  user exists
      let user = await User.findOne({ id });

      if (user) {
        res.status(400).json({
          errors: [{ msg: "User already exists" }],
        });
      }

      user = new User({
        name: name,
        id: id,
        password: password,
      });

      // Encrpyt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

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

module.exports = router;
