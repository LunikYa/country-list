let urlLog = 'file:///home/devico/Projects/countries/components/login/index.html';

let boxFormRegister = document.getElementById('conteiner-form-register'),
    formRegisterOptions =
        {
            inputsOptions: [
                { name: 'name',     type: 'text',     require: true, placeholder: 'You name',     class: 'default-input' },
                { name: 'surname',  type: 'text',     require: true, placeholder: 'You surname',  class: 'default-input' },
                { name: 'email',    type: 'email',    require: true, placeholder: 'You email',    class: 'default-input' },
                { name: 'password', type: 'password', require: true, placeholder: 'You password', class: 'default-input' }],
            conteiner: boxFormRegister,
            actionSubmit: validateFormAndJump.bind(this, 'register'),
            nameForm: 'register'
        };

boxFormRegister.className = 'conteiner-form';

let formRegister = new Form(formRegisterOptions),
    linkToLogin  = new LinkRoute({ class: 'link', text: 'Go to Login', url: 'login' }),
    captionReg   = new Caption({ class: '', text: 'Register' });
