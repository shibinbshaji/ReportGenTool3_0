const mongoose = require('mongoose');

const appDetailsSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:true,
        // required:true
    },
    _appId:
    {
        type: mongoose.Types.ObjectId,
        required:true 
    },
    completed:{
        type:Boolean,
        default:false
    },
    vulnerabilities:{
        type: Number,
        default:0
    }
});

const appDetails = mongoose.model('appDetails', appDetailsSchema);

module.exports = appDetails;