
const express = require('express');
bodyParser = require('body-parser');
let app = express();
const fs = require('fs')


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
})

app.listen(3000, () => {
    console.log('server is running')
})



const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

function sendData() {
    let rawdata = fs.readFileSync('jsondata.json');
    let student = JSON.parse(rawdata);
    return student

}




let json

app.use(express.json())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.post('/data', function (req, res) {
    //json = JSON.parse(JSON.stringify(req.body))
    //res.json(console.log(json));
    json = req.body
    console.log(req.body)
    res.json({

        status: "success"

    });

})



app.get('/test', function (req, res) {
    //  let c = JSON.parse(JSON.stringify(json))
    //  res.header('content-type', 'application/json')
    res.send(json);

    //let x = c
    let d = new Date();
    console.log(json[0].dependance_adherence.name)
    let filename = json[0].info.nom_Projet.toString() + "_" + d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "_";
    filename += (d.getHours() + ":" + d.getMinutes()) + "_";
    filename += '.json'
    let x = 'data' + json[0].info.nom_Projet.toString() + '-' + d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + '.json'

    storeData(json, filename)
})


app.get('/databack', function (req, res) {
    res.send(sendData())

})


