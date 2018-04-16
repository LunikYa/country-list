class Filter {
   constructor(data, elem){
       this.data = data;
       this.elem = elem;
       this.Emitter = new Emiter();
       this.init()
   }

    init(){
        let input = document.createElement('input');
            input.type = this.data.type;
            input.placeholder = this.data.placeholder;
            input.className = this.data.class;

        this.data.events.forEach(x => {
            this.addEmit(input, x, { detail: event.target.value })
        });
        
        this.elem.appendChild(input);
        return input 
    }

    on(event, callback) {
        this.Emitter.on(event, callback)
    }

    addEmit(input, ev){
        input.addEventListener('input', (event) => {
            this.Emitter.emit(ev, { detail: event.target.value })
        });
    }
}