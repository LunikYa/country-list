let selectCountry = document.getElementById('select-country'),
    listCity      = document.getElementById('list-city'),
    inputSort     = document.getElementById('js-input-sort')

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
    constructor(elem, options) {
        this.elem    = elem;
        this.options = options;
    }
    render() {
        let data = this.options.options || [];
            this.removeListItem()
            data.forEach((x) => {this.addListItem(x)});
    }
    addListItem(item) {
        if(this.options.title == 'Country'){                
            let option = document.createElement('option');
                option.textContent = item;
                this.elem.appendChild(option);
        } else{
            let p = document.createElement('p');
                p.textContent = item;
                this.elem.appendChild(p);
        }       
    }
    removeListItem() {
        this.elem.textContent = '';
    }
}

let url = 'https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.min.json',
    countryList = new List(selectCountry, {title: 'Country', options: []}),
    listOfCity  = new List(listCity, { title: 'City', options: []}),
    hash = {};

httpGet(url)
    .then(
        response => {
            let result  = JSON.parse(response),
                country = [];            
                hash = JSON.parse(JSON.stringify(result));
            for (let key in result) {
                country.push(key);
            }          
            countryList.options.options = [...country];
            countryList.render();                   
        },
        reject => {
            console.log(reject)
        });

selectCountry.onchange = function(event) {
    let city = selectCountry.value;
    listOfCity.options.options = hash[city];
    listOfCity.render();    
}

inputSort.oninput = function(){
    let val = inputSort.value,
        arr = [];
        arr = ([...hash[selectCountry.value]].filter((a)=>{
                for (let i = 0; i < val.length; i++) {
                    if (!a[i] || (a[i].toLowerCase() !== val[i].toLowerCase())) 
                        return false
                }
            return true
        }))
    if(!arr.length){
        arr.push('No matches')
    }
    listOfCity.options.options = arr;
    listOfCity.render()    
}