var sw = new Sw('building: ') ;

var canvas = document.getElementById('canvas');
canvas.width  = 1200;
canvas.height = 600;
var context = canvas.getContext('2d');

var builder = new Builder(); 
var designer = new LineDesigner(context, canvas);
var listener = new KeyboardListener();
var mover = new Mover();
var rotator = new Rotator();
var scaleHandler = new ScaleHandler();
var projectionBuilder = new ProjectionBuilder();

d3_model.start(shapes_settings);
listener.listen({
    move: {
        ArrowUp: function(){
            mover.move(0, -3,0);
        },
        ArrowDown: function(){
            mover.move(0, 3,0);
        },
        ArrowLeft: function(){
            mover.move(-3, 0,0);
        },
        ArrowRight: function(){
            mover.move(3, 0,0);
        },
        KeyW: function(){
            mover.move(0, 0, 3);
        },
        KeyS: function(){
            mover.move(0, 0, -3);
        }
    },
    rotate: {
        ArrowUp: function(){
            rotator.rotate(3,'x');
        },
        ArrowDown: function(){
            rotator.rotate(-3,'x');
        },
        ArrowLeft: function(){
            rotator.rotate(3,'z');
        },
        ArrowRight: function(){
            rotator.rotate(-3,'z');
        },
        KeyW: function(){
            rotator.rotate(3,'y');
        },
        KeyS: function(){
            rotator.rotate(-3,'y');
        }
    }
});
sw. stop() ;
// 1 - 4 -> point calculation (n = 4)
