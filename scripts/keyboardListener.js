function KeyboardListener(){
    
    var listeners = {};
    var state = '';

    var listenKeyEvents = function(){
        document.onkeydown = function(e){

            if(e.target.tagName === 'INPUT') return;

            var currState = listeners[state];
            if(currState){
                var handler = currState &&  currState[e.code];
                handler && handler();
            }
        };
    };

    var listenMouseEvents = function(){
        document.addEventListener('mousewheel',function(e){
            scaleHandler.scale(e.deltaY / 1000);
        });
    };

    return {
        listen: function(listenersArray){
            listeners = listenersArray;
            listenKeyEvents();
            listenMouseEvents();
        },
        setState: function(value){
            console.log('set state to ' + value);
            state = value;
        }        
    };
}