let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017";
const dbName = "test";
const collectionName = 'doggos';
let port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection(collectionName);
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    res.render('indexMongo.html');
});

app.get('/api/doggos', (req,res) => {
    getAllDoggos((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all doggos successful'});
        }
    });
});

// Route to handle the delete request
app.delete('/delete-collection', (req, res) => {
    const db = client.db(dbName);
    // Drop/delete the database
    db.collection(collectionName).deleteMany({}, (deleteErr, result) => {
        if (deleteErr) {
          console.error('Error occurred while deleting items in the collection', deleteErr);
          return res.status(500).send('Error occurred while deleting items in the collection');
        }
  
        console.log('All items in the collection deleted successfully');
        return res.send('All items in the collection deleted successfully');
    });
});


app.post('/api/doggo', (req,res)=>{
    let dog = req.body;
    postDoggo(dog, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});


function postDoggo(dog,callback) {
    collection.insertOne(dog,callback);
}

function getAllDoggos(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
    console.log('express server started');
    runDBConnection();
});