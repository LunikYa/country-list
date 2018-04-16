class MainCountry {
    constructor(elem, data){
        this.data = data;
        this.elem = elem;
        this.Emitter = new Emiter();
        this.init();
    }

    init(){
        this.countries = [];
        for (let key in this.data) {
            this.countries.push(key);
        }
        this.cities = [];
        for (let i = 0; this.cities.length < 50; i++) {
            this.data[this.countries[i]].forEach((x) => { this.cities.push(x) })
        }
        this.initCountry(this.countries);
        this.initCity(this.cities);
        this.addListeners();
    }
    
    on(event, callback){
        this.Emitter.on(event, callback)
    }

    initCountry(data){
        this.renderBoxCountry();
        this.countryList = new List(this.elemCountry, { title: 'Country', items: data});        
        
        this.elemCountry.addEventListener('click', (event) => {
            this.cities = this.data[event.target.textContent];
            this.cityList.render(this.cities);
        })
        this.countryList.render(data);
    }
   
    initCity(data){
        this.renderBoxCity()
        this.cityList = new List(this.elemCity, { title: 'City', items: data});
        this.cityList.render(data)
    }

    filterItems(value, items) {
        let filtredArr = (items.filter((a) => {
            if (typeof a === 'string')
                return !(a.toLowerCase().indexOf(value.toLowerCase()) !== 0);
        }))
        return filtredArr;
    }

    filterCounty(val) {
        for (let key in this.data) {
            this.countries.push(key);
        }
        this.renderCities
    }
  
    addListeners() {
        this.filterCountry.on('filter', (val) => {
            this.filterCounty(val)
        })
        
        this.filterCities.on('filter', (event) => {
            this.cityList.render(this.filterItems(event.detail, this.cities))
        })
    }

    renderBoxCountry() {
        this.elem.style.display = 'block';
        let box = document.createElement('div');
            box.classList.add('conteiner-list', 'left');

        this.filterCountry = new Filter();
        
        let boxListCountry           = document.createElement('div');
            boxListCountry.className = 'list-country';
        
        this.elemCountry = boxListCountry;
        box.appendChild(boxListCountry);
        this.elem.appendChild(box);   
    }

    renderBoxCity(){
        let box = document.createElement('div');
            box.classList.add('conteiner-list', 'right');

        this.filterCities = new Filter(box);

        let boxListCity           = document.createElement('div');
            boxListCity.className = 'list-country';
        
        this.elemCity = boxListCity;
        box.appendChild(boxListCity);
        this.elem.appendChild(box);
    }
}