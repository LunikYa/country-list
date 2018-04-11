class City {
    constructor(elem){
        this.elem = elem;
        this.init();
    }

    init(elem){
        this.renderBoxStyles(this.elem);

        let inputFilterCity = document.getElementById('js-input-filter-city'),
            elemCity        = document.getElementById('js-list-city');

        let cityList    = new List(elemCity, { title: 'City', items: ['No matches'], selected: 'default' });           
            inputFilterCity.addEventListener('input', cityList.filterItems.bind(cityList, { criterion: inputFilterCity }))

            Emitter.on('country-change',
                (data) => {
                    cityList.data.items = data.detail;
                    cityList.render()
                })
    }
    renderBoxStyles(mainConteiner) {
        emailconteiner.textContent = sessionStorage.user;
        headerstatus.style.visibility = 'visible';

    let box1 = document.createElement('div');
        box1.classList.add('conteiner-list', 'left');

    let inputCity = document.createElement('input');
        inputCity.type = 'text';
        inputCity.id = 'js-input-filter-city';
        inputCity.className = 'new-task';
        inputCity.placeholder = "Source city";

    let boxListCity = document.createElement('div');
        boxListCity.id = 'js-list-city';
        boxListCity.className = 'list-country';
        box1.appendChild(inputCity);        
        box1.appendChild(boxListCity);        
        mainConteiner.appendChild(box1);     
    }
}
