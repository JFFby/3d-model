var d3_model = (function (){
    var settingsToArray = function(shapes_settings){
        return [
            {r: shapes_settings.r2, h: shapes_settings.h, c:'white',n: shapes_settings.n, shapeType: shapeTypes.inner},
            {r: shapes_settings.r1, h: shapes_settings.h, c:'black', n: shapes_settings.n, shapeType: shapeTypes.outer}
        ];
    };
    var clear = function(){
        if(this.shapes.length){
            this.shapes = [];
            clearCanvas();
        }
    };

    return {
        shapes : [],
        start: function (s_settings){
           clear.call(this);
            var settings = settingsToArray(s_settings);
            for(var i= 0; i < settings.length; ++i){
                var shape = builder.build(settings[i]);
                this.shapes.push(shape);
            }

            facesBuilder.build(this.shapes);
            designer.draw(this.shapes);
            identity.reset();
        }
    };
})();