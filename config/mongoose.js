

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;



// // BHucasP1IwOI7Hpm
// // mongodb+srv://Anonymous:<password>@cluster0.qqbon1u.mongodb.net/?retryWrites=true&w=majority

// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // const uri = "mongodb+srv://Anonymous:BHucasP1IwOI7Hpm@cluster0.qqbon1u.mongodb.net/Social-Media?retryWrites=true&w=majority";
// // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// // client.connect(err => {
// //   const collection = client.db("test").collection("devices");
// //   // perform actions on the collection object
// //   client.close();
// // });
// // client.on('error',console.error.bind(console,"Error Connecting to MongoDb"));

// // client.once('open',function(){
// //     console.log("connected")
// // })

// module.exports= client;
// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://shubhamgoel2100:zxcvbnm123@cluster0.x3zxqv2.mongodb.net/SocialMedia?retryWrites=true&w=majority');

// // mongodb+srv://shubhamgoel2100:zxcvbnm123@cluster0.x3zxqv2.mongodb.net/SocialMedia?retryWrites=true&w=majorityS

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });


// module.exports = db;
