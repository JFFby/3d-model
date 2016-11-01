var identity = (function(){
    
    var counter = 0;
    
    return {
        id: function(){
            return counter ++;
        },
        reset: function(){
            counter = 0;
        }
    };
})();

function Line(from, to){
    this.from = from;
    this.to = to;
    this.id = identity.id();
};