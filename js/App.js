class App {
    constructor() {
       this.init();
    }

    init(){
        this.boxForm  = document.getElementById('conteiner-form');
        this.boxLists = document.getElementById('main-conteiner-lists');       
        this.render('login');
    }

    render(path){
        this.clearBox()

        if (path === 'login') {
            this.login = new Login(this.boxForm)
            
            this.login.on('login-user', (data) => {
                this.render('country')
            })
            this.login.on('go-to-register', (data) => {
                this.render('register')
            })            
        }
        else if (path === 'register') {
            this.register = new Register(this.boxForm);

            this.register.on('register-user-create', (data) => {
                this.render('country')
            })
            this.register.on('go-to-login', (data) => {
                this.render('login')
            })            
        }
        else if (path === 'country') {
            if (!this.data) {
                this.getDataCountry();
            } else {
                this.country = new MainCountry(this.boxLists, this.data);
            }            
        }
    }

    clearBox(){
        this.boxLists.style.display = 'none';
        this.boxForm.innerHTML = '';
        this.boxLists.innerHTML = '';
    }

    getDataCountry(){        
        httpGet('https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.min.json')
            .then(
                response => {
                    this.data = response;
                    this.render('country')                    
                },
                reject => {
                    console.log(reject)
                }
            );
        }
    }
myApp = new App();


