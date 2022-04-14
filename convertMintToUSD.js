const fs = require('fs');
const axios = require('axios');

function main() {
  console.log("loop started")
  let response = null;
  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=MINTME&convert=USD', {
        headers: {
          'X-CMC_PRO_API_KEY': '',
          "Accept": "application/json"
        },
      });
    } catch(ex) {
      response = null;
      // error
      console.log(ex);
      reject(ex);
    }
    if (response) {
      // success
      let json = JSON.stringify(response.data).toString();
      json = json.split('{"USD":{"price":')[1].toString();
      json = parseFloat(json.split(",")[0]);
      console.log(json);

      data = `{"price": ${json}}`;

      fs.writeFile("convertMintToUSD.json", data, (err) => {
        if (err) {
          console.log(err);
        }
        else {
          return;
        }
      })

      resolve(json);
    }
  });

  console.log("loop done")

}

setInterval(main, 288 * 1000) // * 1000 to make ms to s
