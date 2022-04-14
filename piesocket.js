/*
Purpose:
This script links to signin.html and checks if user exists on sign in, if not creates an user.
*/

const { query } = require("express");
const { json } = require("express/lib/response");
const { MongoClient, Collection } = require("mongodb");

const mongoAdmin = "root";
const mongoPass = "";
const apiKey = ""


let uri = `mongodb+srv://${mongoAdmin}:${mongoPass}@cluster0.p1ed9.mongodb.net/test`;
// uri = "https://data.mongodb-api.com/app/data-dextf/endpoint/data/beta";

const client = new MongoClient(uri);
let usr = null;

async function insert(usrjson, collec) {
try {
    const database = client.db("users");
    const collection = database.collection(collec);

    // create a document to insert
    await collection.insertOne(usrjson);
    
    //console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {console.error(error)};};

/* ---------------------------------------------------------------------------------------- */
  async function find(tokn, usrjson, collec) { //where tokn is google or facebook token, usrjson the json the provider gives us, collection being facebook or google
    try {
      await client.connect();
  
        const database = client.db("users");
        const collection = database.collection(collec);
        let query = {"_id": tokn};
  
        const cursor = await collection.find(query/*, options*/);

        if ((cursor.count()) == 0) {
          console.log("creating user");
          insert(usrjson, collec);
        }
        else (console.log("User Exists!"));
      
        // replace console.dir with your callback to access individual elements
        await cursor.forEach(console.dir);
        await client.close();
  
      } catch(error) {console.error(error);}};


var WebSocketServer = require('ws');
// Creating a new websocket server
var ws = new WebSocketServer.Server({ port: 8080 });
// Creating connection using websocket
ws.on("connection", ws => {
    console.log("new client connected");
    // sending message
    ws.on("message", data => {
        // FIRST WE NEED TO FINDOUT WHETHER USER IS SIGNED IN WITH FB OR GOOGLE
        // We can do this by looking for something that only exists in one of the authResponses for example:
        // google has an id token called "id_token" while facebooks token is called "accessToken". Check if one or the other is undefined and then we'll know
        // console.log(`Client has sent us: ${data}`);
        ws.close()

        try {
          data = JSON.parse(data);
          console.log(data);

          if(data.id_token === undefined){
            console.log("facebook client");
            find(data.id, data, "facebook");
            return null;
          }

          if(data.id_token != undefined){
            console.log("google client");
            find(data.id_token, data, "google");
            return null;
          }

          else{
            return null;
          }
        }
        catch(error) {
          console.log(error);
          console.log("data malformed");
          return null;
        }

    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has disconnected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");
