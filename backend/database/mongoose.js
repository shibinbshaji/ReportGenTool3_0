const mongoose = require ('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://vapt:vapt@127.0.0.1:27017/reporting',{ useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Database Connected"))
//     .catch((error) => console.log(error));

mongoose.connect('mongodb+srv://vapt:vapt@cluster0.vbaxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex: true })
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(error));


    

module.exports = mongoose;