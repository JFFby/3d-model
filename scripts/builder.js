function Builder(){
    
   var buildLines = function (obj) {
        var points = obj.points;
        var baseLines = [];
        var verticalLines = [];
        for (var  i = 0; i < points. length; ++i) {
            var p = points[i] ;
            var iNext = i === points. length -  1 ? 
                0 : i + 1;
            baseLines.push(new Line(p, points[iNext]));
            verticalLines.push(new Line(obj.top, points[i]));
        } 
     
        return {
            base: baseLines,
            vertical: verticalLines
        };
    };

    var createPoint = function(x, z){
        return new Point.fromXYZ(x, 0, z);
    };

    var calculateCenter = function(h){
         return {
            center: Point.fromXYZ(0, 0, 0),
            top: Point.fromXYZ(0, 0 - h, 0)
        };
    };

    var createPoints = function(obj){
        var points = [];
        var alpha = 360 / obj.n;
        for (var index = 0; index < 360; index += alpha) {
            var x = obj.r * Math.cos(toRad(index));
            var z = obj.r * Math.sin(toRad(index));
            points.push( createPoint(x,z));
        }
        
        return _.merge(calculateCenter(obj.h), {points: points});
    };
    
    return {
        build: function(obj){
            var points = createPoints(obj);
            var shape = buildLines(points);
            return _.merge(shape, obj);
        }
    };
}