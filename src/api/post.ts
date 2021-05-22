import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { userInfo } from "os";

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
      let user = await User.findById(req.body.user.id).select("-password");
      const newPost = new Post({
        content: content,
        emoji: emoji,
      });

      user.posts.unshift(newPost);
      await user.save();
      res.json(user.posts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
)

/**
 * @router GET api/posts/:id
 * @desc Get post by ID
 * @access Private
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Post not found" });
    }
  }
})