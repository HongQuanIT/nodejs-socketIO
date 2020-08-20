var express= require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views","./views");
app.set("scripts","./assets");
var sever = require("http").Server(app);
var io = require("socket.io")(sever);
sever.listen(3000);
console.log();

io.on("connection", function (socket) {
    console.log("co nguoi ket noi: "+socket.id);
    socket.on("disconnect", function () {
        console.log(socket.id +" ngat ket noi!!!!!!!");
    });
    socket.on("client-send-data-q", function(name,data){
        id = socket.id;
        socket.emit("sever-send-data-q",id,name,data);
        socket.broadcast.emit("sever-send-data-q",id,name,data);
    })
})
app.get("/",function (req,res) {
    res.render("home");
})