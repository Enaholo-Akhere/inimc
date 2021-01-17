const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    }) 
    .then(()=>{
        console.log("Successfully connected to Database")
    })
    .catch((err)=>{
        console.log(err)
    })
module.exports = mongoose;

