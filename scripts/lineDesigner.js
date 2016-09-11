function LineDesigner(ctx){
    
    ctx.lineWidth = 1;

    var getCoordinate = function(c){
        return c; //(c * -1) + c*2;
    };

    var drawLine = function(line){
        ctx.beginPath();
        ctx.moveTo(getCoordinate(line.from.x),getCoordinate(line.from.y));
        ctx.lineTo(getCoordinate(line.to.x),getCoordinate(line.to.y));
        ctx.stroke();
    };

    this.draw = function(shape){
        var lines = shape.base.concat(shape.vertical);
        ctx.strokeStyle = shape.c;
        for(var i = 0; i < lines.length; ++i){
            drawLine(lines[i]);
        }
    };
}