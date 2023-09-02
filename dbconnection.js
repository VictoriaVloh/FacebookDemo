const { MongoClient, ServerApiVersion } = require("mongodb");
 // "mongodb+srv://vika:vloh@cluster0.lh7kezh.mongodb.net/?retryWrites=true&w=majority";
 //const uri = "mongodb+srv://mjafinaa:Netanya30@cluster0.9aubyhn.mongodb.net/?retryWrites=true&w=majority";
//const uri = "mongodb+srv://mjafinaa:Netanya30@cluster0.9aubyhn.mongodb.net/"

const uri = "mongodb+srv://mjafinaa:vika@cluster0.9aubyhn.mongodb.net/?retryWrites=true&w=majority";





// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});



module.exports =  {mongoClient} ;