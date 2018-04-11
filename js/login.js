class Login {
    constructor(conteiner){
        this.conteiner = conteiner;
        this.init()
    }

    init(){
        let form       = new Form(formLoginOptions),
            linkToReg  = new LinkRoute({ class: 'link', text: 'Go to Register', url: 'register' }),
            captionLog = new Caption({ class: '', text: 'Log In' }),
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

        Emitter.emit('login-user', { 'detail': { result: result, nameForm: nameForm.name, x: x} , bubbles: true });

        return false;
    }

}

let formLoginOptions =
        {
            inputsOptions: [
                { name: 'email', type: 'email', require: true, placeholder: 'You email', class: 'default-input' },
                { name: 'password', type: 'password', require: true, placeholder: 'You password', class: 'default-input' }],
            nameForm: 'login',
        };
