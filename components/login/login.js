let elemLink  = document.getElementById('link-to-register'),
    form      = document.getElementById('form-login'),
    usersTest = {};
// elemLink.onclick = function name(params) {
//     window.location.href = "file:///home/devico/Projects/countries/components/register/index.html"
// }

// form.addEventListener('submit', validateUser);
let urlLog     = 'file:///home/devico/Projects/countries/components/login/index.html',
    urlCountry = 'file:///home/devico/Projects/countries/components/country/index.html';
class Form {
    constructor(data){
        this.data = data;
    }

    render(arrOptions){
        let options = arrOptions || this.data.inputsOptions || [],
            form    = document.createElement('form');   

        let arrInp = options.map(x => {return this.createInput(x)})
       
        for (let i = 0; i < arrInp.length; i++){
            let div = new ErrorBox({ eventName: arrInp[i].type + i})

            arrInp[i].setAttribute('data-index', i)
            form.name = this.data.nameForm || 'default';
            form.appendChild(arrInp[i])
            form.appendChild(div.render(arrInp[i]))
        }
        this.pasteForm(form);
        return form
    }

    pasteForm(form){
        let actualForm = form || this.data.form;

        if (this.data.conteiner) {
            this.data.conteiner.appendChild(actualForm)
        } else {
            console.log('we can\'t paste form');
        }
    }

    createInput(options){
        let data = {};
            data.options = options || {};
        let input = new Input(data);
        return (input.render());
    }
}

class Input {
    constructor(data) {
        this.data = data;
    }

    render(obj) {
        let input   = document.createElement('input'),
            options = obj || this.data.options || {};   
        
            input.className = options.class;

        for (let key in options) {
            input[key] = options[key];
        }
        this.addValidate(input);
        return input;
    }

    addValidate(input){
        // let nameFunctionValidate; 
        input.addEventListener('focus', function(event) {
            event.target.style.border = '1px solid black';
            let hide = new CustomEvent('HideErrorBox', { 'detail': { elem: input.nextElementSibling }, bubbles: true })
                input.dispatchEvent(hide)   
        })

        if (input.type === 'email'){
            input.addEventListener('blur', isValidemail);

        } else if (input.type === 'password'){
            input.addEventListener('blur', isValidpassword);

        } else if (input.type === 'text'){
            input.addEventListener('blur', isValidtext);
        }
        return input
    }  
}

class ErrorBox {
    constructor(data){
        this.data = data;
    }
    render(eventName){
        let box = document.createElement('div');
            box.textContent = 'error';
            box.className   = 'errormsg';
            
            document.addEventListener(this.data.eventName, (data)=>{
                box.style.display = 'block';
                box.textContent = data.detail.message;
            })
            document.addEventListener('HideErrorBox', (data)=>{
                data.detail.elem.style.display = 'none';
            })
        return box
    }            
}

function showError(error, input){
    let event = new CustomEvent(input.type + input.getAttribute('data-index'), { 'detail': error, bubbles: true })
    input.dispatchEvent(event)
    input.style.border = '1px solid red'
}

function isValidemail(event) {
    let input = event.target || event;
    let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
        if (!regExpEmail.test(input.value)) {
            throw ({ name: 'isValidEmail', message: '*Email is not valid', elem: input })
        } 
        input.style.border = '1px solid green'
        return true
    } catch (error) {
        showError(error, input)
        return false
    }    
}

function isValidpassword(event){
    let input = event.target || event;
    try{
        if (/\W/.test(input.value)) {            
            throw ({ name: 'isValidPassword', message: '*Password can`t include special character', elem: input })
        }
        else if (input.value.length < 6) {            
            throw ({ name: 'isValidPassword', message:'*Password must be 6 or more characters', elem: input })
        } 
        input.style.border = '1px solid green';
        return true
    } catch(error) {
        showError(error, input)
        return false
    }    
}

