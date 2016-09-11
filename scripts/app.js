var sw = new Sw('building: ') ;

var canvas = document.getElementById('canvas');
canvas.width  = 1200;
canvas.height = 600;
var context = canvas.getContext('2d');

var builder = new Builder(canvas); 
var designer = new LineDesigner(context);

d3_model.start(shapes_settings);
sw. stop() ;
// 1 - 4 -> point calculation (n = 4)
