function ProjectionBuilder(){

    var matrixStorage = {
        front: function(){
            return [zOrtMatrix];        
        },
        prof: function(){
            return [xOrtMatrix];
        },
        gor: function(){
            return  [yOrtMatrix];
        },
        aks: function(args){
            var a = args[0];
            var s = args[1];
            return [getOksanometMatrix(a, s)];
        },
        kos: function(args){
            var l = args[0];
            var alpha = args[1];
            return [getKosMatrix(l, alpha)];
        },
        persp: function(args){
            var d = args[0];
            return [getPerspectiveMatrix(d)];
        },
        vp: function(args){
            var theta = toRad(args[0]);
            var sigma = toRad(args[1]);
            var ro = args[2];
            var d = args[3];
            return [
                getMatrixForVidovoePreobrazovanie(theta, sigma, ro),
                getPerspectiveMatrix(d)
            ];
        }
    };

    var getMatrixes = function(args){
        return matrixStorage[getName(args)](args.slice(1));
    };

    var getName = function(array){
        return array[0];
    };

    this.create = function(args){
        var name = getName(args);
        var sw = new Sw('projection: ' + name) ;
        var matrix = getMatrixes(args);
        transformationHelper.applyProjection(matrix, name);
        sw.stop();
    };

    var zOrtMatrix = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    var xOrtMatrix = [
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,0,1]
    ];

    var yOrtMatrix = [
        [1,0,0,0],
        [0,1,0,0],
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

    var getPerspectiveMatrix = function(d){
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 1/d],
            [0, 0, 0, 0]
        ];
    };

    var getMatrixForVidovoePreobrazovanie = function(theta, sigma, ro){
        return [
            [-1 * Math.sin(theta), -1 * Math.cos(sigma) * Math.cos(theta), -1 * Math.sin(sigma) * Math.cos(theta), 0],
            [Math.cos(theta), -1 * Math.cos(sigma) * Math.sin(theta), -1 * Math.sin(theta) * Math.sin(sigma), 0],
            [0, Math.sin(sigma), -1 * Math.cos(sigma), 0],
            [0, 0, ro, 1]
        ];
    };
}