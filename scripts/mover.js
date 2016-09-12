function Mover(){
    
    var createMoveMatrix = function(dx, dy, dz){
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [dx, dy, dz, 1]
        ];
    };
    
    var createMatrixFromPoint = function(point){
        return [point.x, point.y, point.z, 1];
    };

    var fromArrayToPoint = function(array){
        return new Point.fromXYZ(array[0], array[1], array[2]);
    };

    var processArray = function(lines, moveMatrix){
        var result = [];
        var points = ['from', 'to'];
        for(var i = 0; i < lines.length; ++ i){
            var line = lines[i];
            var newLine = {};
            for(var j = 0; j < points.length; ++j){
                var point = line[points[j]];
                var pointArray = createMatrixFromPoint(point);
                var _pointArray = math.multiply(pointArray, moveMatrix);
                newLine[points[j]] = fromArrayToPoint(_pointArray);
            }

             result.push(newLine);
        }

        return result;
    };

    this.move = function(dx, dy, dz){
        var sw = new Sw('move: ') ;
        var moveMatrix = createMoveMatrix(dx, dy, dz);
        for(var i = 0; i < d3_model.shapes.length; ++i){
            d3_model.shapes[i].base = processArray( d3_model.shapes[i].base, moveMatrix);
            d3_model.shapes[i].vertical = processArray( d3_model.shapes[i].vertical, moveMatrix);
        }

        designer.cleanAndDraw(d3_model.shapes);
        sw.stop();
    };
}