
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoute from '../server/route/posts.js'
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());




app.use('/posts', postRoute,)

app.use(express.json());
const db = `mongodb+srv://mernproject:i9iUbynW7j76YtJ8@cluster0.ow5x2.mongodb.net/?retryWrites=true&w=majority`



mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
);

// app.use(foodRouter);

app.listen(5000, () => {
    console.log("Server is running...");
})