let urlCountry       = 'file:///home/devico/Projects/countries/components/country/index.html',
    boxFormLogin     = document.getElementById('conteiner-form-login'),
    formLoginOptions =
    {
        inputsOptions: [
            { name: 'email',    type: 'email',    require: true, placeholder: 'You email',    class: 'default-input' },
            { name: 'password', type: 'password', require: true, placeholder: 'You password', class: 'default-input' }],
        conteiner: boxFormLogin,
        actionSubmit: validateFormAndJump.bind(this, 'login'),
        nameForm: 'login'
    };

boxFormLogin.className = 'conteiner-form';

let formLogin  = new Form(formLoginOptions),
    linkToReg  = new LinkRoute({ class: 'link', text: 'Go to Register', url: 'register' }),
    captionLog = new Caption({ class: '', text: 'Log In' });

    