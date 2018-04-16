class Login {
    constructor(conteiner){
        this.conteiner = conteiner;
        this.Emitter = new Emiter();
        this.init();
    }

    init(){
        this.form      = new Form(formLoginOptions);
        let linkToReg  = new LinkRoute({ class: 'link', text: 'Go to Register', url: 'register' }),
            captionLog = new Caption({ class: '', text: 'Log In' }),
            box        = document.createElement('div'),
            domForm    = this.form.render();

            linkToReg.on('go-to-register', (data) => {
                this.Emitter.emit('go-to-register')
            })

            domForm.addEventListener('submit', e => {this.validateForm.call(this, domForm, e)})

            box.appendChild(domForm);
            box.prepend(captionLog.render());
            box.appendChild(linkToReg.render());

        this.conteiner.appendChild(box);
    }

    on(event, callback) {
        this.Emitter.on(event, callback)
    }

    validateForm(form, event) {
        let result = true;
        for (let i = 0; i < form.length; i++) {
            if (form[i].type === 'email') {
                if (!this.form.isValidemail(form[i])) {
                    result = false
                }
            } else if (form[i].type === 'password') {
                if (!this.form.isValidpassword(form[i])) {
                    result = false
                }
            } else if (form[i].type === 'text') {
                if (!this.form.isValidtext(form[i])) {
                    result = false
                }
            }
        }
        (result) ? this.validateUser(form) : event.preventDefault();
    }

    validateUser(form) {
        try {
            if (user.email !== form.email.value) {
                throw ({ message: '*No such email was found', elem: form.email });
            } else if (user.password !== form.password.value) {
                throw ({ message: '*Password is not valid', elem: form.password })
            } else {
                this.Emitter.emit('login-user', { 'detail': form.email.value });
            }
        } catch (error) {
            this.form.showError(error, error.elem)
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
