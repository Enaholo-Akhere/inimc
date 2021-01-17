const mongoose = require('mongoose');
const nimcschema = new mongoose.Schema({
    NO:{
        type: Number,
        min: 4
    },
    FirstName:{
        type: String,
        
    },
    LastName:{
        type: String
    },
    MiddleName:{
        type: String
    },
    Phone:{
        type: Number,
        min: 11
    },
    Email:{
        type: String
    },
    Gender:{
        type: String
    },
    MaritalStatus:{
        type: String
    },
    Occupation:{
        type: String
    },
    Nationality:{
        type: String
    },
    State:{
        type: String
    },
    LGA:{
        type: String
    },
    Addr1:{
        type: String
    },
    Addr2:{
        type: String
    },
    DOB:{
        type: String
    },
    BG:{
        type: String
    },
    GT: {
        type: String
    },
    avatar:{
        type: String
    },
    cloudinary_id:{
        type: String
    },
    time_date_reg:{
        type: String
    },
    unique_id:{
        type: String
    }

});

module.exports = mongoose.model('register', nimcschema);
