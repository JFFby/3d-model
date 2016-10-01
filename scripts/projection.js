function ProjectionBuilder(){
    var zOrtMatrix = [
        [1, 0,0,0],
        [0,1,0,],
        [0,0,0,0],
        [0,0,0,1]
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