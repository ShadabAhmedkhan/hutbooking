const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
//huts Schema
const hutSchema = mongoose.Schema({
    //    name : {
    //     type : String
    // },
    // email:{
    //     type:String,
    //     required: true,
    //      unique:true
    // },
    // username:{
    //     type: String,
    //     required: true
    // },
    // password:{
    //     type : String,
    //     required: true
    // }

    user:{
        type: String
    },
    name:{
        type: String,
        required: true
    }
    ,
    unit:{
        type: String,
        required: true
    },
    rooms:{
        type: Number,
        required: true
    },
    maxPersonAllowed:{
        type: String,
        required: true
    },
    address:{
        type: String,
        require: true
    },
    location:{
        type: String,
        required: true
    },
    latitude:{
        type:Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
    rent:{
        type:Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    // imgPath:[],
    bookedDates:[]
});

const Huts = module.exports = mongoose.model('hut', hutSchema); 

//ADDING HUTS ON MONGODB
module.exports.addHut = function(newHut, callback){
    console.log('checkss', newHut);
    newHut.save(callback);

}
// const Huts = module.exports = mongoose.model('Huts',hutsSchema);
module.exports.getHutById = function (id, callback){
    Huts.findById(id, callback);
}
module.exports.getHutBylocation =  ( callback,limit) => {
    // const query = {location: location}
    Huts.find( callback);
}


module.exports.getHutsByEmail = function(email,callback){
    // console.log('email');
    Huts.find({user: email},callback);
}
module.exports.deleteHut = function(id, callback){
    Huts.remove({_id: id}, callback);
}
//GETTING HUTS BY ID
module.exports.updateHut = function(bookInfo,callback){
    // hut.findOne({_id : bookInfo.id}, callback);
    Huts.update({_id: bookInfo.id},
    {$push: { bookedDates: bookInfo.date}}, callback);
}

module.exports.updateMyHut = function(updateData, callback){

Huts.update({_id:updateData.id},
{$set:{
        name: updateData.name,
        rooms: updateData.rooms,
        mPAllowed: updateData.mPAllowed,
        rent: updateData.rent,
        description: updateData.description   
}

}, callback);
}