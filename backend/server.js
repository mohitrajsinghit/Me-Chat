const express = require('express');
const dotenv = require('dotenv');
const {chats} = require('./data/data');
const connectDB = require('./config/db');
const colors = require("colors");
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const {notFound,errorHandler} = require('./middlewares/errorMiddleware');

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accpet the json type data


app.get('/',(req,res) =>{
  res.send('Api is runninng');
});


app.get('/api/chat',(req,res)=>{
  res.send(chats);
});

app.use('/api/user',userRoutes)
app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT ||  5000;

app.listen(5000, console.log(`Server started in port number ${PORT}`.blue.bold));
