import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

import Post from "../models/Post";
import auth from "../middleware/auth";
import User from "../models/User";

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
      let user = await User.findOne({ id: req.body.user.id });
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
router.get("/:id", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ id: req.body.user.id });
    const post = user.posts.find(post => post._id === req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    // if (error.kind === "ObjectId") {
    //   return res.status(404).json({ message: "Post not found" });
    // }
    res.send("Server Error");
  }
})

/**
 * @route DELETE api/posts/:id
 * @desc Delete a post
 * @access Private
 */
router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.user.id).select("-password");
    const post = user.posts.find(post => post._id === req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const removeIndex = user.posts
    .map((post) => post._id)
    .indexOf(req.params.id);

    user.posts.splice(removeIndex, 1);
    await user.save()
    res.json(user.posts);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(500).send("Server Error");
  }
})

module.exports = router;