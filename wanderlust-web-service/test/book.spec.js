let { expect } = require('chai');
const { model } = require('mongoose');
const bookingModel=require('../src/model/booking')
let booking={
    bookingId:'B1001',
    destinationName:'A Week in Greece: Athens, Mykonos & Santorini',
    timeStamp:''
}
describe('Test Suite for booking', () => {

    const {
        user1
    } = require('../test/book')
    it('Test case to check Number of travellers', () => {
        expect(user1).to.have.property('NoOfTravellers').to.be.above(2);
    })
    it('Test case to check Number of travellers', () => {
        expect(user1).to.have.property('NoOfTravellers').to.be.below(4);
    })
    
    it('Test case to check number of travellers ', () => {
        expect(user1).to.have.property('NoOfTravellers').to.be.a('number');
    })
    
    it('Test case to check number of travellers ', () => {
        expect(user1).to.have.property('NoOfTravellers').to.be.equal(3);
    })
   
  
    const {
        user2
    } = require('../test/book')
    it('Test case to check Number of travellers', () => {
        expect(user2).to.have.property('NoOfTravellers').to.be.above(1);
    })
    it('Test case to check Number of travellers', () => {
        expect(user2).to.have.property('NoOfTravellers').to.be.below(5);
    })
    
    it('Test case to check number of travellers ', () => {
        expect(user2).to.have.property('NoOfTravellers').to.be.a('number');
    })
    it('Test case to check number of travellers ', () => {
        expect(user2).to.have.property('NoOfTravellers').to.be.equal(2);
    })

   
})

describe('checking booking with correct user',()=>{
    it('getting user id and booking id',()=>{
        bookingModel.bookuser('U1001',"B1001").then((data)=>{
            expect(data).toBeTruthy()
        })
    })
    it('getting user id and booking id',()=>{
        bookingModel.bookuser('U1002',"B1001").then((data)=>{
            expect(data).toBeFalsy()
        })
    })
        it('check for destination name',()=>{
            bookingModel.destname('D1010').then((data)=>{
                expect(data).to.equal('Singapore & Malaysia: A Journey through Southeast Asia')
            })
        
    })
    it('check for destination name',()=>{
        bookingModel.destname('D1011').then((data)=>{
            expect(data).to.be.null
        })
    
})
    it('get data by destination id',()=>{
        bookingModel.getDestination('D1009').then((data)=>{
            expect(data).not.to.equal(null)
        })
    
})
it('get data by destination id',()=>{
    bookingModel.getDestination('D1011').then((data)=>{
        expect(null).to.equal(data)
    })

})
it('check for availability',()=>{
    bookingModel.updateAvail('D1001',3).then((data)=>{
        expect(data).toBeTruthy()
    })

})
it('check for checkin and checkout date of given userid',()=>{
    bookingModel.getdates('U1001').then((data)=>{
        expect(data).not.to.equal(null)
    })

})
it('check for checkin and checkout date of given userid is not available',()=>{
    bookingModel.getdates('U1005').then((data)=>{
        expect(data).to.equal(null)
    })

})
it('check for given user id  booking id is not available',()=>{
    bookingModel.bookuser('U1001',"B1003").then((data)=>{
        expect(data).toBeFalsy()
    })
})
it('check for destination is not available',()=>{
    bookingModel.updateAvail('D1011',3).then((data)=>{
        expect(data).toBeFalsy()
    })

})
it('check for destination is not available',()=>{
    bookingModel.updateAvail('D1012',6).then((data)=>{
        expect(data).toBeFalsy()
    })

})
it('check for booking',()=>{
    bookingModel.book('U1001','D1001',booking).then((data)=>{
        expect(data).not.to.equal(null)
    })

})

})