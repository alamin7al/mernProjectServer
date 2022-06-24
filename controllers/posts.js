import postmessage from "../models/postMessage.js"
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessage = await postmessage.find()
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new postmessage(post)

    try {
        newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with that id')
    const updatePost = await postmessage.findByIdAndUpdate(_id, post, { new: true })
    res.json(updatePost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that id')
    await postmessage.findByIdAndRemove(id)
    res.json({ message: 'post deelted' })
}

export const likePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that id')
    const post = await postmessage.findById(id)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that id')
    const updatePost = await postmessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
    res.json(updatePost)
}




