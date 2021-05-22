import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

import Post from "../models/Post";

const router = express.Router();

/**
 * @route POST api/posts
 * @desc Create a post
 * @access Private
 */
router.post(
  "/",
  auth,
  [
    check("content", "Content is required").not().isEmpty(),
    check("emoji", "Emoji is required").not().isEmpty()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, emoji } = req.body;

    try {
      const newPost = new Post({
        content: content,
        emoji: emoji,
      });
      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
)