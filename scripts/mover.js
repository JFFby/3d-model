function Mover(){
    
    var createMoveMatrix = function(dx, dy, dz){
        var matrix = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [dx, dy, dz, 1]
        ];
    }
    
    this.move = function(shape, dx, dy, dz){
        var moveMatrix = createMoveMatrix(dx, dy, dz);
    }
}