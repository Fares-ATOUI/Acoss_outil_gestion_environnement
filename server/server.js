var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

  next();
});

var db = require('./model/acossDB');

var routes = require('./routes/route'); //importing route
routes(app); //register t

app.listen(port);

app.use(express.json())

//get data from form 
app.post('/data', function (req, res) {
data = req.body
db.insertForm(data)
  res.json({
    status: "success"
  });
})

//get data from form 
app.put('/data', function (req, res) {
  data = req.body

  db.updateForm(data, req.query.id)
  res.json({
    status: "success"
  });
})

app.post('/requete', function (req, res) {
  data = req.body
  db.insertRequete(data)
  res.json({
    status: "success"
  });
})

app.get('/test', function (req, res) {
  res.send(data);
})

app.post('/insertCrud', function (req, res) {
  data = req.body
  db.insertCrud(data)
  res.json({
    status: "success crud "
  });
})

app.delete('/delete', function (req, res) {
  data = req.body
  db.deleteListPlateforme(data)
 res.json({
    status: "delete  crud "
  }); 
})


console.log('todo list RESTful API server started on: ' + port);