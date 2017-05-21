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
         description: req.body.description,
        //  imgPath: req.body.imgPath,
         bookedDates: req.body.bookedDate
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


router.delete('/:id', (req, res, next)=>{
    // console.log('delete request', req.params.id);
    let id = req.params.id;
    Huts.deleteHut(id, (err, hut)=>{
        if(err) throw ANGLE_instanced_arrays
        else{
            res.json({
                success:true,
                msg: 'hut deleted'
            })
        }
    })
})


router.get('/huts/:email',(req, res, next)=>{
    // console.log('get', req.body);
    let email = req.params.email
    // console.log(user.email);
    Huts.getHutsByEmail(email, (err, hut)=>{
        if(err) throw err

        else{


// let hutData = []
//             for(var i=0 ; i < hut.length ; i++){

//                 let base64imgArray = [];
//                 for(var j=0 ; j< hut[i].imgPath.length ; j++){
//                     let base64 = new Buffer(fs.readFileSync(hut[i].imgPath[j])).toString('base64')
//                     base64imgArray.push(base64);
//                 }
            // hut
//                 hutData.push({
//         Huts            id: hut[i]._id,
//                     user: hut[i].user,
//                     name: hut[i].name,
//                     unit:hut[i].name,
//                     rooms: hut[i].rooms,
//                     maxPersonAllowed: hut[i].maxPersonAllowed,
//                     address: hut[i].address,
//                     location: hut[i].location,
//                     latitude: hut[i].latitude,
//                     longitude: hut[i].longitude,
//                     rent: hut[i].rent,
//                     description: hut[i].description,
//                     bookedDates: hut[i].bookedDates,
//                     base64Img: base64imgArray
//                 })

//             }
                             res.json(hut);
            
            // console.log(hutData.length)
        }
    })
})

router.post('/book', (req, res, next) =>{
    
    let bookInfo = {
        id: req.body.id,
        date: req.body.date
    }
    console.log('bookedDates', bookInfo);
    Huts.updateHut(bookInfo, (err, hut)=>{
        if(err){
            res.json({
                success: false,
                msg: 'Error'
            })
        }

        else{
            res.json({
                success: true,
                msg: 'Hus is booked successfully'
            })
        }
    })
})
router.put('/update/:id',(req,res,next)=>{

    let updateData={
id: req.params.id,
         name: req.body.name,
         rooms: req.body.rooms,
         mPAllowed: req.body.mPAllowed,
         rent: req.body.rent,
         description: req.body.description
    }
        console.log('updateMyHut', updateData);

      Huts.updateMyHut(updateData, (err, hut)=>{
        if(err){
            res.json({
                success: false,
                msg: 'Error'
            })
        }

        else{
            res.json({
                success: true,
                msg: 'Hus is updated successfully'
            })
        }
    })
})
module.exports = router;