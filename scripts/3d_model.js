var d3_model = (function (){
    var settingsToArray = function(shapes_settings){
        return [
            {r: shapes_settings.r1, h: shapes_settings.h, c:'black', n: shapes_settings.n},
            {r: shapes_settings.r2, h: shapes_settings.h, c:'red',n: shapes_settings.n}
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
                this.shapes.push(builder.build(settings[i]));
                designer.draw(this.shapes[i]);
            }
        }
    };
})();