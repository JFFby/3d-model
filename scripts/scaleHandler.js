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
            transformationHelper.transform(scaleMatrix);
            sw.stop();
        }
    };
};