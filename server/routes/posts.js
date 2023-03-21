import express from 'express';

const router = express.Router();

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'
//assign routes

// => /posts form confix in index.js line 11
router.get('/', getPosts);

router.post('/', createPost);

//update new router with id of post
router.patch('/:id', updatePost); //dinamic 

//delete
router.delete('/:id', deletePost);
//like post
router.patch('/:id/likePost', likePost);

export default router;