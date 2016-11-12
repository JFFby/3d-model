function FacesBuilder(){
    
    var outerDirection = ['to', 'from'];

    var buildFace = function(shape, i, lastIndexFn, direction){
        var firstLine = shape.vertical[i];
        var _1st = firstLine[direction[0]];
        var _2st =  firstLine[direction[1]];
        var secondLine = shape.vertical[lastIndexFn()];
        var _3st = [_1st, _2st].indexOf(secondLine. from) < 0 
            ? secondLine. from
            : secondLine. to;

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
            }, outerDirection);
        }
    };
    
    var buildInnerFace = function(shape){
        var length = shape.vertical.length;
        for(var i = length - 1; i >= 0; --i){
            buildFace(shape, i, function(){
                return i === 0 ? length - 1: i - 1;
            },outerDirection); // _.reverse(outerDirection.slice())
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
    
    var buildSingleHorizontalFace = function(){
        return;
    };

    var buildHorizontalFaceWithHoel = function(outer, inner){

        var length = inner.base.length;
        for(var i = 0; i < length; ++i){
            var ol = outer.base[i];
            var il = inner.base[i];

            var face = [
                ol.from.id,
                ol.to.id,
                il.to.id,
                il.from.id
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