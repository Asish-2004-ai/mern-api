

var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var conString = "mongodb+srv://asish:asish@asishcluster.n0oqxmr.mongodb.net/"

var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


app.get("/get-users", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblusers").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
        });
    });
});


  


app.post("/register-user",(req, res)=>{

    var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
    };

    mongoClient.connect(conString).then(clientObject=>{

        var database = clientObject.db("react-video-library");
        database.collection("tblusers").insertOne(user).then(()=>{
            console.log('User Registered');
            res.end();
        });
    });

});

app.put("/forgot/:id", (req, res) => {
    var id = req.params.id;
    var newPassword = req.body.Password;

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblusers").updateOne({ UserId: id }, { $set: { Password: newPassword } }).then(() => {
            console.log(`Password Updated for User ID: ${id}`);
            res.end();
        });
    });
});


app.get("/get-admin", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tbladmin").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
        });
    });
});

app.get("/get-categories", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblcategories").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
        });
    });
});

app.get("/get-video", (req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").find({}).toArray().then(documents=>{
             res.send(documents);
             res.end();
        });
    });
});

app.get("/get-videos/:id", (req, res)=>{
    
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").find({VideoId:parseInt(req.params.id)}).toArray().then(documents=>{
             res.send(documents);
             res.end();
        });
    });
});

app.get("/get-categoryid/:id",(req,res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").find({CategoryId:parseInt(req.params.id)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})








app.put("/edit-video/:id", (req, res) => {
    var id = parseInt(req.params.id);

    var updatedFields = req.body;

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").updateOne({ VideoId: id }, { $set: updatedFields }).then(() => {
            console.log(`Video Updated with ID: ${id}`);
            res.end();
        }).catch(err => {
            console.error('Error updating video:', err);
            res.status(500).send('Failed to update video');
        });
    }).catch(err => {
        console.error('Error connecting to database:', err);
        res.status(500).send('Database connection failed');
    });
});



app.post("/add-video", (req, res)=>{

    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.Dislikes),
        Views: parseInt(req.body.Views),
        CategoryId: parseInt(req.body.CategoryId)
    }

    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").insertOne(video).then(()=>{
             console.log('Video Added Successfully..');
             res.end();
        })
    });
});

app.put("/edit-video/:id", (req, res)=>{

    var id = parseInt(req.params.id);

    var video = {
        VideoId: parseInt(req.body.VideoId),
        Title: req.body.Title,
        Url: req.body.Url,
        Description: req.body.Description,
        Likes: parseInt(req.body.Likes),
        Dislikes: parseInt(req.body.Dislikes),
        Views: parseInt(req.body.Views),
        CategoryId: parseInt(req.body.CategoryId)
    }

    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").updateOne({VideoId:id},{$set:video}).then(()=>{
            console.log(`Video Updated`);
            res.end();
        })
    });
});
// 

app.delete("/delete-video/:id", (req, res)=>{

    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("react-video-library");
        database.collection("tblvideos").deleteOne({VideoId:id}).then(()=>{
            console.log(`Video Deleted`);
            res.end();
        })
    });
});


app.listen(3030);
console.log('Server Started : http://127.0.0.1:3030')

app.put("/update-like/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var newLikes = req.body.Likes;
  
    mongoClient.connect(conString).then(clientObject => {
      var database = clientObject.db("react-video-library");
      database.collection("tblvideos").updateOne({ VideoId: id }, { $set: { Likes: newLikes } }).then(() => {
        console.log(`Likes Updated for Video ID: ${id}`);
        res.end();
      }).catch(err => {
        console.error('Error updating likes:', err);
        res.status(500).send('Failed to update likes');
      });
    }).catch(err => {
      console.error('Error connecting to database:', err);
      res.status(500).send('Database connection failed');
    });
  });
  
  app.put("/update-dislike/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var newDislikes = req.body.Dislikes;
  
    mongoClient.connect(conString).then(clientObject => {
      var database = clientObject.db("react-video-library");
      database.collection("tblvideos").updateOne({ VideoId: id }, { $set: { Dislikes: newDislikes } }).then(() => {
        console.log(`Dislikes Updated for Video ID: ${id}`);
        res.end();
      }).catch(err => {
        console.error('Error updating dislikes:', err);
        res.status(500).send('Failed to update dislikes');
      });
    }).catch(err => {
      console.error('Error connecting to database:', err);
      res.status(500).send('Database connection failed');
    });
  });
  
