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
       transformationHelper.transform(moveMatrix);
        sw.stop();
    };
}