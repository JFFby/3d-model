(function(global){
    var face = function(lines){
        var self = this;

        self.lines = lines;
    };

    var getLines = function(){
        var lines = []
        var shapes = d3_model.shapes;
        for(var i = 0; i < shapes.length; ++i){
            var s = shapes[i];
            lines = lines.concat(s.base).concat(s.vertical);
        }

        return lines;
    }

    var getFaceLines = function(){
        var allLines = getLines();
        var self = this;
        var lines = _.filter(allLines, function(l){
            return self.lines.indexOf(l.id) >= 0;
        }); 

        var sortedLines = [];
        for(var i = 0; i < this.lines.length; ++i){
            var targetLine = _.find(lines, {id: this.lines[i]});
            sortedLines.push(targetLine);
        }

        return sortedLines;
    };

    var calculateNormal = function(lines){
        var _1 = lines[0].from;
        var _2 = lines[1].from;
        var _3 = lines[2].from;

        var x = _1.y * _2.z + _2.y * _3.z + _3.y * _1.z - _2.y * _1.z - _3.y * _2.z - _1.y * _3.z;
        var y = _1.z * _2.x + _2.z * _3.x + _3.z * _1.x - _2.z * _1.x - _3.z * _2.x - _1.z * _3.x;
        var z = _1.x * _2.y + _2.x * _3.y + _3.x * _1.y - _2.x * _1.y - _3.x * _2.y - _1.x * _3.y;

        return {
            x:x,
            y:y,
            z:z
        };
    };

    face.prototype.getFaceLines = function(){
        return getFaceLines.call(this);
    };

    face.prototype.calculateNormal = function(){
        var lines = getFaceLines.call(this);
        return  calculateNormal(lines);
    };

    var getAvg = function(lines, axis){
        var avg = 0;
        _.map(lines, function(l)        {
            avg += l.from[axis];
        });

        return avg / lines.length;
    };

    var getAvgPoint = function(){
        var lines = getFaceLines.call(this);
        var avgX = getAvg(lines, 'x');
        var avgY = getAvg(lines, 'y');
        var avgZ = getAvg(lines, 'z');

        return {
            x: avgX,
            y: avgY,
            z: avgZ
        };
    };

    var getVectorB = function(point){
        var avgPoint = getAvgPoint.call(this);
        return {
            x: point.x - avgPoint.x,
            y: point.y - avgPoint.y,
            z: point.z - avgPoint.z
        };
    };

    var getVectorLength = function(v){
        var sqSumm = Math.pow(v.x, 2) + Math.pow(v.y, 2) + Math.pow(v.z, 2);
        return Math.sqrt(sqSumm);
    };

    var getCos = function(a, b){
        var ab = a.x * b.x + a.y * b.y + a.z * b.z;
        return ab / (getVectorLength(a) * getVectorLength(b));

    };

    face.prototype.angleBetween = function(shape, point){
        var a = this.calculateNormal(shape);
        var b = getVectorB.call(this, shape, point);
        var cos = getCos(a,b);
        return toDegree(Math.acos(cos));
    };

    face.prototype.isVisible = function(shape){
        var angle = Math.abs(this.angleBetween(shape, view_point));
        return angle <= 90;
    };

    global.Face = face;
})(window);