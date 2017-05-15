const express = require('express');
const router = express.Router();
const multer = require('multer');                  // Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
const fs = require('fs');
const Huts = require('../models/hut');
const config = require('../config/database');

// ADDING HUT
 router.post('/addhut', (req , res, next)=>{
let newhut = new Huts({
     user: req.body.email,
         name: req.body.name,
         unit: req.body.unit,
         rooms: req.body.rooms,
         maxPersonAllowed: req.body.maxPersonAllowed,
         address: req.body.address,
         location: req.body.location,
         latitude: req.body.latitude, 
         longitude: req.body.longitude,
         rent: req.body.rent,
         description: req.body.description
        //  imgPath: req.body.imgPath,
        //  bookedDates: req.body.bookedDate
});
Huts.addHut(newhut, (err,hut)=>{
 if(err){
  res.json({success: false,msg:  'faild to register user'});
 }else{
  res.json({success: true, msg:  'user registered'});
    }
});
 });

// GET ALL HUTS

  router.get('/huts', (req , res, next)=>{

Huts.getHutBylocation((err,hut)=>{
 if(err){
     throw err;
 }
 res.json(hut);
});
});



module.exports = router;