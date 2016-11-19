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
         light_point.x = e.layerX - drawingHelper.x_center;
         light_point.y = e.layerY - drawingHelper.y_center;
    };

    var initEventListener = function(){
        self.canvas.addEventListener('mousemove', _.throttle(function(e){ 
            if(isDragable){
                updateLightPoint(e);
                redraw();
            }

        }, 100));

        self.canvas.addEventListener('mousedown', function(e){
            var delta = Math.sqrt( Math.pow(getCoordinate(light_point.x, 'x') - e.layerX, 2) 
                + Math.pow(getCoordinate(light_point.y, 'y') - e.layerY, 2) );
            if(delta <= radius){
                isDragable = true;
            }

        });

        self.canvas.addEventListener('mouseup', function(e){
            if(isDragable){
                updateLightPoint(e);
                redraw();
            }

            isDragable = false;
        });
    };

    var init = function(){
        module.draw();
        initEventListener();
    };

    
    var getCoordinate = function(c, axis){
        return drawingHelper.getCoordinate(c, axis)
    }

    module = {
        draw: function(){
            context.beginPath();
            context.arc(
                getCoordinate(light_point.x, 'x'),
                getCoordinate(light_point.y, 'y'),
                  radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'green';
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#003300';
            context.stroke();
            this.onChange && this.onChange(); 
        },

        onChange: null,

        pushChanges: function(x, y, z){
            light_point.x = x;
            light_point.y = y;
            light_point.z = z;
            redraw();
        }
    };

    init();

    return module;
}