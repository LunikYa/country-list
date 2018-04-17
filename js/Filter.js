class Filter {
   constructor(elem){
       this.elem = elem;
       this.Emitter = new Emiter();
       this.init()
   }

    init(){
        let input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'filter list';
            input.className = 'filter-input';
            
        input.addEventListener('input', (event) => {
            this.Emitter.emit('filter', event.target.value)
        });
        this.elem.appendChild(input);
    }

    on(event, callback) {
        this.Emitter.on(event, callback)
    }
}