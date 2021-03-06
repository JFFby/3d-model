function Point() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.id = identity.id();
}

Point.fromXZ = function (x, z) {
    var p = new Point();
    p.x = x;
    p.z = z;
    return p;    
};

Point.fromXYZ = function (x, y, z, id) {
    var p = Point.fromXZ(x, z);
    p.y = y;
    p.id = typeof id  === 'number' ? id : p.id;
    return p;
};

Point.prototype.toString = function(){
    return 'x: ' + this.x + ' y: ' + this.y + ' z: ' + this.z;
};

Point.prototype.fromCCS = function(ro, sigma, theta){
    const s = toRad(sigma);
    const t = toRad(theta);
    this.x = ro * Math.sin(s) * Math.cos(t); 
    this.y = ro * Math.sin(s) * Math.sin(t);
    this.z = ro * Math.cos(s);
};

