const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');


const appDetails = require('./database/models/appDetails');
const clientDetails = require('./database/models/clientDetails');
const vulnerabilityCategory = require('./database/models/vulnerabilityCategory');
const vulnerabilitySubcategory = require('./database/models/vulnerabilitySubcategory');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, x-Requested-With, Content-Type, Accept");
    next();
});

/*
appDetails: Create, Update, ReadOne, ReadAll, Delete
clientDetails: Create, Update, ReadOne, ReadAll, Delete
*/


/**************************************************************************************** A P P . D E T A I L S ************************************************************************************************************** */ 

/* read all App Details */
app.get('/appDetails',(req, res)=>{
    appDetails.find({})
        .then(appDetails => res.send(appDetails))
        .catch((error) => console.log(error));
});

/* Insert App Detail */
app.post('/appDetails', (req, res) => {
    var newId = new mongoose.mongo.ObjectId(); 
    (new appDetails({ 'name' : req.body.name, '_appId':newId }))
        .save()
        .then((appDetails) => res.send(appDetails))
        .catch((error) => console.log(error));
});

/* read one App Details */
app.get('/appDetails/:appId', (req,res) =>{
    appDetails.find({_id: req.params.appId})
    .then((appDetails) => res.send(appDetails))
        .catch((error) => console.log(error));
});

/* update one App Details */

app.patch('/appDetails/:appId', (req,res) => {
    appDetails.findOneAndUpdate({ '_id': req.params.appId }, {$set:req.body})
    .then((appDetails) => res.send(appDetails))
        .catch((error) => console.log(error));
});

/* delete one App Details */
app.delete('/appDetails/:appId', (req,res)=> {
    appDetails.findByIdAndDelete(req.params.appId)
    .then((appDetails) => res.send(appDetails))
        .catch((error) => console.log(error));
});


/**************************************************************************************** C L I E N T . D E T A I L S ************************************************************************************************************** */ 

/* read all Client Details */
app.get('/clientDetails',(req, res)=>{
    clientDetails.find({})
        .then(clientDetails => res.send(clientDetails))
        .catch((error) => console.log(error));
});

/* Insert Client Detail */
app.post('/clientDetails', (req, res) => {
    var newId = new mongoose.mongo.ObjectId(); 
    (new clientDetails({ 'name' : req.body.name,'_clientId': newId }))
        .save()
        .then((clientDetails) => res.send(clientDetails))
        .catch((error) => console.log(error));
});

/* read one Client Details */
app.get('/clientDetails/:clientId', (req,res) =>{
    clientDetails.find({_id: req.params.clientId})
    .then((clientDetails) => res.send(clientDetails))
        .catch((error) => console.log(error));
});

/* update one Client Details */

app.patch('/clientDetails/:appId', (req,res) => {
    clientDetails.findOneAndUpdate({ '_id': req.params.clientId }, {$set:req.body})
    .then((clientDetails) => res.send(clientDetails))
        .catch((error) => console.log(error));
});

/* delete one Client Details */
app.delete('/clientDetails/:clientId', (req,res)=> {
    clientDetails.findByIdAndDelete(req.params.clientId)
    .then((clientDetails) => res.send(clientDetails))
        .catch((error) => console.log(error));
});


/**************************************************************************************** V U L N E R A B I L I T Y . C A T E G O R Y ************************************************************************************************************** */ 

/* read all vulnerability Details */
app.get('/vulnerabilityCategory',(req, res)=>{
    vulnerabilityCategory.find({})
        .then(vulnerabilityCategory => res.send(vulnerabilityCategory))
        .catch((error) => console.log(error));
});

/* Insert vulnerabiliy Detail */
app.post('/vulnerabilityCategory', (req, res) => {
            (new vulnerabilityCategory({ 'name' : req.body.name,'description':req.body.description,'remediation':req.body.remediation }))
                .save((err, data) => {

                    console.log('Analyzing Data...');
                    if(data) {
                        console.log('Your data has been successfully saved.');
                        res.json(data);
                }
                else {
                  console.log('Something went wrong while saving data.');
                  console.log(err);
                  res.send(err);
                }
                });
});
/* read one vulnerability Details */
app.get('/vulnerabilityCategory/:vulId', (req,res) =>{
    vulnerabilityCategory.find({'_id': req.params.vulId})
    .then((vulnerabilityCategory) => res.send(vulnerabilityCategory))
        .catch((error) => console.log(error));
});

/* update one vulnerability Details */


app.patch('/vulnerabilityCategory/:vulId', (req,res) => {
    vulnerabilityCategory.findOneAndUpdate({ '_id': req.params.vulId }, {$set:req.body})
    .then((vulnerabilityCategory) => res.send(vulnerabilityCategory))
        .catch((error) => console.log(error));
});

/* delete one vulnerability Details */
app.delete('/vulnerabilityCategory/:vulId', (req,res)=> {
    vulnerabilityCategory.findByIdAndDelete(req.params.vulId)
    .then((vulnerabilityCategory) => res.send(vulnerabilityCategory))
        .catch((error) => console.log(error));
});

/**************************************************************************************** V U L N E R A B I L I T Y . S U B C A T E G O R Y ************************************************************************************************************** */ 

/* read all vulnerability subcategories of a vulnerability */
app.get('/vulnerabilityCategory/:vulId/vulnerabilitySubcategory',(req, res)=>{
    vulnerabilitySubcategory.find({'_vulnerabilityId': req.params.vulId})
        .then((vulnerabilitySubcategory) => res.send(vulnerabilitySubcategory))
        .catch((error) => console.log(error));
});

/* Insert vulnerabiliy subcategory into a vulnerability*/
app.post('/vulnerabilityCategory/:vulId/vulnerabilitySubcategory/', (req, res) => {
            (new vulnerabilitySubcategory({ '_vulnerabilityId': req.params.vulId, 'name' : req.body.name,'description':req.body.description,'remediation':req.body.remediation }))
                .save((err, data) => {

                    console.log('Analyzing Data...');
                    if(data) {
                        console.log('Your data has been successfully saved.');
                        res.json(data);
                }
                else {
                  console.log('Something went wrong while saving data.');
                  console.log(err);
                  res.send(err);
                }
                });
});
/* read one subcategory of a vulnerability  */
app.get('/vulnerabilityCategory/:vulId/vulnerabilitySubcategory/:_Id', (req,res) =>{
    vulnerabilitySubcategory.find({'_id': req.params._Id})
    .then((vulnerabilitySubcategory) => res.send(vulnerabilitySubcategory))
        .catch((error) => console.log(error));
});

/* update one subcategory of a vulnerability  */


app.patch('/vulnerabilityCategory/:vulId/vulnerabilitySubcategory/:_Id', (req,res) => {
    vulnerabilitySubcategory.findOneAndUpdate({ '_id': req.params._Id }, {$set:req.body})
    .then((vulnerabilityCategory) => res.send(vulnerabilityCategory))
        .catch((error) => console.log(error));
});

/* delete one subcategory of a vulnerability */
app.delete('/vulnerabilityCategory/:vulId/vulnerabilitySubcategory/:_Id', (req,res)=> {
    vulnerabilitySubcategory.findByIdAndDelete(req.params._Id)
    .then((vulnerabilitySubcategory) => res.send(vulnerabilitySubcategory))
        .catch((error) => console.log(error));
});



app.listen(3000 , () => console.log("Server is Conected on port 3000"));