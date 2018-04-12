class Login {
    constructor(conteiner){
        this.conteiner = conteiner;
        this.init()
    }

    init(){
        this.Emitter = new Emiter();

        let form       = new Form(formLoginOptions),
            linkToReg  = new LinkRoute({ class: 'link', text: 'Go to Register', url: 'register' }),
            captionLog = new Caption({ class: '', text: 'Log In' }),
            box        = document.createElement('div'),
            domForm    = form.render();

            linkToReg.Emitter.on('go-to-register', (data) => {
                this.Emitter.emit('go-to-register')
            })
            domForm.onsubmit = this.validateForm.bind(this, domForm)

            box.appendChild(domForm);
            box.prepend(captionLog.render());
            box.appendChild(linkToReg.render());

        this.conteiner.appendChild(box);
    }

    validateForm(nameForm) {
        let x = nameForm,
            result = true;

        for (let i = 0; i < x.length; i++) {
            if (x[i].type === 'email') {
                if (!isValidemail(x[i])) {
                    result = false
                }
            } else if (x[i].type === 'password') {
                if (!isValidpassword(x[i])) {
                    result = false
                }
            } else if (x[i].type === 'text') {
                if (!isValidtext(x[i])) {
                    result = false
                }
            }
        }
        this.validateUser(result, 'login', x)        
        return false;
    }

    validateUser(result, nameForm, x) {
        if (result) {
            try {
                if (nameForm === 'login') {
                    if (user.email !== x.email.value) {
                        throw ({ name: 'ValidUser', message: '*No such email was found', elem: x.email });
                    } else if (user.password !== x.password.value) {
                        throw ({ name: 'ValidUser', message: '*Password is not valid', elem: x.password })
                    }
                    else {
                        this.Emitter.emit('login-user', { 'detail': { email: x.email.value }, bubbles: true });
                    }
                }
            } catch (error) {
                showError(error, error.elem)
                event.preventDefault();
                return false
            }
        } else {            
            event.preventDefault();
            return false
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
