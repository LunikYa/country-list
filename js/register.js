document.querySelector('.conteiner-form').style.height = document.documentElement.clientHeight + 'px';
let usersHash = [];

class User {
    constructor(email, name, surname, password) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.password = password;
    }
}

function createUser(event) {
    let elem = event.target,
        user = new User(
            elem['email'].value,
            elem['name'].value,
            elem['surname'].value,
            elem['password'].value
        ),
        result = validateForm(elem);

    if (result.status) {
        usersHash.push(user)
        // showSucces();
        event.preventDefault()
    } else {
        hideErrorAll(user, elem);
        showError(result.error, user);
        event.preventDefault()
    }
}

let registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', createUser);

    // registerForm.addEventListener('blur', test)
function validateInput(ev){
    let input = ev.target || ev;

    if (input){
        let value = input.value,
            name  = input.name;
            console.log(value, name)
        try {
            if (name === 'email') {
                let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regExpEmail.test(value)) {
                    throw({name: 'email is not valid', elem: input})                    
                } 
            }
            if (input.type === 'text') {
                if (value.length < 1) {
                    throw ({ name: 'this field is require ', elem: input})                    
                } 
            }
            if (input.type === 'password') {
                if(value.length < 6){
                    throw ({ name: 'password must be 6 or more characters', elem: input})
                } else if(value !== 'privet'){
                    throw ({ name: 'dbl password is fail', elem: input})
                } 
            }
            input.style.border = '2px solid green';
            return { status: true, error: false }
        }catch (error) {
            showError(error)
            input.style.border = '2px solid red';
            return { status: false, error: error }
        }            
    }   
}

function validateForm(form) {
    for (let i = 0; i < form.children.length; i++) {
        if (form.children[i].tagName === 'INPUT') {
            result = validateInput(form.children[i])           
                if(!result.status){
                    console.log(result)
                    return result
                }            
        }        
    }
    console.log(result)
    return result
    // let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // try {
    //     for (let key in user) {
    //         if (user[key] === '')
    //             throw ({ name: key + ' is require', elem: elem[key] });
    //     }
    //     if (user.password !== elem['dblpassword'].value) {
    //         throw ({ name: 'dbl password is fail', elem: elem['dblpassword'] })
    //     } else if (user.password.length < 6)
    //         throw ({ name: 'password must be 6 or more characters', elem: elem['password'] })
    // } catch (error) {
    //     return { status: false, error: error }
    // }
    // return { status: true, error: false }
}

function showError(error) {
    let box = document.getElementById('error-conteiner');
    box.className = 'error-box';
    box.textContent = error.name;
    box.style.backgroundColor = '#f5aca6';
    box.style.display = 'block';
    error.elem.style.border = '2px solid red';
}

function showSucces(user, elem) {
    console.log(usersHash)
    let box = document.getElementById('error-conteiner');

    for (let key in user) {
        elem[key].style.border = '2px solid green';
    }

    elem['dblpassword'].style.border = '2px solid green';
    box.style.display = 'block';
    box.textContent = 'user ' + user.name + ' created';
    box.style.backgroundColor = '#bdd76d';

    setTimeout(() => {
        box.parentNode.style.display = 'none';
    }, 1000);

}

function hideErrorAll(user, elem) {
    elem['dblpassword'].style.border = '1px solid black';
    for (let key in user) {
        elem[key].style.border = '1px solid black';
    }
}