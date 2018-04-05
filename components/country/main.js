let elemCountry        = document.getElementById('js-list-country'),
    elemCity           = document.getElementById('js-list-city'),
    inputFilterCountry = document.getElementById('js-input-filter'),
    wrappLoad          = document.getElementById('conteiner-loader')
    inputFilterCity    = document.getElementById('js-input-filter-city');

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

let url = 'https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.min.json',
    countryList = new List(elemCountry, { title: 'Country', items: ['No matches'], defaultEvent: new CustomEvent('country-change', { 'detail': this.curruntCountry, bubbles: true }), selected: 'default'}),
    cityList = new List(elemCity, { title: 'City', items: ['No matches'], selected: 'default'}),
    hash = {};

inputFilterCountry.addEventListener('input', countryList.filterItems.bind(countryList, { criterion: inputFilterCountry}))
inputFilterCity.addEventListener('input', cityList.filterItems.bind(cityList, { criterion: inputFilterCity}))

httpGet(url)
    .then(
        response => {
            // wrappLoad.classList.remove('loader')            
            let result  = JSON.parse(response),
                country = [];            
                hash    = JSON.parse(JSON.stringify(result));
            for (let key in result) {
                country.push(key);
            }                 
            countryList.data.items = [...country];       
            countryList.render();            
        },
        reject => {
            console.log(reject)
        });

document.body.addEventListener('country-change', 
    (data)=>{
        cityList.data.items = [...hash[countryList.selected]]
        cityList.render()
    })
