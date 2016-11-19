var sw = new Sw('building: ') ;

var canvas = document.getElementById('canvas');
canvas.width  = 1000;
canvas.height = 500;
var context = canvas.getContext('2d');

var builder = new Builder(); 
var designer = new LineDesigner(context);
var listener = new KeyboardListener();
var mover = new Mover();
var rotator = new Rotator();
var scaleHandler = new ScaleHandler();
var projectionBuilder = new ProjectionBuilder();
var facesBuilder = new FacesBuilder();
var drawingHelper = new DrawingHelper(canvas);
var lightPointHandler = new LightPointHandler(context, canvas, designer);
var colorHelper = new ColorHelper();

d3_model.start(shapes_settings);

const step = 3; 

listener.listen({
    move: {
        ArrowUp: function(){
            mover.move(0, -1 * step,0);
        },
        ArrowDown: function(){
            mover.move(0,  step,0);
        },
        ArrowLeft: function(){
            mover.move(-1 * step, 0,0);
        },
        ArrowRight: function(){
            mover.move( step, 0,0);
        },
        KeyW: function(){
            mover.move(0, 0,  step);
        },
        KeyS: function(){
            mover.move(0, 0, -1 * step);
        }
    },
    rotate: {
        ArrowUp: function(){
            rotator.rotate( step,'x');
        },
        ArrowDown: function(){
            rotator.rotate(-1 * step,'x');
        },
        ArrowLeft: function(){
            rotator.rotate( step,'z');
        },
        ArrowRight: function(){
            rotator.rotate(-1 * step,'z');
        },
        KeyW: function(){
            rotator.rotate( step,'y');
        },
        KeyS: function(){
            rotator.rotate(-1 * step,'y');
        }
    }
});
sw. stop() ;
// 1 - 4 -> point calculation (n = 4)
// 9 - 10 -> drawing based on faces (n = 8)