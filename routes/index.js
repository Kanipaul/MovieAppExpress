var express = require('express');
var router = express.Router();
var fs=require('fs');
var bodyParser = require('body-parser');


var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Reading json for getting movie details*/
router.get('/readjson', function(req, res){
  var data=fs.readFileSync('public/movies.json');
  res.json(data.toString());
});

/* Adding a new movie */
router.post('/addMovie', function(req, res){
console.log("Inside Add Method");
var content=JSON.parse(fs.readFileSync('public/movies.json'));
var obj = {};
    obj.Title=req.body.Title;
    obj.Poster=req.body.Poster;
    obj.Year=req.body.Year;
    obj.Actors=req.body.Actors;
    obj.Director=req.body.Director;
    obj.Plot=req.body.Plot;
    obj.Released=req.body.Released;
    console.log(obj);
    content.push(obj);
    fs.writeFile('public/movies.json', JSON.stringify(content, null, 4), function(err) {
      console.log("Added new movie successfully");
      if(err) {
      console.log(err);
      }
  });
  res.redirect("/");
});

/* Updating a movie */
router.post('/updateMovie', function(req, res){
  console.log("Inside Update Method");
  var content=JSON.parse(fs.readFileSync('public/movies.json'));
  var obj = {};
  for(var i=0;i<content.length;i++)
     {
       if(content[i].Title==req.body.Title)
       {
         content[i].Title=req.body.Title;
         content[i].Poster=req.body.Poster;
         content[i].Year=req.body.Year;
         content[i].Actors=req.body.Actors;
         content[i].Director=req.body.Director;
         content[i].Plot=req.body.Plot;
         content[i].Released=req.body.Released;
       }
     }
     fs.writeFile('public/movies.json', JSON.stringify(content, null, 4), function(err) {
       console.log("Finished updating json record");
       if(err) {
          console.log(err);
      }
  });
  res.redirect("/");
});

/* Deleting a movie */
router.post('/deleteMovie', function(req, res){
  console.log("Inside Delete Method");
  var content=JSON.parse(fs.readFileSync('public/movies.json'));
  var obj = {};
  var newContent=[];

  for(var i=0; i<content.length; i++){
    if(content[i].Title==req.body.Title)
    {
      continue;
    }
    else
    {
      console.log("Title does not match"+content[i]);
      newContent.push(content[i]);
    }
  }
  fs.writeFile('public/movies.json', JSON.stringify(newContent, null, 4), function(err) {
    console.log("Deleted json record successfully");
    if(err) {
    console.log(err);
    }
  });

  res.redirect("/");
});


module.exports = router;
