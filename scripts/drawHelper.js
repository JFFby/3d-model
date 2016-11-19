function DrawingHelper(canvas){
    this.x_center = canvas.width / 2,
    this.y_center = (canvas.height / 2) + 135;   

    this.getCoordinate = function(c, axis){
        return c + (axis === 'x' ? this.x_center : this.y_center);
    };
}