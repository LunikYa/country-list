class City {
    constructor(elem, data) {
        this.elem = elem;
        this.data = data;
        this.Emitter = new Emiter();
        this.init();
    }

    init() {
        let h2   = document.createElement('h2');
            h2.textContent = 'City';

        this.list = document.createElement('ul');            
        this.list.classList.add('list-general');
        this.elem.prepend(h2);
        this.elem.appendChild(this.list);
        this.render(this.data);
    }

    render(items) {
        this.removeList();

        items.forEach((item) => {
            let a = document.createElement('a'),
                li = document.createElement('li');
    
            li.textContent = item;
            a.appendChild(li);
            this.list.appendChild(a);
        })
    }

    removeList() {
        this.list.textContent = '';
    }
    
    on(event, callback) {
        this.Emitter.on(event, callback)
    }
}