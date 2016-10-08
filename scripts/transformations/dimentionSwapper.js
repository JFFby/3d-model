function DimentionSwapper(lineGroups, points){

    var swapDimentionForPoint = function(point, from, to){
        var temp = point[from];
        point[from] = point[to];
        point[to] = temp;
    };

    var swapPoints = function(points, from, to){
        for(var i = 0; i < points.length; ++i){
            swapDimentionForPoint(points[i],  from, to);
        }
    };

    var swapDimentionForLine = function(line, from, to){
        for(var i = 0; i < points.length; ++i){
            var point = line[points[i]];
            swapDimentionForPoint(point, from, to);
        }
    }; 
    
    var swapDimetionForLines = function(lines, from, to){
        for(var i = 0; i < lines.length; ++ i){
            var line = lines[i];
            swapDimentionForLine(line, from, to);
        }
    };

    var swapDimention = function(objects, from, to){
        if(objects && objects.length > 0){
            if(objects[0].constructor.name === 'Point'){
                return swapPoints(objects, from, to);
            }else{
                return swapDimetionForLines(objects, from, to);
            }
        }

        return [];
    };

    return {
        swapDimention: function(shape, from, to){
            for(var i = 0; i < lineGroups.length; ++i){
                var lines = shape[lineGroups[i]];
                swapDimention(lines, from, to);
            }

            return shape;
        }
    };
}