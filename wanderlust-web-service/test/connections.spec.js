let { expect } = require('chai');
const { model } = require('mongoose');
const connnection=require('../src/utilities/connections')
describe('Test Suite for connection', () => {

    
    it('connection check for user collection',()=>{
        connnection.getUserCollection().then((data)=>{
            expect(data).to.throw('Could not connect to Database')
        })
    })
    it('connection check for user collection',()=>{
        connnection.getUserCollection().then((data)=>{
            expect(500).to.equal(data.status)
        })
    })
    it('connection check for booking collection',()=>{
        connnection.getBookingsCollection().then((data)=>{
            expect(500).to.equal(data.status)
        })
    })
    it('connection check for booking collection',()=>{
        connnection.getBookingsCollection().then((data)=>{
            expect(data).to.throw('Could not connect to Database')
        })
    })
    it('connection check for booking collection',()=>{
        connnection.getHotDealsCollection().then((data)=>{
            expect(500).to.equal(data.status)
        })
    })
    it('connection check for booking collection',()=>{
        connnection.getHotDealsCollection().then((data)=>{
            expect(data).to.throw('Could not connect to Database')
        })
    })
    it('connection check for booking collection',()=>{
        connnection.getDestinationsCollection().then((data)=>{
            expect(500).to.equal(data.status)
        })
    })
    it('connection check for booking collection',()=>{
        connnection.getDestinationsCollection().then((data)=>{
            expect(data).to.throw('Could not connect to Database')
        })
    })
       
})
