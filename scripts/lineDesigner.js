function LineDesigner(ctx, canvas){
    
     var x_center = canvas.width / 2,
        z_center = 0,
        y_center = (canvas.height / 2) + 135;    
    ctx.lineWidth = 1;
	

    var getCoordinate = function(c, axis){
        return c + (axis === 'x' ? x_center : y_center);
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

    // var getLines = function(shape){
    //     return shape.base.concat(shape.vertical);
    // };

    var getLines = function(shape, shapes){
        var lines = [];
        
        for(var i = 0; i < shape.faces.length; ++i){
            var face = shape.faces[i];
            if(face.isVisible(shapes)){
                lines = lines.concat(face.getFaceLines(shapes));
            }
        } 

        return lines;  
    };

    this.draw = function(shapes){
        for(var j = 0; j < shapes.length; ++j){
            var shape = shapes[j];
            var lines = getLines(shape, shapes);

            ctx.strokeStyle = shape.c;
            for(var i = 0; i < lines.length; ++i){
                drawLine(lines[i]);
            }
            
            drawCenterInfo(shape);

        }
    };

    var drawShapes = function(shapes){
        for(var i = 0; i < shapes.length; ++i){
            this.draw(shapes[i]);
        }
    };

    var drawCenterInfo = _.throttle(function(shape){
        var span = document.getElementById('center-info');
        span.innerText = shape.center[0].toString();
    }, 50);

    this.cleanAndDraw = function(shapes){
        clearCanvas();
        drawShapes(shapes);
        drawCenterInfo(shapes[0]);
    };
}