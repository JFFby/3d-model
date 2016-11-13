function LineDesigner(ctx, canvas){
    
     var x_center = canvas.width / 2,
        z_center = 0,
        y_center = (canvas.height / 2) + 135;    
    ctx.lineWidth = 1;
	

    var getCoordinate = function(c, axis){
        return c + (axis === 'x' ? x_center : y_center);
    };

    var drawFace = function(face, shape, shapes){
        var points = face.getFacePoints(shapes);
        for(var i = 0; i < points.length; ++i){
            var point = points[i];

            if(i === 0){
                ctx.beginPath();
                ctx.moveTo(getCoordinate(point.x, 'x'),getCoordinate(point.y, 'y'));
            }else{
                ctx.lineTo(getCoordinate(point.x, 'x'),getCoordinate(point.y, 'y'));
            }
        }

        
        ctx.lineTo(getCoordinate(points[0].x, 'x'),getCoordinate(points[0].y, 'y'));
        ctx.strokeStyle = 'green';
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = colorHelper.getColor({face, shape, shapes});
        ctx.fill();
    };

    this.clear = function(){
        clearCanvas();
    };

    var drawShapes = function(shapes){
        for(var j = 0; j < shapes.length; ++j){
            var shape = shapes[j];
            for(var i = 0; i < shape.faces.length; ++i){
                var face = shape.faces[i];
                if(face.isVisible(shapes)){
                    drawFace(face, shape, shapes);
                }
            }         
        }
    };

    this.draw = function(shapes){
        lightPointHandler && lightPointHandler.draw();
        drawShapes(shapes);
        drawCenterInfo(shapes[0]);
    };

    var drawCenterInfo = _.throttle(function(shape){
        var span = document.getElementById('center-info');
        span.innerText = shape.center[0].toString();
    }, 50);

    this.cleanAndDraw = function(shapes){
        clearCanvas();
        lightPointHandler && lightPointHandler.draw();
        this.draw(shapes);
        drawCenterInfo.call(this, shapes[0]);
    };
}