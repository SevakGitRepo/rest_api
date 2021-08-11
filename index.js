const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");

const app = express();

const PORT = 8080;
//bodin karena jsoni het ashxati
app.use(bodyParser.json());
//url harcumic json vercnelu ev ashxatelu hamar
app.use(bodyParser.urlencoded({extended:true}))

const PATH = "./data/user_info.json";

const saveData = (data)=>{
    //JSON parse to String
    let stringify = JSON.stringify(data)
    fs.writeFileSync(PATH, stringify)
}

const getData = ()=>{
    let json = fs.readFileSync(PATH);
    return  JSON.parse(json);
}

app.get("/users", (request, response)=>{
    fs.readFile(PATH,  "utf8", (error, data)=>{
        if(error){
            throw error;
        }else {
            response.send(JSON.parse(data));
        }
        }
    )
})

app.post("/users", (request, response)=> {

        let body = request.body;
        let getUsersData = getData();
        const id = uuidv4();
    getUsersData[id] = body;
        saveData(getUsersData);
    response.send("Ok");
    })

app.put("/users/:id", (request, response)=> {

    let body = request.body;
    let getUsersData = getData();
    const id = request.params.id;
    getUsersData[id] = body;
    saveData(getUsersData);
    response.send("Ok");
})


app.delete("/users/:id", (request, response)=> {

    let getUsersData = getData();
    const id = request.params.id;
    delete getUsersData[id];
    saveData(getUsersData);
    response.send("Ok");
})


app.listen(PORT, ()=> console.log("SERVER STARTED IN PORT "+PORT));