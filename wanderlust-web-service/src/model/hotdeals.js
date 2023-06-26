const connection = require( '../utilities/connections' )
const destinationDb = require( './booking' )

const hotDealsDb = {}

 hotDealsDb.getHotDeals = () => {
   return connection.getHotDealsCollection().then( ( model ) => {
     return model.find( {}, { _id: 0 } ).then( ( data ) => {
     
       if( data && data.length > 0 ){ 
           return data 
         } else{ 
             return null }
     } )
   } )
   
}
  hotDealsDb.bookHotDeals = ( userId, destinationId, booking ) => {
    return connection.getBookingsCollection().then( ( collection ) => {
      return hotDealsDb.hotdealsname( destinationId ).then( ( data ) => {
        return destinationDb.generateId().then( ( newbookId ) => {
          booking.bookingId = newbookId
          booking.destinationName = data
          booking.timeStamp = new Date().getTime().toString()

          return collection.insertMany( [booking] ).then( ( data ) => {
            if( data.length !== 0 && data ) {
              return destinationDb.bookuser( userId, newbookId ).then( ( data ) => {
                if( data === true ) {
                  return hotDealsDb.updateHotDealsAvail( destinationId, booking.noOfPersons ).then( ( data ) => {
                    if( data === true ) {
                      return true
                    }
                  } )
                }
              } )
            } else{
              return null
            }
          } )
        } )
      } )
    } )
  }

  hotDealsDb.hotdealsname = ( destId ) => {
    return connection.getHotDealsCollection().then( ( collection ) => {
      return collection.findOne( { destinationId: destId }, { _id: 0, name: 1 } ).then( ( data ) => {
        if( data ) {
          return data.name
        } else{
          return null
        }
      } )
    } )
  }
  hotDealsDb.updateHotDealsAvail = ( destId, noOfPerson ) => {
        return connection.getHotDealsCollection().then( ( collection ) => {
          return collection.updateOne( { destinationId: destId }, { $inc: { availability: -noOfPerson } } ).then( ( data ) => {
            if( data.isModified === 1 ) {
              return true
            } else{
              return false
            }
          } )
        } )
    }
      
    
module.exports = hotDealsDb


 