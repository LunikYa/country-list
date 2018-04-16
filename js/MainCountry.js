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
        this.initCountryList(this.countries);
        this.initCityList(this.cities);
        this.addListeners();
    }
    
    on(event, callback){
        this.Emitter.on(event, callback)
    }

    initCountryList(data){
        this.renderBoxStylesCountry();      
        this.countryList = new List(this.elemCountry, { title: 'Country', items: data});        
        
        this.elemCountry.addEventListener('click', (event) => {
            this.cities = this.data[event.target.textContent];
            this.cityList.render(this.cities);
        })
        this.countryList.render(data);
    }
   
    initCityList(data){
        this.renderBoxStylesCity()
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
  
    addListeners() {
        this.filterCountry.on('filter-country', (event) => {
            this.countryList.render(this.filterItems(event.detail, this.countries))
            
            this.cities = [];
            let tempCountries = this.filterItems(event.detail, this.countries).slice(0, 3);
            for (let i = 0; i < tempCountries.length; i++) {
                if (tempCountries[i][0] !== 'No matches') {
                    this.data[tempCountries[i]].forEach(x => { this.cities.push(x) })
                }
            }
            this.cityList.render(this.cities);
        })
        
        this.filterCities.on('filter-cities', (event) => {
            this.cityList.render(this.filterItems(event.detail, this.cities))
        })
    }

    renderBoxStylesCountry() {
        this.elem.style.display = 'block';       
        let box = document.createElement('div');
            box.classList.add('conteiner-list', 'left');

        this.filterCountry = new Filter({ type: 'text', placeholder: 'Source country', class: 'new-task', events: ['filter-country'] }, box);
        
        let boxListCountry           = document.createElement('div');
            boxListCountry.className = 'list-country';
        
        this.elemCountry = boxListCountry;
        box.appendChild(boxListCountry);
        this.elem.appendChild(box);   
    }

    renderBoxStylesCity(){
        let box = document.createElement('div');
            box.classList.add('conteiner-list', 'right');

        this.filterCities = new Filter({ type: 'text', placeholder: 'Source country', class: 'new-task', events: ['filter-cities'] }, box);

        let boxListCity           = document.createElement('div');
            boxListCity.className = 'list-country';
        
        this.elemCity = boxListCity;
        box.appendChild(boxListCity);
        this.elem.appendChild(box);
    }
}