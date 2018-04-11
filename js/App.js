let boxForm        = document.getElementById('conteiner-form'),
    boxLists       = document.getElementById('main-conteiner-lists');

class App {
    constructor(data) {
        this.data = data;

        document.addEventListener('login-user', (data) => {
            this.validateUser(data.detail.result, data.detail.nameForm, data.detail.x)
        })

        document.addEventListener('register-user', (data) => {
            this.validateUser(data.detail.result, data.detail.nameForm, data.detail.x)
        })

        document.addEventListener('go-to-login', (data) => {
            this.init('login')
        })

        document.addEventListener('go-to-register', (data) => {
            this.init('register')
        })

        this.init();
    }

    init(path){
        this.clearBox()

        let route = path || (sessionStorage.length ? 'country' : 'login');
        if (route === 'login') {
            new Login(boxForm)
        }
        else if (route === 'register') {
            new Register(boxForm)
        }
        else if (route === 'country') {
            boxLists.style.display = 'block';
            new Country(boxLists);
            new City(boxLists);
        }
    }
    
    clearBox(){
        boxLists.style.display = 'none';
        boxForm.innerHTML = '';
        boxLists.innerHTML = '';
        headerstatus.style.visibility = 'hidden';
    }

    goOut() {
        sessionStorage.clear();
        this.init();
    }

    createUser(event) {
        let elem = event.target || event,
            user = new User(
                elem['email'].value,
                elem['name'].value,
                elem['surname'].value,
                elem['password'].value
            );
        localStorage.setItem(user.email, JSON.stringify(user))
        sessionStorage.setItem('user', user.email);
        this.init('country');
        return false
    }

    showError(error, input) {
        let event = new CustomEvent(input.type + input.getAttribute('data-index'), { 'detail': error, bubbles: true })
        input.dispatchEvent(event)
        input.style.border = '1px solid red'
    }

    validateUser(result, nameForm, x) {
        if (result) {
            try {
                if (nameForm === 'register') {

                    if (localStorage.hasOwnProperty(x.email.value)) {
                        throw ({ name: 'ValidUser', message: '*This email already exists', elem: x.email });
                    } else {
                        this.createUser(x);
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
                        this.init('country');
                    }
                }
            } catch (error) {
                this.showError(error, error.elem)
                event.preventDefault();
                return false
            }
        } else {
            event.preventDefault();
            return false
        }
    }
}

myApp = new App();
document.getElementById('press-to-out').onclick = myApp.goOut.bind(myApp)

