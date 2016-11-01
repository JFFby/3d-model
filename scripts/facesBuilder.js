function FacesBuilder(){
    
    var buildFace = function(shape, i, lastIndexFn){
        var face = new Face([
            shape.vertical[i].id,
            shape.base[i].id,
        ]);
        face.lines.push(shape.vertical[lastIndexFn()].id);
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
        buildFor(shape, buildOuterFace, buildInnerFace);
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
                _2nd.id,
                il.id,
                _4nd.id
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