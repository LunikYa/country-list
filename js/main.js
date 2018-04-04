let elemCountry        = document.getElementById('js-list-country'),
    elemCity           = document.getElementById('js-list-city'),
    inputFilterCountry = document.getElementById('js-input-filter'),
    wrappLoad          = document.getElementById('conteiner-loader')
    inputFilterCity    = document.getElementById('js-input-filter-city');
    console.log()
document.querySelector('.conteiner-form').style.height = document.documentElement.clientHeight + 'px';
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

class User {
    constructor(name, surname, password, email){
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
    }
}

function validate(event){
let box = document.getElementById('error-conteiner');

    let user = new User (
        event.target.name.value,
        event.target.surname.value,
        event.target.password.value,
        event.target.email.value
    )
    try {
        for (let key in user) {
            if (user[key] == '') 
                throw({name: key + ' is require'});
            else if (user.password.length < 6) 
                throw ({ name: 'password must be 6 or more characters' })    
        }
        if (user.password !== event.target.dblpassword.value) {
            throw({ name: 'dbl password is fail'})
        } 
        

    } catch (error) {
       
            box.textContent = error.name;
            box.style.backgroundColor = '#f5aca6';
        
            console.log(error.name)
        event.preventDefault()
        return false
    }
    box.style.display = 'block';
    box.textContent = 'user ' + user.name + ' created';
    box.style.backgroundColor = '#bdd76d';

    console.log('reg', user)
    event.preventDefault()
    return false
}