let { expect } = require('chai');
const { model } = require('mongoose');
const setupUser=require('../src/model/setupUser')
describe('Test Suite for setupUser', () => {

    
    it('db setup is successful',()=>{
        setupUser.setupDb().then((data)=>{
            expect(data).to.equal('Insertion Successful')
        })
    })
    it('db setup is not successful',()=>{
        setupUser.setupDb().then((data)=>{
            expect('Insertion failed').to.throw(('Insertion failed'))
        })
    })
       
})
