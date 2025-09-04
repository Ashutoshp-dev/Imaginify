import express from 'express'
import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
import Post from '../mongodb/models/Post.js'

dotenv.config();
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.route('/').post(async(req,res)=>{
    try{
        const {name,prompt,photo}=req.body
        const photoUrl=await cloudinary.uploader.upload(photo)

        const newPost=await Post.create({
            name,
            prompt,
            photo: photoUrl.url
        })
        res.status(201).json({success:true,data:newPost})

    }catch(error){
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
})

router.route('/').get(async(req,res)=>{
    try{
        const posts=await Post.find({});
        res.status(200).json({success:true,data:posts});
    }catch(error){
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
})

export default router;