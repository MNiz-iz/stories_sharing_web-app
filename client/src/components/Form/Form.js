import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';

import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

import useStyles from './styles';
import { createPost, updatePost } from "../../actions/posts";


//Get a current id for update function 

//create return function is form
const Form = ( { currentId, setCurrentId } ) => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: ''});
    //return one post is update with condition if id of state = currentID
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post); //if post have update post => set data with update data and send [] of new update data
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        //if current id noy null call updatePost function with current id
        if (currentId) {
            dispatch(updatePost(currentId, postData));
        } else { 
            //sent data to reducers in posts.js and state is CREATE
            dispatch(createPost(postData)); //if id is null create post
        }
        clear(); // call clear function
        
    }

    const clear = () => {
        setCurrentId(null); //restore currentID from state
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: ''}); //set post data is empty
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating' } your story</Typography>
            
            <TextField name="creator" variant="outlined" label="creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
            <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
            
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}/></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>clear</Button>
            </form>
        </Paper>
    );
}

export default Form;