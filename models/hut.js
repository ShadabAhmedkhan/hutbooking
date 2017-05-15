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

    // user:{
    //     type: String
    // },
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
    }
    // imgPath:[],
    // bookedDates:[]
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
// module.exports.addHuts = function (newHuts, callback) {
//      newHuts.save(callback);
   
// }
