let elemLinkLog  = document.getElementById('link-to-login'),
    registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', createUser);
elemLinkLog.onclick = function (params) {        
    window.location.href = "file:///home/devico/Projects/countries/components/login/index.html"
}

for (let i = 0; i < registerForm.children.length; i++){
    if (registerForm.children[i].tagName === 'INPUT') {
        registerForm.children[i].addEventListener('blur', validateInput)
    }
}

class User {
    constructor(email, name, surname, password) {
        this.email      = email;
        this.name       = name;
        this.surname    = surname;
        this.password   = password;
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
        localStorage.clear()
        localStorage.user = JSON.stringify(user);

        window.location.href = "file:///home/devico/Projects/countries/components/country/index.html"
        event.preventDefault()
        return false
    } else {
        hideErrorAll(user, elem);
        showError(result);
        event.preventDefault()
        return false;
    }
}

function validateInput(ev){
    let input = ev.target || ev;

    if (input){
        let value = input.value,
            name  = input.name;
 
        try {
            if (name === 'email') {
                let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regExpEmail.test(value)) {
                    throw({name: '*Email is not valid', elem: input})
                } 
            }
            if (input.type === 'text') {
                if (value.length < 1) {
                    throw ({ name: '*This field is require ', elem: input})
                } 
            }
            if (input.type === 'password') {
                if(value.length < 6){
                    throw ({ name: '*Password must be 6 or more characters', elem: input})
                } 
                if (registerForm.dblpassword.value !== input.value) {
                    debugger
                    registerForm.dblpassword.style.border = '2px solid red';
                    
                    throw ({ name: '*Passwords do not match', elem: registerForm.dblpassword })
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
                    return result
                }            
        }        
    }
    if (form.password.value !== form.dblpassword.value){
        form.dblpassword.style.border = '2px solid red';
        return { name: '*Passwords do not match', elem: form.dblpassword}        
    }
    return result
}

function showError(error) {
    let box = document.getElementById('error-conteiner'),
        position = getCoords(error.elem);
    console.log(position)
    box.className = 'error-box';
    box.textContent = error.name;
    box.style.backgroundColor = '#f5aca6';
    box.style.top = position.top;
    box.style.left = position.left;

    box.style.display = 'block';
    error.elem.style.border = '2px solid red';
    removeError(box);
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function removeError(box){
    setTimeout(() => {
        box.style.display = 'none';
    }, 2000);
}

function hideErrorAll(user, elem) {
    elem['dblpassword'].style.border = '1px solid black';
    for (let key in user) {
        elem[key].style.border = '1px solid black';
    }
}
function validateUser(event) {
    let usersHash = [];
    usersHash.push(JSON.parse(localStorage.user));

    for (let i = 0; i < usersHash.length; i++) {
        if (usersHash[i].email === event.target.email.value) {
            event.target.email.style.border = '2px solid green';
            if (usersHash[i].password === event.target.password.value) {
                window.location.href = "file:///home/devico/Projects/countries/components/country/index.html"
                event.preventDefault()
                return true
            } else {
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