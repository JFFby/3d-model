function LineDesigner(ctx, canvas){
    
     var x_center = canvas.width / 2,
        z_center = 0,
        y_center = (canvas.height / 2) + 135;    
    ctx.lineWidth = 1;

    var getCoordinate = function(c, axis){
        return c + (axis === 'x' ? x_center : y_center)
    };

    var drawLine = function(line){
        ctx.beginPath();
        ctx.moveTo(getCoordinate(line.from.x, 'x'),getCoordinate(line.from.y, 'y'));
        ctx.lineTo(getCoordinate(line.to.x, 'x'),getCoordinate(line.to.y, 'y'));
        ctx.stroke();
    };

    this.clear = function(){
        clearCanvas();
    };

    this.draw = function(shape){
        var lines = shape.base.concat(shape.vertical);
        ctx.strokeStyle = shape.c;
        for(var i = 0; i < lines.length; ++i){
            drawLine(lines[i]);
        }
    };

    this.cleanAndDraw = function(shapes){
        clearCanvas();
        for(var i = 0; i < shapes.length; ++i){
            this.draw(shapes[i]);
        }
    };
}