class Form {
    constructor(data) {
        this.data = data;
    }
    render(arrOptions) {
        let options         = arrOptions || this.data.inputsOptions || [],
            form            = document.createElement('form'),
            arrInp          = options.map(x => { return this.createInput(x) });
            form.name       = this.data.nameForm || 'default';
            form.onsubmit   = this.data.actionSubmit;
            form.noValidate = true;
            form.method     = 'post';

        for (let i = 0; i < arrInp.length; i++) {
            let div = new ErrorBox({ eventName: arrInp[i].type + i })
            arrInp[i].setAttribute('data-index', i)
            form.appendChild(arrInp[i]);
            form.appendChild(div.render(arrInp[i]));
        }
        let buttonReg = new ButtonSubmit({ class: 'button', text: 'Submit' });
            form.appendChild(buttonReg.render());

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
        let input   = document.createElement('input'),
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
        box.className   = 'errormsg';

        document.addEventListener(this.data.eventName, (data) => {
            box.style.display = 'block';
            box.textContent   = data.detail.message;
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
        this.render()
    }
    render() {
        let p = document.createElement('p');
        p.className = this.data.class;
        p.textContent = this.data.text;
        p.onclick = (x)=>{
            Emitter.emit('go-to-' + this.data.url, { 'detail': { }, bubbles: true })};
        return p
    }
}

class ButtonSubmit {
    constructor(data) {
        this.data = data;
    }
    render() {
        let button = document.createElement('button');
        button.className = this.data.class;
        button.textContent = this.data.text;
        button.onclick = this.data.event;
        button.type = 'submit';
        return button
    }
}

class Caption {
    constructor(data) {
        this.data = data;
        this.render()
    }
    render() {
        let h2 = document.createElement('h2');
        h2.className   = this.data.class || '';
        h2.textContent = this.data.text || '';
        return h2
    }
}

class List {
    constructor(elem, data) {
        this.elem = elem;
        this.data = data;
    }
    render(arr) {
        this.removeList();
        let items = arr || this.data.items,
            h2 = document.createElement('h2'),
            list = document.createElement('ul');

        h2.textContent = this.data.title || 'title is empty';
        list.classList.add('list-general');

        if (items.length == 0) {
            items.push(['No matches'])
        }

        items.forEach((item) => {
            let a = document.createElement('a'),
                li = document.createElement('li');

            li.textContent = item;
            a.appendChild(li)
            list.appendChild(a);
        })
        this.elem.prepend(h2);
        this.elem.appendChild(list);
    }
    removeList() {
        this.elem.textContent = '';
    }
    addItem(item) {
        this.data.items.push(item);
    }
    filterItems(option) {
        let val = option.criterion.value,
            arr = [];
        arr = (this.data.items.filter((a) => {
            return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
        }))
        this.render(arr);
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

function showError(error, input) {
    let event = new CustomEvent(input.type + input.getAttribute('data-index'), { 'detail': error, bubbles: true })
    input.dispatchEvent(event)
    input.style.border = '1px solid red'
}