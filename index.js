const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin : ['https://heartfelt-youtiao-0e89a3.netlify.app','http://localhost:5173','tourism-managment-1daa3.web.app']
}));
app.use(express.json());

const uri = `mongodb+srv://${process.env.Tourism_User}:${process.env.Tourism_User_Pass}@cluster0.kd61vsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    
    
    const userData = client.db("AllCurdUser").collection("tourisData")
    const AddSpot = client.db("AllCurdUser").collection("AddSpotData")

    const viewAllData = client.db("AllCurdUser").collection("CardUser")
    const thailandData = client.db("AllCurdUser").collection("thaiData")
    const indonesiaData = client.db("AllCurdUser").collection("indoData")
    const malaysiaData = client.db("AllCurdUser").collection("malData")
    const vietnamData = client.db("AllCurdUser").collection("VietnamData")
    const colombiaData = client.db("AllCurdUser").collection("ColombiaData")
    const allSpotData = client.db("AllCurdUser").collection("AllSpotData")

    app.get('/data',async(req,res) =>{
        const cursor = viewAllData.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get('/tourismData',async(req,res) =>{
        const cursor = userData.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get('/thaiData',async(req,res) =>{
        const cursor = thailandData.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get('/indoData',async(req,res) =>{
        const cursor = indonesiaData.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get('/malData',async(req,res) =>{
        const cursor = malaysiaData.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get('/vietData',async(req,res) =>{
        const cursor = vietnamData.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get('/colombiaData',async(req,res) =>{
        const cursor = colombiaData.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get('/addspot',async(req,res) =>{
        const cursor = AddSpot.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/addspot/:id', async(req,res) =>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await AddSpot.findOne(query);
        res.send(result);
    })


    app.get('/mylisSpot/:email', async(req,res) =>{
        const email = req.params.email;
        // console.log('delte',id);
        const query = {email :  (email)};
        const cursor = AddSpot.find(query);
        const result = await cursor.toArray();
        res.send(result);
    })


    
    app.get('/allSpotData',async(req,res) =>{
        const cursor = allSpotData.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    


    app.post("/users", async (req,res) => {
        const user = req.body;
        const result = await viewAllData.insertOne(user);
        res.send(result);
    })
    app.post("/tourismData", async (req,res) => {
        const user = req.body;
        const result = await userData.insertOne(user);
        res.send(result);
    })
    app.post("/thaiData", async (req,res) => {
        const user = req.body;
        const result = await thailandData.insertOne(user);
        res.send(result);
    })
    app.post("/indoData", async (req,res) => {
        const user = req.body;
        const result = await indonesiaData.insertOne(user);
        res.send(result);
    })
    app.post("/malData", async (req,res) => {
        const user = req.body;
        const result = await malaysiaData.insertOne(user);
        res.send(result);
    })
    app.post("/vietData", async (req,res) => {
        const user = req.body;
        const result = await vietnamData.insertOne(user);
        res.send(result);
    })
    app.post("/colombiaData", async (req,res) => {
        const user = req.body;
        const result = await colombiaData.insertOne(user);
        res.send(result);
    })
    app.post("/addspot", async (req,res) => {
        const user = req.body;
        const result = await AddSpot.insertOne(user);
        res.send(result);
    })
    app.post("/allSpotData", async (req,res) => {
        const user = req.body;
        const result = await allSpotData.insertOne(user);
        res.send(result);
    })


    app.put('/addspot/:id', async (req,res) => {
        const id = req.params.id;
        const user = req.body;
        console.log(id,user);
        const filter = {_id : new ObjectId(id)};
        const options = {upsert : true};
        const updatedSpot = {
            $set : {
                photo: user.photo,
                spotName : user.spotName,
                countryName : user.countryName,
                location : user.location,
                description : user.description,
                cost : user.cost,
                seasonality : user.seasonality,
                travelTime : user.travelTime,
                totaVisitorsPerYear : user.totaVisitorsPerYear
            }
        };
        const result = await AddSpot.updateOne(filter,updatedSpot,options);
        res.send(result);
    })

    app.delete('/mylisSpot/:id', async(req,res) => {
        const id = req.params.id;
        console.log('delte',id);
        const query = {_id : new ObjectId(id)};
        const result = await AddSpot.deleteOne(query);
        res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res) => {
    res.send('server is running')
})

app.listen(port,() => {
    console.log(`this server is running : ${port}`)
})
