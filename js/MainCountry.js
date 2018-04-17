class MainCountry {
    constructor(elem, data) {
        this.data = data;
        this.elem = elem;
        this.Emitter = new Emiter();
        this.init();
    }

    init() {
        this.countries = [];
        for (let key in this.data) {
            this.countries.push(key);
        }
        this.cities = [];
        for (let i = 0; this.cities.length < 50; i++) {
            this.data[this.countries[i]].forEach((x) => { this.cities.push(x) })
        }
        this.renderBoxCountry();
        this.renderBoxCity();
        this.initCountry();
        this.initCity();
    }
    
    initCountry() {
        this.country = new Country(this.elemCountry, this.countries);

        this.country.on('country-change', (country) => {
            if (!!this.data[country]){
                this.cities = this.data[country];
                this.city.emit('render', this.cities);
            }   
        })
    }

    initCity() {
        this.city = new City(this.elemCity, this.cities);
    }

    initFilterCountry(elem){
        this.inputFilterCountry = new Filter(elem);

        this.inputFilterCountry.on('filter', (value) => {
            let tempCountries = this.filterCountry(value).slice(0, 3);
            this.changeCities(tempCountries);
        })
    }

    initFilterCity(elem) {
        this.inputFilterCity = new Filter(elem);

        this.inputFilterCity.on('filter', (value) => {
            this.filterCity(value)
        })        
    }
    
    filterCountry(value) {
        let filtred = this.filterItems(value, this.countries);
        this.country.emit('render', filtred);
        return filtred
    }
   
    filterCity(value) {
        let filtred = this.filterItems(value, this.cities);
        this.city.emit('render', filtred);
    }

    changeCities(arr){
        this.cities = [];
        if (arr[0] === 'No matches') {
            this.cities.push('No matches')
        } else{ 
            for (let i = 0; i < arr.length; i++) {
                this.data[arr[i]].forEach(x => { this.cities.push(x) })
            }
        }
        this.city.emit('render', this.cities)
    }

    filterItems(value, items) {
        let filtredArr = (items.filter((a) => {
            return !(a.toLowerCase().indexOf(value.toLowerCase()) !== 0);
        }))
        if (filtredArr.length === 0){
            filtredArr.push('No matches')
        }
        return filtredArr;
    }
    
    on(event, callback) {
        this.Emitter.on(event, callback)
    }

    renderBoxCountry() {
        this.elem.style.display = 'block';
        let box = document.createElement('div'),
            boxListCountry = document.createElement('div');

        box.classList.add('conteiner-list', 'left');        
        boxListCountry.className = 'list-country';
        
        this.initFilterCountry(box);

        this.elemCountry = boxListCountry;
        box.appendChild(boxListCountry);
        this.elem.appendChild(box);
    }

    renderBoxCity() {
        let box = document.createElement('div'),
            boxListCity = document.createElement('div');

        box.classList.add('conteiner-list', 'right');        
        boxListCity.className = 'list-country';

        this.initFilterCity(box);

        this.elemCity = boxListCity;
        box.appendChild(boxListCity);
        this.elem.appendChild(box);
    }
}