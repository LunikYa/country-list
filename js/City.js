class City {
    constructor(elem, data) {
        this.elem = elem;
        this.data = data;
        this.Emitter = new Emiter();
        this.init();
    }

    init() {
        this.render(this.data);
    }

    render(items) {
        this.removeList();
        let h2 = document.createElement('h2'),
            list = document.createElement('ul');
            h2.textContent = 'City';
            list.classList.add('list-general');
        if (items.length === 0){
            items.push('No matches')
        }
        items.forEach((item) => {
            let a = document.createElement('a'),
                li = document.createElement('li');
    
            li.textContent = item;
            a.appendChild(li);
            list.appendChild(a);
        })
  
        this.elem.prepend(h2);
        this.elem.appendChild(list);
    }

    removeList() {
        this.elem.textContent = '';
    }
    
    on(event, callback) {
        this.Emitter.on(event, callback)
    }
}