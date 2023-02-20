const express = require('express');
const fs = require('fs').promises;
const maxVisibleMsg = 7;
const app = express();
const PORT = process.env.PORT;

app.use(express.static(__dirname));
app.use(express.json());

let htmlFile;
let messages = [];

fs.readFile(__dirname + '/index.html')
            .then(result => {
                htmlFile = result;
            })
            .catch(err => {
                console.error(`Error : ${err}`);
                exit(1);
            })

app.get('/',(req,res) => {
    res.setHeader('Content-Type','text/html');
    res.writeHead(200);
    res.end(htmlFile);
})

app.get('/update',(req,res)=>{
    let response = {'messages': messages};
    res.end(JSON.stringify(response));
})

app.post('/messageSent',(req,res)=>{
    let name = req.body.name;
    let msg = req.body.message;
    messages.push(`${name}: ${msg}`);
    if(messages.length > maxVisibleMsg){
        messages.shift();
    }
    console.log(messages);
    let response = {'status': 'OK'}; 
    res.end(JSON.stringify(response));
})

app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}...`);
})