class Rotator{
    constructor(){
        this.matrixes = {
            'x': this.getXmatrix,
            'z': this.getZmatrix,
            'y': this.getYmatrix
        }
    }

    rotate(alpha, axis){
        var sw = new Sw('rotate: ') ;
        var rotateMatrix = this.matrixes[axis](alpha)
        for(var shape of d3_model.shapes){
             shape.base = 
                transformationHelper.processArray( shape.base, rotateMatrix);
            shape.vertical = 
                transformationHelper.processArray( shape.vertical, rotateMatrix);
        }

        designer.cleanAndDraw(d3_model.shapes);
        sw.stop();
    }

    getXmatrix(alpha){
        var a = toRad(alpha);
        return [
            [1,0,0,0],
            [0, Math.cos(a), -1 * Math.sin(a),0],
            [0, Math.sin(a), Math.cos(a), 0],
            [0,0,0,1]
        ];
    }

    getZmatrix(alpha){
        var a = toRad(alpha);
        return [
            [Math.cos(a),Math.sin(a),0,0],
            [-1 * Math.sin(a), Math.cos(a), 0,0],
            [0,0,1, 0],
            [0,0,0,1]
        ];
    }

    getYmatrix(alpha){
        var a = toRad(alpha);
        return [
            [Math.cos(a),  0, -1 * Math.sin(a), 0],
            [0, 1, 0, 0],
            [Math.sin(a), 0, Math.cos(a), 0 ],
            [0, 0, 0, 1]
        ];
    }
}