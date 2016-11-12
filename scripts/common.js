function toRad(degree){
    return Math.PI / 180 * degree;
}

function toDegree(rad){
    return rad * 180 / Math.PI;
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

var shapeTypes = {
	outer:1,
	inner:2
};

var view_point = Point.fromXYZ(0, 0, -5000); 
var light_point = Point.fromXYZ(20, 20, 0); 