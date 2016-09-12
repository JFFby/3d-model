var sw = new Sw('building: ') ;

var canvas = document.getElementById('canvas');
canvas.width  = 1200;
canvas.height = 600;
var context = canvas.getContext('2d');

var builder = new Builder(canvas); 
var designer = new LineDesigner(context);
var listener = new KeyboardListener();
var mover = new Mover();

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
            console.log('up');
        },
        ArrowDown: function(){
            console.log('down');
        },
        ArrowLeft: function(){
            console.log('left');
        },
        ArrowRight: function(){
            console.log('right');
        },
        KeyW: function(){
            console.log('forward');
        },
        KeyS: function(){
            console.log('back');
        }
    }
});
sw. stop() ;
// 1 - 4 -> point calculation (n = 4)
