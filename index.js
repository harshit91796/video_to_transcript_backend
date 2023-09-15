const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const dotenv = require('dotenv')
dotenv.config();

app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>{
    const videoId = req.query.video_id; 
    const lang = req.query.lang
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'b35f0a8980mshfc940de92f14ad0p15b73bjsn48f6967e6738',
          'X-RapidAPI-Host': 'youtube-transcriptor.p.rapidapi.com'
        }
      };
      
      fetch(`https://youtube-transcriptor.p.rapidapi.com/transcript?video_id=${videoId}&lang=${lang}`, options)
      .then(response => {
          if (!response.ok) {
              throw new Error('Request failed');
          }
          return response.json();
      })
      .then(data => {
          console.log(data);
          res.json(data); 
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'An error occurred' }); 
      });
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("db connected")
}).catch(err => console.log(err))

app.listen(process.env.PORT,()=>{
    console.log('server is on')
})