function Point() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
}

Point.fromXZ = function (x, z) {
    var p = new Point();
    p.x = x;
    p.z = z;
    return p;    
};

Point.fromXYZ = function (x, y, z) {
    var p = Point.fromXZ(x, z);
    p.y = y;
    return p;  
};

