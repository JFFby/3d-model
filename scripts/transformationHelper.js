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

        drawProjection: function(matrixes, name){
            baseTransformation(matrixes, function(shape){
                var createdProfection = _.merge({}, shape);
                for(var i = 0; i < matrixes.length; ++ i){
                    createdProfection = transform(createdProfection, matrixes[i]);
                }

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