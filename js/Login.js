class Login {
    constructor(conteiner){
        this.conteiner = conteiner;
        this.init();
        this.Emitter = new Emiter();
    }

    init(){
        let form       = new Form(formLoginOptions),
            linkToReg  = new LinkRoute({ class: 'link', text: 'Go to Register', url: 'register' }),
            captionLog = new Caption({ class: '', text: 'Log In' }),
            box        = document.createElement('div'),
            domForm    = form.render();

            linkToReg.on('go-to-register', (data) => {
                this.Emitter.emit('go-to-register')
            })

            domForm.onsubmit = this.validateForm.bind(this, domForm)

            box.appendChild(domForm);
            box.prepend(captionLog.render());
            box.appendChild(linkToReg.render());

        this.conteiner.appendChild(box);
    }

    on(event, callback) {
        this.Emitter.on(event, callback)
    }

    validateForm(form) {
        let result = true;
        for (let i = 0; i < form.length; i++) {
            if (form[i].type === 'email') {
                if (!isValidemail(form[i])) {
                    result = false
                }
            } else if (form[i].type === 'password') {
                if (!isValidpassword(form[i])) {
                    result = false
                }
            } else if (form[i].type === 'text') {
                if (!isValidtext(form[i])) {
                    result = false
                }
            }
        }
        this.validateUser(result, form);
    }

    validateUser(result, form) {
        if (result) {
            try {
                if (user.email !== form.email.value) {
                    throw ({ name: 'ValidUser', message: '*No such email was found', elem: form.email });
                } else if (user.password !== form.password.value) {
                    throw ({ name: 'ValidUser', message: '*Password is not valid', elem: form.password })
                } else {
                    this.Emitter.emit('login-user', { 'detail': { email: form.email.value }});
                }
            } catch (error) {
                showError(error, error.elem)
                event.preventDefault();
            }
        } else {            
            event.preventDefault();
        }
    }
}

let formLoginOptions =
        {
            inputsOptions: [
                { name: 'email', type: 'email', require: true, placeholder: 'You email', class: 'default-input' },
                { name: 'password', type: 'password', require: true, placeholder: 'You password', class: 'default-input' }],
            nameForm: 'login',
        };
