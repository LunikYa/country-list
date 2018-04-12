
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
    }

    render(path, data){
        this.clearBox()

        if (path === 'login') {
            this.login = new Login(this.boxForm)
            
            this.login.Emitter.on('login-user', (data) => {
                this.render('country')
            })
            this.login.Emitter.on('go-to-register', (data) => {
                this.render('register')
            })
            
        }
        else if (path === 'register') {
            this.register = new Register(this.boxForm);

            this.register.Emitter.on('login-user', (data) => {
                this.render('country')
            })
            this.register.Emitter.on('go-to-login', (data) => {
                this.render('login')
            })
            
        }
        else if (path === 'country') {
            if (this.hash.countries.length === 0) {
                this.getDataCountry();
            } else {
                this.country = new MainCountry(this.boxLists, this.hash);

                this.country.Emitter.on('country-change', (data) => {
                    this.hash.cities = this.hash.citiesAndCountries[data.detail];
                    this.render('country');
                })
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


