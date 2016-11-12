function LineTransformator(points){

    var createMatrixFromPoint = function(point){
        return [point.x, point.y, point.z, 1];
    };

    var fromArrayToPoint = function(array, point){
        var divider = array[3];

        if(divider <= 0) divider = 0.1;

        return new Point.fromXYZ(array[0] / divider, array[1] / divider, array[2] / divider, point.id);
    };

    var processPoints = function(points, matrix){
        var nPoints = [];
        for(var i = 0; i < points.length; ++i){
            var nPoint = processPoint(points[i], matrix);
            nPoints.push(nPoint);
        }

        return nPoints;
    };

    var processPoint = function(point, moveMatrix){
        var pointArray = createMatrixFromPoint(point);
        var _pointArray = math.multiply(pointArray, moveMatrix);
        return fromArrayToPoint(_pointArray, point);
    };
    
    var processSingleLine = function(line, moveMatrix){
        var newLine = {};
        for(var j = 0; j < points.length; ++j){
            var point = line[points[j]];
            newLine[points[j]] = processPoint(point, moveMatrix);
        }

        return newLine;
    };

    var processArray = function(lines, moveMatrix){
        var result = [];
        for(var i = 0; i < lines.length; ++ i){
            var line = lines[i];
            var newLine = processSingleLine(line, moveMatrix);
            result.push(newLine);   
        }

        return result;
    };


    return {
        processLineGroup: function(group, matrix){
            if(group && group.length > 0){
                if(group[0].constructor.name === 'Point'){
                    return processPoints(group, matrix);
                }else{
                    return processArray(group, matrix);
                }
            }

            return [];
        }
    };
}