function setup() {
    var socket = io();
    var side = 30;
    var drawmatrix = [];
    
    
    
    
    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        let grassCount = document.getElementById('grassCount');
        let grassEaterCount = document.getElementById('grassEaterCount');
        drawmatrix = data.matrix;
        bornGrass = data.bornGrass;
        bornGrassEater = data.bornGrassEater;
        grassCount.innerText = bornGrass;
        grassEaterCount.innerText = bornGrassEater;
        createCanvas(drawmatrix[0].length * side, drawmatrix.length * side)
       
        background('#acacac');
        
        for (var i = 0; i < drawmatrix.length; i++) {
            for (var j = 0; j < drawmatrix[i].length; j++) {
                if (drawmatrix[i][j] == 1) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                } else if (drawmatrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (drawmatrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (drawmatrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (drawmatrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (drawmatrix[i][j] == 5) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
                }
            }
        }
        
    }
}