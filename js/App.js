class App {
    constructor(data) {
       this.init();
    }

    init(){

        this.boxForm  = document.getElementById('conteiner-form');
        this.boxLists = document.getElementById('main-conteiner-lists');
        this.goOut    = document.getElementById('press-to-out');

        this.render('login');

        Emitter.on('login-user', (data) => {
            this.render('country');
        })

        Emitter.on('register-user-create', (data) => {
            // console.log(data.detail)
            this.render('country');
        })

        Emitter.on('go-to-login', (data) => {
            this.render('login')
        })

        Emitter.on('go-to-register', (data) => {
            this.render('register')
        })
    }

    render(path){
        this.clearBox()

        if (route === 'login') {
            new Login(this.boxForm)
        }
        else if (route === 'register') {
            new Register(this.boxForm)
        }
        else if (route === 'country') {
            new Country(this.boxLists);
            new City(this.boxLists);
        }
    }

    clearBox(){
        this.boxLists.style.display = 'none';
        this.boxForm.innerHTML = '';
        this.boxLists.innerHTML = '';
        headerstatus.style.visibility = 'hidden';
    }
}

myApp = new App();


