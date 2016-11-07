function FacesBuilder(){
    
    var getThirdFace = function(shape, _1st, _2st){
        var _3st = _.find(shape.base, (e) => e.from == _1st.to && e.to == _2st.to )
                    || _.find(shape.base, (e) => e.to == _1st.to && e.from == _2st.to );
        if(!_3st){
            throw new 'line missed';
        }

        return _3st;
    }

    var buildFace = function(shape, i, lastIndexFn){
        var _1st = shape.vertical[i];
        var _2st = shape.vertical[lastIndexFn()];
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
        //buildFor(shape, buildOuterFace, buildInnerFace);
        buildFor(shape, buildInnerFace, buildOuterFace);
    };
    
    var buildFaces = function(shape, arg){
        shape.faces = [];
        buildVerticalFaces(shape);
        buildHorizontalFaces(shape, arg);
    };
    
    var buildSingleHorizontalFace = function(shape){
        var length = shape.base.length;
        var face = [];        
        for(var i = 0; i < length; ++i){
            face.push(shape.base[i].id);
        }

        shape.faces.push(new Face(face));
    };

    var createAdditionalLines = function(outer, inner){
        var length = outer.base.length;
        for(var i = 0; i < length; ++i){
            var line = new Line(outer.base[i].from, inner.base[i].from);
            outer.base.push(line);
        }
    };

    var buildHorizontalFaceWithHoel = function(outer, inner){
        createAdditionalLines(outer, inner);

        var length = inner.base.length;
        for(var i = 0; i < length; ++i){
            var ol = outer.base[i];
            var il = inner.base[i];
            var _2nd = _.find(outer.base, {from: ol.to, to: il.to });
            var _4nd = _.find(outer.base, {from: ol.from, to: il.from});

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