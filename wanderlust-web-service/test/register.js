const { clearScreenDown } = require("readline")
//register2
const userservice = require("../src/model/setupUser")
let user1 = {
    name:"abc",
    contactNo: 9098765432,
    password: "Abc@1234" ,
    emailId:"abc@gmail.com"
    
}

let nameValidation = (value) => {
    nameRegex= /^[A-z]+([\s A-z])*$/
    if (value.match(nameRegex)) {
        return 'name is valid'
    } else {
        throw new Error("name is not valid")
    }
}


let passwordValidation = (value) => {
    passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/
    if (value.match(passwordRegex)) {
        return 'password is valid'
    } else {
        throw new Error("password is not valid")
    }
}

module.exports = { user1,nameValidation, passwordValidation };


