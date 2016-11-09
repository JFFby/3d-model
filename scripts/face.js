(function(global){
    var face = function(lines){
        var self = this;

        self.lines = lines;
    };

    var getLines = function(shapes){
        var lines = [];
        for(var i = 0; i < shapes.length; ++i){
            var s = shapes[i];
            lines = lines.concat(s.base).concat(s.vertical);
        }

        return lines;
    }

    var getFaceLines = function(shapes){
        var allLines = getLines(shapes);
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

    var getUbiqPoint = function(line, ...points){
        return points.indexOf(line.from) >=0 ? line.to : line.from;
    }

    var calculateNormal = function(lines){
        var _1 = lines[0].to;
        var _2 = getUbiqPoint(lines[1], _1);
        var _3 = getUbiqPoint(lines[2], _1, _2);

        var x = _1.y * _2.z + _2.y * _3.z + _3.y * _1.z - _2.y * _1.z - _3.y * _2.z - _1.y * _3.z;
        var y = _1.z * _2.x + _2.z * _3.x + _3.z * _1.x - _2.z * _1.x - _3.z * _2.x - _1.z * _3.x;
        var z = _1.x * _2.y + _2.x * _3.y + _3.x * _1.y - _2.x * _1.y - _3.x * _2.y - _1.x * _3.y;

        return {
            x:x,
            y:y,
            z:z
        };
    };

    face.prototype.getFaceLines = function(shapes){
        return getFaceLines.call(this, shapes);
    };

     face.prototype.getSortedFaceLines = function(shapes){
        var lines = getFaceLines.call(this, shapes);
        var sortedLines = [lines[0]];

        while(lines.length !== sortedLines.length){
            var nexLine = _.find(lines, {from: sortedLines[sortedLines.length - 1].to});
            if(typeof nexLine === 'undefined'){
                nexLine = _.find(lines, (l) => l.to === sortedLines[sortedLines.length - 1].to 
                    && sortedLines.indexOf(l) < 0);

               if(!nexLine && lines.length === 3){
                   nexLine = _.find(lines, (l) =>  sortedLines.indexOf(l) < 0);
               }
            }

            sortedLines.push(nexLine);
        }

        return sortedLines;
    };

    face.prototype.calculateNormal = function(shape){
        var lines = getFaceLines.call(this, shape);
        return  calculateNormal(lines);
    };

    var getAvg = function(lines, axis){
        var avg = 0;
        _.map(lines, function(l)        {
            avg += l.from[axis];
        });

        return avg / lines.length;
    };

    var getAvgPoint = function(shapes){
        var lines = getFaceLines.call(this, shapes);
        var avgX = getAvg(lines, 'x');
        var avgY = getAvg(lines, 'y');
        var avgZ = getAvg(lines, 'z');

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