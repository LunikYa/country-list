let Emitter = new Emiter();

class App {
    constructor() {
       this.init();
    }

    init(){
        this.hash = {
            citiesAndCountries: {},
            countries: [],
            cities: []
        };
       
        this.boxForm  = document.getElementById('conteiner-form');
        this.boxLists = document.getElementById('main-conteiner-lists');
        this.goOut    = document.getElementById('press-to-out');

        this.render('login');
        
        Emitter.on('country-change', (data) => {
            this.hash.cities = this.hash.citiesAndCountries[data.detail];
            this.render('country');
        })

        Emitter.on('login-user', (data) => {
            this.render('country')
        })

        Emitter.on('register-user-create', (data) => {
            this.render('country')
        })

        Emitter.on('go-to-login', (data) => {
            this.render('login')
        })

        Emitter.on('go-to-register', (data) => {
            this.render('register')
        })
    }

    render(path, data){
        this.clearBox()

        if (path === 'login') {
            new Login(this.boxForm)
        }
        else if (path === 'register') {
            new Register(this.boxForm)
        }
        else if (path === 'country') {
            if (this.hash.countries.length === 0) {
                this.getDataCountry();
            } else {
                new MainCountry(this.boxLists, this.hash)
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
                        this.hash.citiesAndCountries = JSON.parse(response);
                        for (let key in this.hash.citiesAndCountries) {
                            this.hash.countries.push(key);
                            this.hash.cities = this.hash.citiesAndCountries['Afghanistan'];
                        }
                        this.render('country')                    
                    },
                    reject => {
                        console.log(reject)
                    }
                );
            }
        }
myApp = new App();


