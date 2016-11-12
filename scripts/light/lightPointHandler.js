function LightPointHandler(context, canvas, drawer){
    var self = this, module;
    self.context = context;
    self.canvas = canvas; 
    self.driver = drawer;
    var radius = 5, isDragable;

    var redraw = function(){
        self.driver.cleanAndDraw(d3_model.shapes);
        module.draw();
    };

    var updateLightPoint = function(e){
         light_point.x = e.layerX;
         light_point.y = e.layerY;
    };

    var initEventListener = function(){
        self.canvas.addEventListener('mousemove', _.throttle(function(e){ 
            if(isDragable){
                updateLightPoint(e);
                redraw();
            }

        }, 100));

        self.canvas.addEventListener('mousedown', function(e){
            var delta = Math.sqrt( Math.pow(light_point.x - e.layerX, 2) + Math.pow(light_point.y - e.layerY, 2) );
            if(delta <= radius){
                isDragable = true;
            }

        });


    };

    var init = function(){
        module.draw();
        initEventListener();
    };

    module = {
        draw: function(){
            context.beginPath();
            context.arc(light_point.x, light_point.y, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'green';
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#003300';
            context.stroke();
        }
    };

    init();

    return module;
}
