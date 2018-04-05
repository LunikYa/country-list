let elemLink = document.getElementById('link-to-register'),
    form     = document.getElementById('form-login');


elemLink.onclick = function name(params) {
    window.location.href = "file:///home/devico/Projects/countries/components/register/index.html"
}

form.addEventListener('submit', validateUser);
// data = {
//     inputsOptions: [{name: 'name', type: 'text', require: false, placeholder: 'You name'}],
//     conteiner: 'Dom element'
// }
class Form {
    constructor(data){
        // this.conteiner = conteiner;
        this.data      = data;
    }
    render(arrOptions){
        let options = arrOptions || this.data.inputsOptions || [],
            form    = document.createElement('form');   

        let arrInp = options.map(x => {this.createInput(x)})

        if(this.data.conteiner){
            this.pasteInput(arrInp, this.data.conteiner)
        }

        console.log(render)

    }

    createInput(options){
        let data = {};
            data.options = options || {};
        let input = new Input(data);
        console.log('create', input)
        return input.render()   
    }

    pasteInput(arrInputs, box){
        for(let i = 0; i < arrInputs.length; i++){
            console.log('paste', arrInputs)
            // box.appendChild(arrInputs[i])
        }
        
    }
}

class Input {
    constructor(data) {
        // this.conteiner = data.conteiner;
        this.data = data;
    }

    render(obj) {
        let input = document.createElement('input'),
            options = obj || this.data.options || {};

        for (let key in options) {
            input[key] = options[key];
        }
        return input;
    }
}


let box = document.createElement('conteiner-form')
let testOptions = {
    inputsOptions: [{name: 'name', type: 'text', require: false, placeholder: 'You name'},
                    { name: 'password', type: 'password', require: true, placeholder: 'You password' }
                    ],
    conteiner: box}

let myForm = new Form(testOptions);
    myForm.render();
// data = {options: {}, conteiner: 'Dom element'}


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
