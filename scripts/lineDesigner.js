function LineDesigner(ctx, canvas){
    
     var x_center = canvas.width / 2,
        z_center = 0,
        y_center = (canvas.height / 2) + 135;    
    ctx.lineWidth = 1;
	

    var getCoordinate = function(c, axis){
        return c + (axis === 'x' ? x_center : y_center);
    };

    var drawLine = function(face, shapes){
        var lines = face.getFaceLines(shapes);
        for(var i = 0; i < lines.length; ++i){
            var line = lines[i];
            ctx.beginPath();
            ctx.moveTo(getCoordinate(line.from.x, 'x'),getCoordinate(line.from.y, 'y'));
            ctx.lineTo(getCoordinate(line.to.x, 'x'),getCoordinate(line.to.y, 'y'));
            ctx.stroke();
        }
    };

    var drawFace = function(face, shape, shapes){
        var lines = shape.shapeType == shapeTypes.inner ?
            face.getSortedFaceLines(shapes) :
            face.getFaceLines(shapes);
        for(var i = 0; i < lines.length; ++i){
            var line = lines[i];

            if(i === 0){
                ctx.beginPath();
                ctx.moveTo(getCoordinate(line.from.x, 'x'),getCoordinate(line.from.y, 'y'));
                ctx.lineTo(getCoordinate(line.to.x, 'x'),getCoordinate(line.to.y, 'y'));
            }else{
                ctx.lineTo(getCoordinate(line.from.x, 'x'),getCoordinate(line.from.y, 'y'));
                ctx.lineTo(getCoordinate(line.to.x, 'x'),getCoordinate(line.to.y, 'y'));
            }
            
            ctx.strokeStyle = 'green';
            ctx.stroke();
        }
        
        ctx.closePath();
        ctx.fillStyle = shape.c;
        ctx.fill();
    };

    this.clear = function(){
        clearCanvas();
    };

    this.draw = function(shapes){
        for(var j = 0; j < shapes.length; ++j){
            var shape = shapes[j];
            for(var i = 0; i < shape.faces.length; ++i){
                var face = shape.faces[i];
                if(face.isVisible(shapes)){
                    drawFace(face, shape, shapes);
                }
                
                // ctx.strokeStyle = shape.c;
                // drawLine(face, shapes);
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