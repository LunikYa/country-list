class Country {
    constructor(elem){
        this.elem = elem;
        this.hash = {
            result: [],
            countries: []
        }
        this.init();
    }

    init(elem){
        this.renderBoxStyles(this.elem);

        let inputFilterCountry = document.getElementById('js-input-filter'),
            elemCountry        = document.getElementById('js-list-country'),
            countryList        = new List(elemCountry, { title: 'Country', items: ['No matches'], defaultEvent: new CustomEvent('country-change', { 'detail': this.curruntCountry, bubbles: true }), selected: 'default' });
            inputFilterCountry.addEventListener('input', countryList.filterItems.bind(countryList, { criterion: inputFilterCountry }))
        
        this.dispatcher(elemCountry)
            
        httpGet('https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.min.json')
            .then(
                response => {
                    this.hash.result = JSON.parse(response);
                    for (let key in this.hash.result) {
                        this.hash.countries.push(key);
                    }
                    countryList.data.items = [...this.hash.countries];
                    countryList.render();
                },
                reject => {
                    console.log(reject)
                });
    }

    dispatcher(elem) {
        elem.addEventListener('click', (event) => {
            this.selected = event.target.textContent;
            Emitter.emit('country-change', { 'detail': [...this.hash.result[this.selected] || ['default']], bubbles: true });
        })
    }

    renderBoxStyles(mainConteiner) {
        emailconteiner.textContent = sessionStorage.user;
        headerstatus.style.visibility = 'visible';        
    let box1 = document.createElement('div');
        box1.classList.add('conteiner-list', 'right');

    let inputCountry = document.createElement('input');
        inputCountry.type = 'text';
        inputCountry.id = 'js-input-filter';
        inputCountry.placeholder = 'Source country';
        inputCountry.className = 'new-task';

    let boxListCountry = document.createElement('div');
        boxListCountry.id = 'js-list-country';
        boxListCountry.className = 'list-country';

        box1.appendChild(inputCountry);
        box1.appendChild(boxListCountry);
        mainConteiner.appendChild(box1);
    }
}
