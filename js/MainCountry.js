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
        this.initCountry(this.elemCountry, this.countries);
        this.initCity(this.elemCity, this.cities);
    }
    
    initCountry(elem, data) {
        this.country = new Country(elem, data);

        this.country.on('country-change', (country) => {
            if (!!this.data[country]){
                this.cities = this.data[country];
                this.city.render(this.cities);
            }
        })
    }

    initCity(elem, data) {
        this.city = new City(elem, data);
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
        this.country.render(filtred)
        return filtred
    }
   
    filterCity(value) {
        this.city.render(this.filterItems(value, this.cities))
    }

    changeCities(arr){
        this.cities = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== 'No matches') {
                this.data[arr[i]].forEach(x => { this.cities.push(x) })
            }
        }
        this.city.render(this.cities)
    }

    filterItems(value, items) {
        let filtredArr = (items.filter((a) => {
            return !(a.toLowerCase().indexOf(value.toLowerCase()) !== 0);
        }))
        return filtredArr;
    }

    on(event, callback) {
        this.Emitter.on(event, callback)
    }

    renderBoxCountry() {
        this.elem.style.display = 'block';
        let box = document.createElement('div');
            box.classList.add('conteiner-list', 'left');
        let boxListCountry = document.createElement('div');
            boxListCountry.className = 'list-country';
        
        this.initFilterCountry(box);

        this.elemCountry = boxListCountry;
        box.appendChild(boxListCountry);
        this.elem.appendChild(box);
    }

    renderBoxCity() {
        let box = document.createElement('div');
            box.classList.add('conteiner-list', 'right');
        let boxListCity = document.createElement('div');
            boxListCity.className = 'list-country';

        this.initFilterCity(box);

        this.elemCity = boxListCity;
        box.appendChild(boxListCity);
        this.elem.appendChild(box);
    }
}