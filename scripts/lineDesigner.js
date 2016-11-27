function LineDesigner(ctx){
    
    ctx.lineWidth = 1;

    var getCoordinate = function(c, axis){
        return drawingHelper.getCoordinate(c, axis)
    }

    var getColor = function(face, args){
        return face.color || colorHelper.getColor(args);
    }

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
        ctx.fillStyle = getColor(face, {face, shape, shapes});
        ctx.fill();
    };

    this.clear = function(){
        clearCanvas();
    };

    var isVisible = function(face, shape, shapes){
        if(!d3_model.projection){
            return face.isVisible(shapes);
        } 

        return d3_model.projection.name === 'vp'
            ? face.isVisible(d3_model.shapes)
            : face.isVisible(shapes);
    };

    var drawShapes = function(shapes){

        colorHelper.updateShapes(shapes);
        shapes = transformationHelper.applyProjection(shapes);

        for(var j = 0; j < shapes.length; ++j){
            var shape = shapes[j];
            for(var i = 0; i < shape.faces.length; ++i){
                var face = shape.faces[i];
                if(isVisible(face, shape, shapes)){
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
        this.draw(shapes);
        drawCenterInfo.call(this, shapes[0]);
        lightPointHandler && lightPointHandler.draw();
    };
}