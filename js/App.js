let boxForm   = document.getElementById('conteiner-form'),
    boxLists  = document.getElementById('main-conteiner-lists'),
    goOut     = document.getElementById('press-to-out');

class App {
    constructor(data) {
        
        Emitter.on('login-user', (data) => {
            this.init('country');
        })

        Emitter.on('register-user-create', (data) => {
            // console.log(data.detail)
            this.init('country');
        })

        Emitter.on('go-to-login', (data) => {
            this.init('login')
        })

        Emitter.on('go-to-register', (data) => {
            this.init('register')
        })
        
        goOut.onclick = this.goOut.bind(this);
        this.init();
    }

    init(path){
        this.clearBox()

        let route = path || 'login';
        if (route === 'login') {
            new Login(boxForm)
        }
        else if (route === 'register') {
            new Register(boxForm)
        }
        else if (route === 'country') {
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
}

myApp = new App();


