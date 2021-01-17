const express = require('express');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const rout = express.Router();
const nimcschema = require('../model/dbschema');
const { update } = require('../model/dbschema');


rout.get('/register', (req, res)=>{
    res.render('register.hbs', {
        viewTitle: 'REGISTRATION PAGE',
        viewTitle2: 'USER'
    })
});

rout.get('/adduser', (req, res)=>{
    res.render('adduser.hbs', {
        viewTitle: 'ADD USER',
        viewTitle2: 'ADMIN'
    })
});


rout.post('/register', upload.single("picture"), async (req, res)=>{
    
   const result = await cloudinary.uploader.upload(req.file.path);
    const registration = new nimcschema({
        FirstName: req.body.fname, 
        LastName: req.body.lname, 
        MiddleName: req.body.mname, 
        Phone: req.body.tel, 
        Email: req.body.email, 
        Gender: req.body.gender, 
        MaritalStatus: req.body.maristat, 
        Occupation: req.body.occupation, 
        Nationality: req.body.nationality, 
        State: req.body.state, 
        LGA: req.body.lga, 
        DOB: req.body.dob, 
        BG: req.body.bg,
        GT: req.body.gt,
        FirstName: req.body.fname, 
        LastName: req.body.lname, 
        MiddleName: req.body.mname, 
        Phone: req.body.tel, 
        Email: req.body.email, 
        Gender: req.body.gender, 
        MaritalStatus: req.body.maristat, 
        Occupation: req.body.occupation, 
        Nationality: req.body.nationality, 
        State: req.body.state, 
        LGA: req.body.lga,
        Addr1: req.body.addr1,
        Addr2: req.body.addr2,
        DOB: req.body.dob, 
        BG: req.body.bg,
        GT: req.body.gt,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
        time_date_reg: result.created_at,
        unique_id: req.body.unique_id
    });
    await registration.save()
    .then(data=>{
        console.log(data)
        const userDetail = {
            firstName: data.FirstName, 
            lastName: data.LastName, 
            middleName: data.MiddleName,
            unique_id: data.unique_id,
            DOB: data.DOB,
            time_date_reg: new Date(data.time_date_reg).toDateString(),
            avatar: data.avatar,
            Gender: data.Gender,
            State: data.State,
            LGA: data.LGA,
            Phone: data.Phone,
            GT:data.GT,
            BG: data.BG,
            addr1: data.Addr1,
            addr2: data.Addr2,
            email: data.Email,
            occupation: data.Occupation,
            mstatus: data.MaritalStatus,
            NO: data.NO
        }
        res.render('crd.hbs',{userDetail})
    })
   
    .catch (data=>{
        res.json({message: data})   
    })
})




rout.get('/list', (req, res)=>{
    nimcschema.find((err, docs) => {
        if(!err){
            res.render('list', {
                list: docs,
                viewTitle: 'Registered Users'
            });
        }
        else{
            console.log(err)
        }
    })
})


rout.get('/:id', (req, res) => {
    nimcschema.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render('edit', {
                viewTitle: "UPDATE USER DETAILS",
                viewTitle2: "ADMIN",
                nimcvalue: doc
            })
        }
    })
})


rout.get('/delete/:id', (req, res) => {
    nimcschema.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/emp/list');
        }
        else{
            console.log('Erro in fetching user data :' + err);
        }
    })
})
module.exports = rout;
