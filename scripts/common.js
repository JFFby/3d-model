function toRad(degree){
    return Math.PI / 180 * degree;
}

function Sw(msg) {
    var s = new Date() ;
    this. stop = function () {
        var end = new Date();
        console.log(msg + ' '  + (end -  s));
    }; 
}

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
} 