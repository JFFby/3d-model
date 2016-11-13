function ColorHelper(){

    const Ia = 128;

    getForOuter = function(Il){
        var result = Ia + Il;

        return `rgb(${result},${result},${result})`;
    };

    getForInner = function(Il){
        var result = Ia + Il;

        return `rgb(${result},0,0)`;
    };

    return {
        getColor: function(args){
            var angle = args.face.angleBetween(light_point, args.shapes);
            var Il = Math.round(Ia * Math.cos(toRad(angle)));
            if(args.shape.shapeType === 1){
                return getForOuter(Il);
            }else {
                return getForInner(Il);
            }
        }
    };
}