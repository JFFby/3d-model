(function(global){
    var face = function(points){
        var self = this;

        self.points = points;
    };

    var getLines = function(shapes){
        var lines = [];
        for(var i = 0; i < shapes.length; ++i){
            var s = shapes[i];
            lines = lines.concat(s.base).concat(s.vertical);
        }
        
        return lines;
    }

    var getPoints = function(shapes){
        var lines = getLines(shapes);
        var points = [];
        for(var i = 0; i< lines.length; ++i){
            points.push(lines[i].from);
            points.push(lines[i].to);
        }

        return _.uniqBy(points, p => p.id);
    }

    var getFacePoints = function(shapes){
        var allPoints = getPoints(shapes);
        var self = this;
        var points = _.filter(allPoints, function(l){
            return self.points.indexOf(l.id) >= 0;
        }); 

        var sortedPoints = [];
        for(var i = 0; i < this.points.length; ++i){
            var targetPoint = _.find(points, {id: this.points[i]});
            sortedPoints.push(targetPoint);
        }

        return sortedPoints;
    };

    var calculateNormal = function(poitns){
        var _1 = poitns[0];
        var _2 = poitns[1];
        var _3 = poitns[2]

        var x = _1.y * _2.z + _2.y * _3.z + _3.y * _1.z - _2.y * _1.z - _3.y * _2.z - _1.y * _3.z;
        var y = _1.z * _2.x + _2.z * _3.x + _3.z * _1.x - _2.z * _1.x - _3.z * _2.x - _1.z * _3.x;
        var z = _1.x * _2.y + _2.x * _3.y + _3.x * _1.y - _2.x * _1.y - _3.x * _2.y - _1.x * _3.y;

        return {
            x:x,
            y:y,
            z:z
        };
    };

    face.prototype.getFacePoints = function(shapes){
        return getFacePoints.call(this, shapes);
    };

    face.prototype.calculateNormal = function(shape){
        var poitns = getFacePoints.call(this, shape);
        return  calculateNormal(poitns);
    };

    var getAvg = function(poitns, axis){
        var avg = 0;
        _.map(poitns, function(l)        {
            avg += l[axis];
        });

        return avg / poitns.length;
    };

    var getAvgPoint = function(shapes){
        var points = getFacePoints.call(this, shapes);
        var avgX = getAvg(points, 'x');
        var avgY = getAvg(points, 'y');
        var avgZ = getAvg(points, 'z');

        return {
            x: avgX,
            y: avgY,
            z: avgZ
        };
    };

    var getVectorB = function(point, shapes){
        var avgPoint = getAvgPoint.call(this, shapes);
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

        if(ab === 0 ){
            return 0;
        }

        return ab / (getVectorLength(a) * getVectorLength(b));

    };

    face.prototype.angleBetween = function(point, shapes){
        var a = this.calculateNormal(shapes);
        var b = getVectorB.call(this, point, shapes);
        var cos = getCos(a,b);
        return toDegree(Math.acos(cos));
    };

    face.prototype.isVisible = function(shapes){
        var angle = Math.abs(this.angleBetween(view_point, shapes));
        return angle <= 90;
    };

    global.Face = face;
})(window);