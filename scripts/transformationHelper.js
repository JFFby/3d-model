var transformationHelper = (function(){
    
    var points = ['from', 'to'];
    var lineGroups = ['base', 'vertical', 'center'];

    var lineTransformator = new LineTransformator(points);
    var dimentionSwapper = new DimentionSwapper(lineGroups, points)

    var baseTransformationLoop = function(matrix, transformation){
        var transformedShapes = [];
        for(var i = 0; i < d3_model.shapes.length; ++i){
            var shape = d3_model.shapes[i];
            var transformedShape = transformation(shape);    
            transformedShapes.push(transformedShape);
        }

        return transformedShapes;
    };

    var prepareShapeForProjectionCreation = function(shape){
        var matrixes = d3_model.projection.matrixes;
        var name = d3_model.projection.name;
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
    };

   var baseTransformation = function(matrix, transformation){
        designer.clear();
       
       var shapes = matrix && transformation 
        ? baseTransformationLoop(matrix, transformation)
        : d3_model.shapes;

         designer.draw(shapes);
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

        setProjection: function(matrixes, name){
            d3_model.projection = {
                matrixes: matrixes,
                name: name
            };

            this.transform(null);
        },

        applyProjection : function(shapes){
            var projection = d3_model.projection;
            if(projection.matrixes){
                return baseTransformationLoop(projection.matrixes, prepareShapeForProjectionCreation);
            }

            return shapes;
        }
    };
})();