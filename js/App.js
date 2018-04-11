/*DATA FOR FORM LOGIN*/

let boxFormLogin = document.getElementById('conteiner-form-login'),
    formLoginOptions =
        {
            inputsOptions: [
                { name: 'email', type: 'email', require: true, placeholder: 'You email', class: 'default-input' },
                { name: 'password', type: 'password', require: true, placeholder: 'You password', class: 'default-input' }],
            conteiner: boxFormLogin,
            actionSubmit: validateFormAndJump.bind(this, 'login'),
            nameForm: 'login'
        };
boxFormLogin.className = 'conteiner-form';

let formLogin  = new Form(formLoginOptions),
    linkToReg  = new LinkRoute({ class: 'link', text: 'Go to Register', url: 'register' }),
    captionLog = new Caption({ class: '', text: 'Log In' });


/*DATA FOR FORM REGISTER*/

let boxFormRegister = document.getElementById('conteiner-form-register'),
    formRegisterOptions =
        {
            inputsOptions: [
                { name: 'name', type: 'text', require: true, placeholder: 'You name', class: 'default-input' },
                { name: 'surname', type: 'text', require: true, placeholder: 'You surname', class: 'default-input' },
                { name: 'email', type: 'email', require: true, placeholder: 'You email', class: 'default-input' },
                { name: 'password', type: 'password', require: true, placeholder: 'You password', class: 'default-input' }],
            conteiner: boxFormRegister,
            actionSubmit: validateFormAndJump.bind(this, 'register'),
            nameForm: 'register'
        };
boxFormRegister.className = 'conteiner-form';

let formRegister = new Form(formRegisterOptions),
    linkToLogin  = new LinkRoute({ class: 'link', text: 'Go to Login', url: 'login' }),
    captionReg   = new Caption({ class: '', text: 'Register' });


renderСondition(sessionStorage.length ? 'country' : 'login');

function renderСondition(route){
    let boxLists = document.getElementById('main-conteiner-lists');
        boxLists.style.display = 'none';
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
        let domCaptionReg  = captionReg.render(),
            domLinkToLogin = linkToLogin.render();
            formRegister.render();

        boxFormRegister.appendChild(domLinkToLogin);
        boxFormRegister.prepend(domCaptionReg);
    }
     
    else if (route === 'country'){
        renderBoxStyles()
    
        let inputFilterCountry = document.getElementById('js-input-filter'),
            inputFilterCity    = document.getElementById('js-input-filter-city'),
            elemCountry        = document.getElementById('js-list-country'),
            elemCity           = document.getElementById('js-list-city');

        let countryList = new List(elemCountry, { title: 'Country', items: ['No matches'], defaultEvent: new CustomEvent('country-change', { 'detail': this.curruntCountry, bubbles: true }), selected: 'default' }),
            cityList    = new List(elemCity, { title: 'City', items: ['No matches'], selected: 'default' });
            

        inputFilterCountry.addEventListener('input', countryList.filterItems.bind(countryList, { criterion: inputFilterCountry }))
        inputFilterCity.addEventListener('input', cityList.filterItems.bind(cityList, { criterion: inputFilterCity }))
        
        let hash = {
            result: [],
            countries: []
        };
        
        httpGet('https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.min.json')
            .then(
                response => {
                    hash.result = JSON.parse(response);

                    for (let key in hash.result) {
                        hash.countries.push(key);
                    }
                    
                    countryList.data.items = [...hash.countries];
                    countryList.render();
                },
                reject => {
                    console.log(reject)
                });

        document.body.addEventListener('country-change',
            (data) => {
                cityList.data.items = [...hash.result[countryList.selected]]
                cityList.render()
            })

    }
}

class User {
    constructor(email, name, surname, password) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.password = password;
    }
}

function createUser(event) {
    let elem = event.target || event,
        user = new User(
            elem['email'].value,
            elem['name'].value,
            elem['surname'].value,
            elem['password'].value
        );

    // localStorage.clear()
    localStorage.setItem(user.email, JSON.stringify(user))
    // console.log(localStorage)
    sessionStorage.setItem('user', user.email);
    renderСondition('country');
    // window.location.href = "file:///home/devico/Projects/countries/components/country/index.html"
    // event.preventDefault()
    return false
}

function showError(error, input) {
    let event = new CustomEvent(input.type + input.getAttribute('data-index'), { 'detail': error, bubbles: true })
    input.dispatchEvent(event)
    input.style.border = '1px solid red'
}

function validateFormAndJump(nameForm, href) {
    let x = document.forms[nameForm],
        result = true;

    for (let i = 0; i < x.length; i++) {
        if (x[i].type === 'email') {
            if (!isValidemail(x[i])) {
                result = false
            }
        } else if (x[i].type === 'password') {
            if (!isValidpassword(x[i])) {
                result = false
            }
        } else if (x[i].type === 'text') {
            if (!isValidtext(x[i])) {
                result = false
            }
        }
    }
    validateUser(result, nameForm, x);
    return false;
    // result ? `${window.location.href = href}` : false

}

function validateUser(result, nameForm, x) {
    if (result) {
        try {
            if (nameForm === 'register') {
                console.log(x.email.value)
                if (localStorage.hasOwnProperty(x.email.value)) {
                    throw ({ name: 'ValidUser', message: '*This email already exists', elem: x.email });
                } else {
                    createUser(x);
                }
            }
            else if (nameForm === 'login') {
                if (!localStorage.hasOwnProperty(x.email.value)) {
                    throw ({ name: 'ValidUser', message: '*No such email was found', elem: x.email });
                } else if (JSON.parse(localStorage.getItem(x.email.value)).password !== x.password.value) {
                    throw ({ name: 'ValidUser', message: '*Password is not valid', elem: x.password })
                }
                else {
                    sessionStorage.setItem('user', x.email.value)
                    renderСondition('country');
                }
            }
        } catch (error) {
            showError(error, error.elem)
            event.preventDefault();
            return false
        }
    } else {
        event.preventDefault();
        return false
    }
}

function goOut(event) {
    sessionStorage.clear();
    renderСondition('login');
}

function renderBoxStyles() {
    let boxLists = document.getElementById('main-conteiner-lists'),
        mainConteiner = document.getElementById('main-conteiner-lists');
        emailconteiner.textContent = sessionStorage.user;
        headerstatus.style.visibility = 'visible';
        boxLists.style.display = 'block';
        mainConteiner.innerHTML = '';

    let box1 = document.createElement('div'),
        box2 = box1.cloneNode();
        box1.classList.add('conteiner-list', 'left');
        box2.classList.add('conteiner-list', 'right');

    let inputCity = document.createElement('input');
        inputCity.type = 'text';
        inputCity.id = 'js-input-filter-city';
        inputCity.className = 'new-task';
        inputCity.placeholder = "Source city";

    let inputCountry = inputCity.cloneNode();
        inputCountry.id = 'js-input-filter';
        inputCountry.placeholder = 'Source country';

    let boxListCity = document.createElement('div');
        boxListCity.id = 'js-list-city';
        boxListCity.className = 'list-country';

    let boxListCountry = boxListCity.cloneNode();
        boxListCountry.id = 'js-list-country';

    box1.appendChild(inputCity);
    box2.appendChild(inputCountry);

    box1.appendChild(boxListCity);
    box2.appendChild(boxListCountry);

    mainConteiner.appendChild(box1);
    mainConteiner.appendChild(box2);
}

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