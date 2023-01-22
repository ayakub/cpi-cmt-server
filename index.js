const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const teacherCollection = client.db("cpiCmt").collection("teacher");


        //addded notice
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

        app.get('/noticeAll/:id', async (req, res) => {
            const id = req.params.i;
            const query = { _id: ObjectId(id) };
            const result = await noticeCollection.findOne(query)
            res.send(result);
        })


        //added teacher

        app.post('/addTeacher', async (req, res) => {
            const teacher = req.body;
            console.log(teacher)
            const result = await teacherCollection.insertOne(teacher);
            res.send(result)
        })
        app.get('/addTeacher/:designation', async (req, res) => {
            const designation = req.params.designation;
            const query = { designation }
            const result = await teacherCollection.find(query).toArray();
            res.send(result)
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