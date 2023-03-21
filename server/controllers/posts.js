//use data management from models
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


//function call the data of post from database
export const getPosts = async (req, res) => {
    try {
        // find data in model
        const postMessages = await PostMessage.find();

        console.log(postMessages);
        // if has data in database show data
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
//function for create a new post to database
export const createPost = async (req, res) => {
    const post = req.body;
    // newPost = use data model with body req.
    //create new data with structure from model/postMessage.js
    const newPost = new PostMessage(post); //models

    try {
        await newPost.save(); //use model and save data to database
        // if success show data
        res.status(201).json(newPost); 
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
//function for edit post
export const updatePost = async (req, res) => {
    // routes => /posts/12 (id = 12)
    const { id: _id } = req.params; //rename para id to _id by :
    //_id is on the database object
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this id');
    //check id of post in database if null send message error

    

    const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new:true }); //find id in db and update with new data post
    res.json(updatePost);
}

//delete
export const deletePost = async (req, res) => {
    // id in the route
    const { id } = req.params; //rename para id to _id by :

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');
    //check id of post in database if null send message error

    await PostMessage.findByIdAndRemove(id);

    console.log('DELETE');

    res.json({ message: 'Post deleted success' });
}
//like post
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');
    //check id of post in database if null send message error

    const post = await PostMessage.findById(id);
    const updatePost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })

    res.json(updatePost);
}