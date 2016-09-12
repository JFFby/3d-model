function KeyboardListener(){
    
    var listeners = {};
    var state = '';

    var listenKeyEvents = function(){
        document.onkeydown = function(e){
            var currState = listeners[state];
            if(currState){
                var handler = currState &&  currState[e.code];
                handler && handler();
            }
        };
    };

    return {
        listen: function(listenersArray){
            listeners = listenersArray;
            listenKeyEvents();
        },
        setState: function(value){
            state = value;
        }        
    };
}