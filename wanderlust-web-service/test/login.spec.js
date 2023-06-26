let { expect } = require('chai');
//test cases for 
const { passwordValidation, contactValidation } = require('./login');
const userLogin=require('../src/model/userslogin')
const userLogin1=require('../src/service/userslogin')
describe('Test Suite for Login', () => {
    
    const {
        user
    } = require('../test/login')
    it('Test case to check name property', () => {
        expect(user).to.have.property('contactNo');
    })
    it('Test case to check type of name property', () => {
        expect(user).to.have.property('contactNo').to.be.a('number');
    })
   
    it('Test case to check value of password property', () => {
        expect(user).to.have.property('password').to.equal('Abc@1234');
    })
    it('Test case to check validity of password', () => {
        expect(passwordValidation(user.password)).to.equal('password is valid');
    })
    it('Test case to check validity of number', () => {
        expect(contactValidation(user.contactNo)).to.equal('number valid');
    })
    const {
        user2
    } = require('../test/login')
    it('Test case to check value of password property', () => {
        expect(user2).to.have.property('password').to.equal('Def@1234');
    })
    it('Test case to check validity of password', () => {
        expect(passwordValidation(user2.password)).to.equal('password is valid');
    })
})

describe('checking for user availability',()=>{
    it('user status',()=>{
       userLogin.checkUser(9098765432).then((data)=>{
            expect(data).not.to.equal(null)
        })
    })
    it('user available for entered contact no',()=>{
        userLogin.checkUser(9178765432).then((data)=>{
             expect(data).to.equal(null)
         })
     })
        it('check for password ',()=>{
            userLogin.getPassword('Abc@1234').then((data)=>{
                expect('Abc@1234').to.equal(data[0].password)
            })
        
    })
    it('check for password ',()=>{
        userLogin.getPassword('Abc@1234').then((data)=>{
            expect(2).to.equal(data.length)
        })
    
})
it('check for password ',()=>{
    userLogin.getPassword('Abc@1234').then((data)=>{
        if(data.length!=0){
            let res=data[0].password
        }
        expect('Abc@1234').to.equal(res)
    })

})
    it('check for password ',()=>{
        userLogin.getPassword('abc@1234').then((data)=>{
            expect(data).to.equal(null)
        })
    
})


describe('checking for service user ',()=>{
    it('user status',()=>{
       userLogin1.login(9098765432,'Abc@1234').then((data)=>{
            expect(data).not.to.equal(null)
        })
    })
    it('user status',()=>{
        userLogin1.login(9178765432,'abc@1234').then((data)=>{
             expect(404).to.equal(data.status)
         })
     })
     it('user status',()=>{
        userLogin1.login(6234567890,'Abc@1234').then((data)=>{
             expect(406).to.equal(data.status)
         })
     })
        
})
   


})