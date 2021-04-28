const mongoose = require('mongoose');

const clientDetailsSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        minlength:3
    },
    _clientId:
    {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const clientDetails = mongoose.model('clientDetails',clientDetailsSchema);

module.exports = clientDetails;