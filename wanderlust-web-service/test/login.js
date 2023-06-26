const userservice = require("../src/service/userslogin")
//login2
let user = {
    contactNo: 9098765432,
    password: "Abc@1234" 
    
}
let user2 = {
    contactNo: 9098765562,
    password: "Def@1234" 
    
}

let contactValidation = (value) => {
    if (value.toString().length==10) {
        return 'number valid'
    } else {
        throw new Error("number not valid")
    }
    
}
let passwordValidation = (value) => {
    passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/
    if (value.match(passwordRegex)) {
        return 'password is valid'
    } else {
        throw new Error("password is not valid")
    }
}
module.exports = { user, user2, contactValidation,passwordValidation };
