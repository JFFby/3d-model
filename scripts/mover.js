function Mover(){
    
    var createMoveMatrix = function(dx, dy, dz){
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [dx, dy, dz, 1]
        ];
    };

    this.move = function(dx, dy, dz){
        var sw = new Sw('move: ') ;
        var moveMatrix = createMoveMatrix(dx, dy, dz);
        for(var i = 0; i < d3_model.shapes.length; ++i){
            d3_model.shapes[i].base = 
                transformationHelper.processArray( d3_model.shapes[i].base, moveMatrix);
            d3_model.shapes[i].vertical = 
                transformationHelper.processArray( d3_model.shapes[i].vertical, moveMatrix);
        }

        designer.cleanAndDraw(d3_model.shapes);
        sw.stop();
    };
}