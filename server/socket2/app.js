const express = require('express')
const app = express();
const cors = require('cors')

//SOCKET FOR CHAT
const http = require('http');
const socketServer = require('./socket-server');
const server = http.createServer(app);
socketServer.init(server);
//

const port = process.env.PORT || 5001


app.use(cors())



server.listen(port, ()=>{
    console.log('server started');
})



