class MainCountry {
    constructor(elem, data){
        this.data = data;
        this.elem = elem;
        this.Emitter = new Emiter();
        this.init();
    }

    init(){   
        this.data.countries = [];
        for (let key in this.data) {
            this.data.countries.push(key);
        } 

        this.data.cities = [];
        for (let i = 0; this.data.cities.length < 50; i++) {
            this.data[this.data.countries[i]].forEach((x) => { this.data.cities.push(x) })
        }

        this.initCountryList(this.data.countries);
        this.initCityList(this.data.cities);
        
        this.on('country-change', (data) => {
            this.data.cities = this.data[data.detail];
            this.cityList.render(this.data.cities);
        })

        this.on('country-filtred', (data) => {            
            this.data.cities = [];
            let tempCountries = this.countryList.getFiltredList().slice(0, 3);

            for (let i = 0; i < tempCountries.length; i++){
                if (tempCountries[i][0] !== 'No matches')
                    this.data[tempCountries[i]].forEach(x => { this.data.cities.push(x)})
                }                      
            this.cityList.render(this.data.cities);
            this.addFilterListCity(this.data.cities)           
        })
    }
    
    on(event, callback){
        this.Emitter.on(event, callback)
    }

    initCountryList(data){
        this.renderBoxStylesCountry();      
        this.elemCountry = document.getElementById('js-list-country');
        this.countryList = new List(this.elemCountry, { title: 'Country', items: data || ['default']});        
        
        this.countryList.addListener('click', (event) => {
            this.Emitter.emit('country-change', { 'detail': event.target.textContent || ['default']});
        })    
        
        this.addFilterListCountry(data)
        this.countryList.render(data);
    }
   
    initCityList(data){
        this.renderBoxStylesCity();
        this.elemCity = document.getElementById('js-list-city');
        this.cityList = new List(this.elemCity, { title: 'City', items: data || ['default']});

        this.addFilterListCity(data)     
        this.cityList.render(data)
    }

    addFilterListCity(data) {
        let inputFilterCity = document.getElementById('js-input-filter-city');
        inputFilterCity.addEventListener('input', this.cityList.filterItems.bind(this.cityList, inputFilterCity, data));
    }

    addFilterListCountry(data) {
        let inputFilterCountry = document.getElementById('js-input-filter');
        inputFilterCountry.addEventListener('input', this.countryList.filterItems.bind(this.countryList, inputFilterCountry, data))

        inputFilterCountry.addEventListener('input', (event) => {
            this.Emitter.emit('country-filtred', { 'detail': event.target.value })
        })
    }

    renderBoxStylesCountry() {
        this.elem.style.display = 'block';
       
        let box = document.createElement('div');
            box.classList.add('conteiner-list', 'left');

        let inputCountry = document.createElement('input');
            inputCountry.type = 'text';
            inputCountry.id = 'js-input-filter';
            inputCountry.placeholder = 'Source country';
            inputCountry.className = 'new-task';

        let boxListCountry = document.createElement('div');
            boxListCountry.id = 'js-list-country';
            boxListCountry.className = 'list-country';

        box.appendChild(inputCountry);
        box.appendChild(boxListCountry);
        this.elem.appendChild(box);
    }

    renderBoxStylesCity(){
        let box = document.createElement('div');
            box.classList.add('conteiner-list', 'right');

        let inputCity = document.createElement('input');
            inputCity.type = 'text';
            inputCity.id = 'js-input-filter-city';
            inputCity.className = 'new-task';
            inputCity.placeholder = "Source city";

        let boxListCity = document.createElement('div');
            boxListCity.id = 'js-list-city';
            boxListCity.className = 'list-country';

        box.appendChild(inputCity);  
        box.appendChild(boxListCity);
        this.elem.appendChild(box);
    }
}