var transformationHelper = (function(){
    
    var createMatrixFromPoint = function(point){
        return [point.x, point.y, point.z, 1];
    };

    var fromArrayToPoint = function(array){
        return new Point.fromXYZ(array[0], array[1], array[2]);
    };

    var points = ['from', 'to'];

    var processSingleLine = function(line, moveMatrix){
        var newLine = {};
        for(var j = 0; j < points.length; ++j){
            var point = line[points[j]];
            var pointArray = createMatrixFromPoint(point);
            var _pointArray = math.multiply(pointArray, moveMatrix);
            newLine[points[j]] = fromArrayToPoint(_pointArray);
        }

        return newLine;
    };

    return {
        processArray: function(lines, moveMatrix){
            var result = [];
            for(var i = 0; i < lines.length; ++ i){
                var line = lines[i];
                var newLine = processSingleLine(line, moveMatrix);
                result.push(newLine);   
            }

            return result;
        }
    };
})();