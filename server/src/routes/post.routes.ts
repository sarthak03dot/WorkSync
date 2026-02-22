import { Router } from "express";
import {
    createPost,
    getPosts,
    likePost,
    ratePost,
    addComment,
    deleteComment,
    uploadImage,
    updatePost,
    deletePost,
    getLikedPosts,
    getCommentedPosts,
    toggleSavePost,
    getSavedPosts
} from "../controllers/post.controller";

import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createPostSchema } from "../validations/schema";

import multer from "multer";
import { uploadMiddleware } from "../config/cloudinary.config";

const router = Router();

router.get("/", protect, getPosts);
router.post("/", protect, validate(createPostSchema), createPost);

router.post(
    "/upload",
    protect,
    uploadMiddleware.single("image"),
    uploadImage
);

router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.get("/liked", protect, getLikedPosts);
router.get("/commented", protect, getCommentedPosts);
router.get("/saved", protect, getSavedPosts);
router.post("/:id/save", protect, toggleSavePost);
router.post("/:id/like", protect, likePost);
router.post("/:id/comment", protect, addComment);
router.delete("/:id/comment/:commentId", protect, deleteComment);
router.post("/:id/rate", protect, ratePost);

export default router;