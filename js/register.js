class Register {
    constructor(conteiner) {
        this.conteiner = conteiner;
        this.init()
    }

    init() {
        let form       = new Form(formRegisterOptions),
            linkToReg  = new LinkRoute({ class: 'link', text: 'Go to Login', url: 'login' }),
            captionLog = new Caption({ class: '', text: 'Register' }),
            box        = document.createElement('div'),
            domForm    = form.render();

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
        this.validateUser(result, 'register', x);
        return false;
    }

    validateUser(result, nameForm, x) {
        if (result) {
            try {
                if (nameForm === 'register') {
                    if (user.hasOwnProperty(x.email.value)) {
                        throw ({ name: 'ValidUser', message: '*This email already exists', elem: x.email });
                    } else {
                        this.createUser(x);
                    }
                }
            } catch (error) {
                this.showError(error, error.elem)
                event.preventDefault();
                return false
            }
        } else {
            event.preventDefault();
            return false
        }
    }

    createUser(event) {
        let elem = event.target || event,
            user = new User(
                elem['email'].value,
                elem['name'].value,
                elem['surname'].value,
                elem['password'].value
            );
        Emitter.emit('register-user-create', { 'detail': user, bubbles: true });    
        return false
        }
}

let formRegisterOptions =
    {
        inputsOptions: [
            { name: 'name', type: 'text', require: true, placeholder: 'You name', class: 'default-input' },
            { name: 'surname', type: 'text', require: true, placeholder: 'You surname', class: 'default-input' },
            { name: 'email', type: 'email', require: true, placeholder: 'You email', class: 'default-input' },
            { name: 'password', type: 'password', require: true, placeholder: 'You password', class: 'default-input' }],
        nameForm: 'register'
    };


