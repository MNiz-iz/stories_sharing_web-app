import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// import file router for use router of website
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

//assign every routes in routes file start with /posts
app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://arisa_ap:ployprapat0896001126@started1cluster.pugqhcx.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));


    