const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.SERVER_PORT
// const mongoose = require('mongoose');
app.use(express.json());

app.use('/api', require('./api/user/Router'));
app.use('/api', require('./api/products/Router'))


// mongoose.connect(process.env.MONGO_URL)
// .then(()=>{
//   console.log("DB Connected")
// })
// .catch((err)=>{
//   console.log("ERROR", err)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})