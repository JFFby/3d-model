function ProjectionBuilder(){

    var matrixStorage = {
        front: function(){
            return zOrtMatrix;        
        },
        prof: function(){
            return xOrtMatrix;
        },
        gor: function(){
            return  yOrtMatrix;
        },
        aks: function(a, s){
            return getOksanometMatrix(a, s);
        }
    };

    var getMatrix = function(name, p1, p2){
        return matrixStorage[name](p1, p2);
    };

    this.create = function(name, p1, p2){
        var sw = new Sw('projection: ' + name) ;
        var matrix = getMatrix(name, p1, p2);
        transformationHelper.drawProjection(matrix);
        sw.stop();
    };

    var zOrtMatrix = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
    ];

    var xOrtMatrix = [
        [0,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,0,1]
    ];

    var yOrtMatrix = [
        [1,0,0,0],
        [0,0,0,0],
        [0,0,1,0],
        [0,0,0,1]
    ];

    var getOksanometMatrix = function(alpha, sigma){
        var sigmaR = toRad(sigma);
        var alphaR = toRad(alpha);
        return [
            [Math.cos(sigmaR), Math.sin(sigmaR) * Math.sin(alphaR), 0, 0],
            [0, Math.cos(alphaR), 0, 0],
            [Math.sin(alphaR), -1 * Math.sin(sigmaR) * Math.sin(alphaR), 0, 0],
            [0, 0, 0, 1]
        ];
    };

    var getKosMatrix = function(l, alpha){
        var alphaR = toRad(alpha);
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [l*Math.cos(alphaR), l*Math.sin(alphaR), 0, 0],
            [0, 0, 0, 1]
        ];
    };
}