class MainCountry {
    constructor(elem, data){
        this.data = data;
        this.elem = elem;
        this.init();
    }

    init(){
        this.Emitter = new Emiter();
        this.initCityList();
        this.initCountryList();
        this.countryList.render(this.data.countries);
        this.cityList.render(this.data.cities)
    }

    initCountryList(){
        this.renderBoxStylesCountry();      
        this.elemCountry = document.getElementById('js-list-country');
        this.countryList = new List(this.elemCountry, { title: 'Country', items: ['Do not matches'], selected: 'default' });

        this.countryList.addListener('click', (event) => {
            this.Emitter.emit('country-change', { 'detail': event.target.textContent || ['default'], bubbles: true });
        })      
    }

    initCityList(){
        this.renderBoxStylesCity();
        this.elemCity = document.getElementById('js-list-city');
        this.cityList = new List(this.elemCity, { title: 'City', items: ['No matches'] });
    }

    renderBoxStylesCountry() {
        this.elem.style.display = 'block';
        emailconteiner.textContent = sessionStorage.user;
        headerstatus.style.visibility = 'visible';        
        let box1 = document.createElement('div');
        box1.classList.add('conteiner-list', 'right');
        let boxListCountry = document.createElement('div');
        boxListCountry.id = 'js-list-country';
        boxListCountry.className = 'list-country';

        box1.appendChild(boxListCountry);
        this.elem.appendChild(box1);
    }

    renderBoxStylesCity(){
        emailconteiner.textContent = sessionStorage.user;
        headerstatus.style.visibility = 'visible';
        let box1 = document.createElement('div');
        box1.classList.add('conteiner-list', 'left');

        let boxListCity = document.createElement('div');
        boxListCity.id = 'js-list-city';
        boxListCity.className = 'list-country';

        box1.appendChild(boxListCity);
        this.elem.appendChild(box1);
    }
}