function isValidtext(event) {
    let input = event.target || event;
    try{
        if (/\W|\d/.test(input.value[0])) {            
            throw ({ name: 'isValidText', message: '*First char must be letter', elem: input })
        }
        else if (input.value.length < 3) {
            throw ({ name: 'isValidText', message: '*This field must be 3 or more characters', elem: input })
        }
        input.style.border = '1px solid green';
        return true
    } catch(error){
        showError(error, input)
        return false
    }    
}


{
let boxFormLogin     = document.getElementById('conteiner-form-login'),
    formLoginOptions = 
    {
        inputsOptions: [
            { name: 'email',    type: 'email',    require: true, placeholder: 'You email',    class: 'default-input' },
            { name: 'password', type: 'password', require: true, placeholder: 'You password', class: 'default-input' }],
        conteiner: boxFormLogin,
        actionSubmit: '',
        nameForm: 'login'
    };

boxFormLogin.className = 'conteiner-form';

let formLogin  = new Form(formLoginOptions),
    captionLog = document.createElement('h2'),
    buttonLog  = document.createElement('button');

    formLogin.render();

    captionLog.textContent = 'Log In';
    buttonLog.className    = 'button';
    buttonLog.textContent  = 'Submit'
    buttonLog.addEventListener('click', validateFormAndJump.bind(this, 'login', urlCountry));
    boxFormLogin.appendChild(buttonLog);
    boxFormLogin.prepend(captionLog)
}

let boxFormRegister = document.getElementById('conteiner-form-register'),
    formRegisterOptions =
        {
            inputsOptions: [                
                { name: 'name',    type: 'text',     require: true, placeholder: 'You name',     class: 'default-input' },
                { name: 'surname', type: 'text',     require: true, placeholder: 'You surname',  class: 'default-input' },
                { name: 'email',   type: 'email',    require: true, placeholder: 'You email',    class: 'default-input' },
                { name: 'password',type: 'password', require: true, placeholder: 'You password', class: 'default-input' }],
            conteiner: boxFormRegister,
            actionSubmit: '',
            nameForm: 'register'
        };

boxFormRegister.className = 'conteiner-form';

let buttonReg    = document.createElement('button'),
    captionReg   = document.createElement('h2'),
    formRegister = new Form(formRegisterOptions);

    formRegister.render();

captionReg.textContent = 'Register';

buttonReg.className    = 'button';
buttonReg.textContent  = 'Submit';
buttonReg.addEventListener('click', validateFormAndJump.bind(this, 'register', urlCountry));

boxFormRegister.appendChild(buttonReg);
boxFormRegister.prepend(captionReg)

function submit(nameForm){

}

function validateFormAndJump(nameForm, href){
    let x      = document.forms[nameForm],
        result = true;
       
    for(let i = 0; i < x.length; i++){
        console.log(x, x[i].type)
        if (x[i].type === 'email') {
            console.log(isValidemail(x[i]))
            if(!isValidemail(x[i])){
                result = false
            }
        } else if (x[i].type === 'password'){
            if (!isValidpassword(x[i])) {
                result = false
            }
            console.log(isValidpassword(x[i]));
        } else if (x[i].type === 'text') {
            if (!isValidtext(x[i])) {
                result = false
            }
            console.log(isValidtext(x[i]));
        }
        
    }
    console.log('result', result)
    result ? `${window.location.href = href}` : false
}


function validateUser(event) {
    let usersHash = [];
        usersHash.push(JSON.parse(localStorage.user));

    for(let i = 0; i < usersHash.length; i++){
        if(usersHash[i].email === event.target.email.value){
            event.target.email.style.border = '2px solid green';
            if (usersHash[i].password === event.target.password.value){
                window.location.href = "file:///home/devico/Projects/countries/components/country/index.html"
                event.preventDefault()
                return true
            } else{
                event.target.password.style.border = '2px solid red';
                event.preventDefault()
                return false
            }
        }        
    }
    event.target.email.style.border = '2px solid red'
    event.preventDefault()
    return false
}

