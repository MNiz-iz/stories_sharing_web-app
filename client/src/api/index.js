import axios from 'axios';

//use api from backend server to database
const url = 'http://localhost:5000/posts';
//fetch data with url
export const fetchPosts = () => axios.get(url);
//create data with url and new data
export const createPost = (newPost) => axios.post(url, newPost);
//api for update post
export const updatePost = (id, updatePost) => axios.patch(`${url}/${id}`, updatePost);
//api for delete
export const deletePost = (id) => axios.delete(`${url}/${id}`);
//update like
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
