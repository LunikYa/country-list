class Emiter {
    constructor(){
        this.init();
    }

    init(){
        this.events = {}
    }
    
    on(event, listeners){
        if(!this.events.hasOwnProperty(event)){
            this.events[event] = []
        }
        this.events[event].push(listeners)
    }

    emit(event){
        var i, listeners, length, args = [].slice.call(arguments, 1);

        if (this.events.hasOwnProperty(event)){
            listeners = this.events[event].slice()
            length = listeners.length

            for (i = 0; i < length; i++) {
                listeners[i].apply(this, args)
            }            
        }            
    }
}

let Emitter = new Emiter();

