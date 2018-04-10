
class Form {
    constructor(data) {
        this.data = data;
    }
    render(arrOptions) {
        let options = arrOptions || this.data.inputsOptions || [],
            form = document.createElement('form'),
            arrInp = options.map(x => { return this.createInput(x) });
            form.name = this.data.nameForm || 'default';
            form.onsubmit = this.data.actionSubmit;
            form.noValidate = true;

        for (let i = 0; i < arrInp.length; i++) {
            let div = new ErrorBox({ eventName: arrInp[i].type + i })
            arrInp[i].setAttribute('data-index', i)
            form.appendChild(arrInp[i]);
            form.appendChild(div.render(arrInp[i]));
        }
        let buttonReg = new ButtonSubmit({ class: 'button', text: 'Submit'});
            form.appendChild(buttonReg.render());
        this.pasteForm(form);
        return form
    }

    pasteForm(form) {
        let actualForm = form || this.data.form;

        if (this.data.conteiner) {
            this.data.conteiner.appendChild(actualForm)
        } else {
            console.log('we can\'t paste form');
        }
    }

    createInput(options) {
        let data = {};
        data.options = options || {};
        let input = new Input(data);
        return (input.render());
    }
}

class Input {
    constructor(data) {
        this.data = data;
    }
    render(obj) {
        let input = document.createElement('input'),
            options = obj || this.data.options || {};
        input.className = options.class;

        for (let key in options) {
            input[key] = options[key];
        }
        this.addValidate(input);
        return input;
    }

    addValidate(input) {
        input.addEventListener('focus', function (event) {
            event.target.style.border = '1px solid black';
            let hide = new CustomEvent('HideErrorBox', { 'detail': { elem: input.nextElementSibling }, bubbles: true })
            input.dispatchEvent(hide)
        })
        if (input.type === 'email') {
            input.addEventListener('blur', isValidemail);

        } else if (input.type === 'password') {
            input.addEventListener('blur', isValidpassword);

        } else if (input.type === 'text') {
            input.addEventListener('blur', isValidtext);
        }
        return input
    }
}

class ErrorBox {
    constructor(data) {
        this.data = data;
    }
    render(eventName) {
        let box = document.createElement('div');
        box.textContent = 'error';
        box.className = 'errormsg';

        document.addEventListener(this.data.eventName, (data) => {
            box.style.display = 'block';
            box.textContent = data.detail.message;
        })
        document.addEventListener('HideErrorBox', (data) => {
            data.detail.elem.style.display = 'none';
        })
        return box
    }
}

class LinkRoute {
    constructor(data) {
        this.data = data;
    }
    render() {
        let p = document.createElement('p');
            p.className   = this.data.class;
            p.textContent = this.data.text;
        // console.log('this.data.url', this.data.url)
            p.onclick = renderСondition.bind(this, this.data.url)
            // p.onclick = (function (params) {
            //     window.location.href = this.data.url
            // }).bind(this)
        return p
    }
}

class ButtonSubmit {
    constructor(data) {
        this.data = data;
    }
    render() {
        let button = document.createElement('button');
            button.className   = this.data.class;
            button.textContent = this.data.text;            
            button.onclick     = this.data.event;
            button.type        = 'submit';
        return button
    }
}

class Caption {
    constructor(data) {
        this.data = data;
    }
    render() {
        let h2 = document.createElement('h2');
        h2.className = this.data.class || '';
        h2.textContent = this.data.text || '';
        // h2.addEventListener('click', this.data.event)
        return h2
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

function isValidemail(event) {
    let input = event.target || event;
    let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
        if (!regExpEmail.test(input.value)) {
            throw ({ name: 'isValidEmail', message: '*Email is not valid', elem: input })
        } 
        input.style.border = '1px solid green';
        return true
    } catch (error) {
        showError(error, input)
        return false
    }
}

function isValidpassword(event) {
    let input = event.target || event;
    try {
        if (/\W/.test(input.value)) {
            throw ({ name: 'isValidPassword', message: '*Password can`t include special character', elem: input })
        }
        else if (input.value.length < 6) {
            throw ({ name: 'isValidPassword', message: '*Password must be 6 or more characters', elem: input })
        }
        input.style.border = '1px solid green';
        return true
    } catch (error) {
        showError(error, input)
        return false
    }
}

function isValidtext(event) {
    let input = event.target || event;
    try {
        if (/\W|\d/.test(input.value[0])) {
            throw ({ name: 'isValidText', message: '*First char must be letter', elem: input })
        }
        else if (input.value.length < 3) {
            throw ({ name: 'isValidText', message: '*This field must be 3 or more characters', elem: input })
        }
        input.style.border = '1px solid green';
        return true
    } catch (error) {
        showError(error, input)
        return false
    }
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

function validateUser(result, nameForm, x){
    if (result) {
        try {
            if (nameForm === 'register') {
                console.log(x.email.value)
                if (localStorage.hasOwnProperty(x.email.value)) {
                    throw({ name: 'ValidUser', message: '*This email already exists', elem: x.email });
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
        } catch(error){
            showError(error, error.elem )
            event.preventDefault();
            return false
        }
    } else {
        event.preventDefault();
        return false
    }
}

function goOut(event){
    sessionStorage.clear();
    renderСondition('login');
}

function renderBoxStyles() {
    mainConteiner.innerHTML = '';
    let box1 = document.createElement('div'),
        box2 = box1.cloneNode();
        box1.classList.add('conteiner-list', 'left');
        box2.classList.add('conteiner-list', 'right');

    let inputCity             = document.createElement('input');
        inputCity.type        = 'text';
        inputCity.id          = 'js-input-filter-city';
        inputCity.className   = 'new-task';
        inputCity.placeholder = "Source city";

    let inputCountry             = inputCity.cloneNode();
        inputCountry.id          = 'js-input-filter';
        inputCountry.placeholder = 'Source country';

    let boxListCity           = document.createElement('div');
        boxListCity.id        = 'js-list-city';
        boxListCity.className = 'list-country';

    let boxListCountry    = boxListCity.cloneNode();
        boxListCountry.id = 'js-list-country';

    box1.appendChild(inputCity);
    box2.appendChild(inputCountry);

    box1.appendChild(boxListCity);
    box2.appendChild(boxListCountry);

    mainConteiner.appendChild(box1);
    mainConteiner.appendChild(box2);
}
