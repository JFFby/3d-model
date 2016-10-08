var transformationHelper = (function(){
    
    var points = ['from', 'to'];
    var lineGroups = ['base', 'vertical', 'center'];

    var lineTransformator = new LineTransformator(points);
    var dimentionSwapper = new DimentionSwapper(lineGroups, points)

    var baseTransformation = function(matrix, transformation){
        designer.clear();
        for(var i = 0; i < d3_model.shapes.length; ++i){
            var shape = d3_model.shapes[i];
            var transformadShape = transformation(shape);
            designer.draw(transformadShape);           
        }
    };
    
    var projectionsNeededInSwapingDimention = [
            { name: 'prof', from: 'z', to:'x'},
            { name: 'gor', from: 'z', to:'y'}
        ];

    var transform = function(shape, matrix){
        for(var i = 0; i < lineGroups.length; ++ i){
            var lineGroup = lineGroups[i];
            shape[lineGroup] = lineTransformator.processLineGroup(shape[lineGroup], matrix);
        }

        return shape;
    };   

    return {
        transform: function(matrix){
            baseTransformation(matrix, function(shape){
                return transform(shape, matrix);
            });
        },

        drawProjection: function(matrix, name){
            baseTransformation(matrix, function(shape){
                var projection = _.merge({}, shape);
                var createdProfection = transform(projection, matrix);
                var dimentionSwapRule =  _.find(
                        projectionsNeededInSwapingDimention,
                        o => o.name === name);
                return dimentionSwapRule ?
                    dimentionSwapper.swapDimention(createdProfection,dimentionSwapRule.from, dimentionSwapRule.to) :
                    createdProfection;
            });
        } 
    };
})();