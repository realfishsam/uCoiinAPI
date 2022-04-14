To start nginx server do:
sudo /etc/init.d/nginx restart/stop/start

To access the correct html files do:
node index.js


How it works:
nginx hosts a server and refers to html files or a local port with subdomains on this computer which hosts JS code.
index.js takes care of those js subdomains.

database.js hosts some basic functions that can be used to interact with mongoDB Atlas. Refer to this script for a basic how to.

piesocket.js hosts a websocket on a different port which can recieve data (view piesocket.html. This demonstrates how to send data to piesocket)


FOR CHROME EXTENSION TO WORK PROPERLY RUN converMintToUSD.js, nginx server, index.js & piesocket.js