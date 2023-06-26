let { expect } = require('chai');
//test cases for register
const {nameValidation ,passwordValidation} = require('./register')
describe('Test Suite for Register', () => {

    const {
        user1
    } = require('./register')

    it('Test case to check if name is not null', () => {
        expect(user1).to.have.property('name').to.not.be.null;
        it('Test case to check validity of incorrect name', () => {
            expect(()=>{nameValidation(user1.name)}).to.throw('name is not valid');
        })
    })
    it('Test case to check name property', () => {
        expect(user1).to.have.property('name').to.be.a('string');
    })
    it('Test case to match name format',()=>{
        expect(user1).to.have.property('name').to.match(/^[A-z]+([\s A-z])*$/);
    })
    it('Test case to check password format',()=>{
        expect(passwordValidation);
    })
  
    it ('Test case to check email format',()=>{
        expect(user1).to.have.property('emailId').to.match( /^[A-z][A-z0-9]*@[A-z]+.com$/)
    })
    it('Test case to check contact number property', () => {
        expect(user1).to.have.property('contactNo').to.be.a('number');
    })
    it ('Test case to check contact number format',()=>{
        expect(user1).to.have.property('contactNo').to.match( /^[7-9]{1}[0-9]{9}$/);
    })
    it('Test case to check if email is not null', () => {
        expect(user1).to.have.property('emailId').to.not.be.null;
    })
    it('Test case to check if password is not null', () => {
        expect(user1).to.have.property('password').to.not.be.null;
    })
    it('Test case to check if Contact Number is not null', () => {
        expect(user1).to.have.property('contactNo').to.not.be.null;
    })
    


})
