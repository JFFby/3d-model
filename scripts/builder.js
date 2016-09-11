function Builder(canvas){
    
    var x_center = canvas.width / 2,
        z_center = 0,
        y_center = (canvas.height / 2) + 135;

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
        return new Point.fromXYZ(x + x_center, y_center, z + z_center);
    };

    var calculateCenter = function(h){
        return {
            center: Point.fromXYZ(x_center, y_center, z_center),
            top: Point.fromXYZ(x_center, y_center - h, z_center)
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
