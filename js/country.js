let    mainConteiner = document.getElementById('main-conteiner-lists');

function httpGet(url) {      
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };
        xhr.send();
    });
}

class List {
    constructor(elem, data){
        this.elem = elem;
        this.data = data;  
    }
    render(arr){
        this.removeList();        
        let items = arr || this.data.items,
            h2    = document.createElement('h2'),
            list  = document.createElement('ul');
        
            h2.textContent = this.data.title || 'title is empty';
            list.classList.add('list-general');
            
        if (this.data.defaultEvent) 
                list.addEventListener('click', (event)=>
                {                
                    this.selected = event.target.textContent;                
                    list.dispatchEvent(this.data.defaultEvent);
                })
       
        if (items.length == 0){
            items.push(['No matches'])
        }

        items.forEach((item)=> {
            let a  = document.createElement('a'),
                li = document.createElement('li');
            
            li.textContent = item;
            a.appendChild(li)     
            list.appendChild(a);
        })
        this.elem.prepend(h2);
        this.elem.appendChild(list);
        
    }    
    removeList(){
        this.elem.textContent = '';
    }    
    filterItems(option){
        let val = option.criterion.value,
            arr = [];     
            arr = (this.data.items.filter((a) => 
            {
                return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
            }))        
        this.render(arr);
    }
}

let url = 'https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.min.json';
    // linkToCountry = new LinkRoute({ class: 'link', text: 'Register', url: 'register' }),