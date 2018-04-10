let country = document.querySelector('.task-conteiner');

renderСondition(sessionStorage.length ? 'country' : 'login');

function renderСondition(route){
    country.style.display = 'none';
    headerstatus.style.visibility = 'hidden';
    boxFormLogin.innerHTML    = '';
    boxFormRegister.innerHTML = '';

    if (route === 'login') {
        headerstatus.style.visibility = 'hidden';
        let domCaptionLog = captionLog.render(),
            domLinkToReg  = linkToReg.render();
            formLogin.render();

        boxFormLogin.appendChild(domLinkToReg);
         boxFormLogin.prepend(domCaptionLog);
    }

    else if (route === 'register') {
        headerstatus.style.visibility = 'hidden';
        country.style.display = 'none';
        let domCaptionReg  = captionReg.render(),
            domLinkToLogin = linkToLogin.render();
            formRegister.render();

        boxFormRegister.appendChild(domLinkToLogin);
        boxFormRegister.prepend(domCaptionReg);
    }
     
    else if (route === 'country'){
        renderBoxStyles()

            emailconteiner.textContent = sessionStorage.user;
            headerstatus.style.visibility = 'visible';
            country.style.display = 'block';
    
        let inputFilterCountry = document.getElementById('js-input-filter'),
            inputFilterCity    = document.getElementById('js-input-filter-city'),
            elemCountry        = document.getElementById('js-list-country'),
            elemCity           = document.getElementById('js-list-city');

        let countryList = new List(elemCountry, { title: 'Country', items: ['No matches'], defaultEvent: new CustomEvent('country-change', { 'detail': this.curruntCountry, bubbles: true }), selected: 'default' }),
            cityList    = new List(elemCity, { title: 'City', items: ['No matches'], selected: 'default' }),
            hash = {};

        inputFilterCountry.addEventListener('input', countryList.filterItems.bind(countryList, { criterion: inputFilterCountry }))
        inputFilterCity.addEventListener('input', cityList.filterItems.bind(cityList, { criterion: inputFilterCity }))

        httpGet(url)
            .then(
                response => {
                    // wrappLoad.classList.remove('loader')            
                    let result = JSON.parse(response),
                        country = [];
                    hash = JSON.parse(JSON.stringify(result));
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
            (data) => {
                cityList.data.items = [...hash[countryList.selected]]
                cityList.render()
            })

    }
}