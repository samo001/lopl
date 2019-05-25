grassArr = [];
grassEaterArr = [];
gishatichArr = [];
virusArr = [];
virussArr = [];
matrix = [];

grassHashiv = 0;
grassEatHashiv = 0;
let random = require('./modules/random');
function matrixGenerator(matrixSize, grass, grassEater, gishatich, virus, viruss) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0 - 39
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < gishatich; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < virus; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < viruss; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 5, 3,0,0,0 );

var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/Eatgrass.js");
var gishatich = require("./modules/gishatich.js");
var virus = require("./modules/virus.js");
var viruss = require("./modules/antivirus.js");

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 3) {
                var grass = new gishatich(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 4) {
                var grass = new virus(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 5) {
                var grass = new viruss(x, y);
                grassArr.push(grass);
                
            }
        }
    }
}           
        
    

creatingObjects();



function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            gishatichArr[i].eat();
        }
    }
    if (virusArr[0] !== undefined) {
        for (var i in virusArr) {
            virusArr[i].eat();
        }
    }
    if (virussArr[0] !== undefined) {
        for (var i in virussArr) {
            virussArr[i].eat();
        }
    }


    
    let sendData = {
        matrix: matrix,
        bornGrass: grassHashiv,
        bornGrassEater: grassEatHashiv
    }

    
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)