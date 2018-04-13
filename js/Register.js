class Register {
    constructor(conteiner) {
        this.conteiner = conteiner;
        this.init();
        this.Emitter = new Emiter();
    }

    init() {        
        let form       = new Form(formRegisterOptions),
            linkToReg  = new LinkRoute({ class: 'link', text: 'Go to Login', url: 'login' }),
            captionLog = new Caption({ class: '', text: 'Register' }),
            box        = document.createElement('div'),
            domForm    = form.render();

            linkToReg.on('go-to-login', (data) => {
                this.Emitter.emit('go-to-login')
            })
            
        domForm.addEventListener('submit', e => { this.validateForm.call(this, domForm, e) }, false)
       
        box.appendChild(domForm);
        box.prepend(captionLog.render());
        box.appendChild(linkToReg.render());

        this.conteiner.appendChild(box);
    }

    validateForm(form, event) {
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
        event.preventDefault();
    }

    on(event, callback) {
        this.Emitter.on(event, callback)
    }

    validateUser(result, form) {
        if (result) {
            try {
                if (user.hasOwnProperty(form.email.value)) {
                    throw ({ name: 'ValidUser', message: '*This email already exists', elem: form.email });
                } else {
                    this.createUser(form);
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

    createUser(form) {
        user = {
            email:    form['email'].value,
            name:     form['name'].value,
            surname:  form['surname'].value,
            password: form['password'].value
        };
        this.Emitter.emit('register-user-create', { 'detail': user});    
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


