const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@sickcluster.nqy80.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const noticeCollection = client.db("cpiCmt").collection("notice");



        app.post('/notice', async (req, res) => {
            const notice = req.body;
            // console.log(notice)
            const result = await noticeCollection.insertOne(notice);
            res.send(result)
        })


        app.get('/noticeTitle', async (req, res) => {
            const query = {};
            const result = await noticeCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/noticeAll', async (req, res) => {
            const query = {};
            const result = await noticeCollection.find(query).toArray();
            res.send(result);
        })




    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('cpi department of computer science & technology')
})

app.listen(port, () => {
    console.log(`server is running ${port}`)
})