// This script acts as a proxy pass if one connects to /hashes or /reward.
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const querystring = require('querystring');
const app = require("express")();
const PORT = 8000;

// import websockets & http
// const ws = require('ws');
const expressWs = require("express-ws")(app);
http = require("http");

var WebSocketServer = require("ws").Server;

my_headers = {
    'X-API-ID': '',
    'X-API-KEY': ''
}

// allow CORS
const cors = require('cors');
const res = require("express/lib/response");
app.use(cors({origin: "*"}));

app.use(function (req, res, next) {
    // console.log('middleware');
    req.testing = 'testing';
    return next();
  });


// fetch functions here and vars
let response;
let url_imp;


async function get_imp(argument) {
    try {
        url_imp = `https://www.coinimp.com/api/v1/${argument}?currency=mintme&public=&private=`;
        response = await fetch(url_imp);
        response = await response.json();
        response = await response.message;

        console.log(response);

        return response;
    }
    catch (err) {
        console.log(err);
    }
}
async function complete(arg, request, resp) {
    try {
        await get_imp(arg)

        resp.status(200).send({
            message: response,
            status: "success",
        })
    }
    catch (err) {
        console.log(err);
    }
}

async function get_usr(usrid, res) {
    try {
        console.log("Getting Data")
        await fetch(`https://www.coinimp.com/api/v2/user/balance?site-key=&user=${usrid}`, { method: "GET", headers: my_headers })
            .then(response => response.json())
            .then(data => res.send(data));

        console.log("Done!")

    } catch (err) {
        console.log(err)
    }

}


app.listen(
    PORT,
    () => console.log(`http:///:${PORT}`)

)

// A guide to creating new get requests
// use complete function and pass the link header to coinimp, also pass "req" and "res".

app.get("/hashes", (req, res) => {
    // connect to CoinImp API her
    complete("hashes", req, res);

});

app.get("/reward", (req, res) => {
    // connect to CoinImp API her
    complete("reward", req, res);

});

// this now works do: https://ucoiin.com/user?id={usr_id here}
app.get("/user/", (req, res) => {
    test = get_usr(req.query.id, res);

})
