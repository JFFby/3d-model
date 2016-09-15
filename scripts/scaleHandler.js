function ScaleHandler(){
    
    var getScaleMatrix = function(k){
        var dk = 1 + k;
        return [
            [dk, 0,0,0],
            [0, dk, 0, 0],
            [0, 0, dk, 0],
            [0, 0, 0, 1]
        ]; 
    };

    return {
        scale: function(k){
            var sw = new Sw('scale: ');
            var scaleMatrix = getScaleMatrix(k);
            for(var shape of d3_model.shapes){
                shape.base = 
                    transformationHelper.processArray( shape.base, scaleMatrix);
                shape.vertical = 
                    transformationHelper.processArray( shape.vertical, scaleMatrix);
            }

            designer.cleanAndDraw(d3_model.shapes);
            sw.stop();
        }
    };
};