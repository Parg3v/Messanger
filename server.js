var express = require("express");
var app = express();
var fs = require("fs");
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static("."))

app.get("/", function(req,res){
    res.redirect("index.html");
})

var data = fs.readFileSync("messages.json", 'utf8');
var messages = JSON.parse(data);

io.on('connection', function(socket){
    for(var i of messages){
        socket.emit("got_msg", i);
    }
    console.log("Connected");
    socket.on("send_message", function(data){
        messages.push(data);
        fs.writeFileSync("messages.json", JSON.stringify(messages));
        io.sockets.emit("got_msg", data);
    });
})

server.listen(3000, function(){
    console.log("Started");
});