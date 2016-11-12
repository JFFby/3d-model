function FacesBuilder(){
    
    var getThirdFace = function(shape, _1st, _2st){

             var _3st = _.find(shape.base, (e) => e.from == _1st.to && e.to == _2st.to )
                     || _.find(shape.base, (e) => e.to == _1st.to && e.from == _2st.to );

        // var initialPoints = _.uniq([_1st.from, _1st.to, _2st.from, _2st.to]);
        // var _3st = _.find(shape.base, e => initialPoints.indexOf(e.from) >= 0 &&
        //     initialPoints.indexOf(e.to));
        if(!_3st){
            throw new 'line missed';
        }

        return _3st;
    }

    var buildFace = function(shape, i, lastIndexFn){
        var _1st = shape.vertical[i];
        var _2st =  shape.vertical[lastIndexFn()];
        var _3st = getThirdFace(shape, _1st, _2st);

        var face = new Face([
            _1st.id, _2st.id, _3st.id
        ]);
        shape.faces.push(face);
    };

    var buildOuterFace = function(shape){
        var length = shape.vertical.length;
        for(var i = 0; i < length; ++i){
            buildFace(shape, i, function(){
                return i === length - 1 ? 0 : i + 1;
            });
        }
    };
    
    var buildInnerFace = function(shape){
        var length = shape.vertical.length;
        for(var i = length - 1; i >= 0; --i){
            buildFace(shape, i, function(){
                return i === 0 ? length - 1: i - 1;
            });
        }
    };
    
    var buildFor = function(shape, forOuter, forInner, arg){
        if(shape.shapeType === shapeTypes.outer){
            forOuter(shape, arg);
        }else{
            forInner(shape);			
        }
    };
    
    var buildVerticalFaces = function(shape){
        buildFor(shape, buildInnerFace, buildOuterFace);
    };
    
    var buildFaces = function(shape, arg){
        shape.faces = [];
        buildVerticalFaces(shape);
        buildHorizontalFaces(shape, arg);
    };
    
    var buildSingleHorizontalFace = function(shape){
        return;
    };

    var createAdditionalLines = function(outer, inner){
        var length = outer.base.length;
        for(var i = 0; i < length; ++i){
            // if(i % 2 == 0){
                 var line = new Line(outer.base[i].from, inner.base[i].from);
            // }else{
            //    var line = new Line(inner.base[i].from, outer.base[i].from);
            // }

            outer.base.push(line);
        }
    };

    var sqr = function(n){
        return Math.pow(n, 2);
    };

    var calculateValueForPoint = function(e, s){
            return Math.sqrt(sqr(e.x - s.x) + sqr(e.y - s.y) + sqr(e.z - s.z));
    };

    var getClosest = function(p, lines){
        var points = getPoints(lines, p);
        var sortedLines = _.sortBy(points, e => calculateValueForPoint(e, p));

        return sortedLines[0];
    };

    var getPoints = function(lines, p){

        function isPointSuitable(points, searchPoint, thisPoit){
            return searchPoint != thisPoit && points.indexOf(thisPoit) < 0;
        }

        var types = ['from', 'to'];
        var result = [];
        for(var i = 0; i < lines.length; i++){
            var line = lines[i];
            for(var t in types){
                t = types[t];
                if(isPointSuitable(result,p,line[t])){
                    result.push(line[t]);
                } 
            }
        }

        return result;
    }

    var getAdditionLine = function(point, lines){
        var closest = getClosest(point, lines);
        var values = [point, closest];

        return _.find(lines, e => values.indexOf(e.from) >= 0 &&  values.indexOf(e.to) >= 0);
    }

    var buildHorizontalFaceWithHoel = function(outer, inner){
        createAdditionalLines(outer, inner);

        var length = inner.base.length;
        for(var i = 0; i < length; ++i){
            var ol = outer.base[i];
            var il = inner.base[i];
           
            var _2nd = getAdditionLine(il.from, outer.base);
            var _4nd = getAdditionLine(il.to, outer.base);

            if(!_2nd || !_4nd){
                throw new Error('line not found');
            }

            var face = [
                ol.id,
                _4nd.id,
                il.id,
                _2nd.id
            ];

            outer.faces.push(new Face(face));
        }

    };

    var buildHorizontalFaces = function(shape, inner){
        buildFor(shape, buildHorizontalFaceWithHoel, buildSingleHorizontalFace, inner);
    };
    
    return {
        build: function(shapes){
            var inner = _.find(shapes, {shapeType: shapeTypes.inner});
            var outer = _.find(shapes, {shapeType: shapeTypes.outer});
            buildFaces(inner);
            buildFaces(outer, inner);
        }
    };
}