const connection = require( '../utilities/connections' )

const cancelDb = {}

cancelDb.cancelBooking = ( bookingId ) => {
  return connection.getBookingsCollection().then( ( book ) => {
    return book.findOne( { bookingId: bookingId } ).then( ( data ) => {
      return connection.getUserCollection().then( ( userData ) => {
        return userData.updateOne( { userId: data.userId }, { $pull: { bookings: bookingId } } ).then( status => {
          if( status.nModified === 1 ) {
            if( ( data.destId ).includes( 'H' ) ) {
              return connection.getHotDealsCollection().then( ( destination ) => {
                return destination.updateOne( { destinationId: data.destId }, { $inc: { availability: data.noOfPersons } } ).then( ( info ) => {
                  if( info.nModified === 1 ) {
                    return book.deleteOne( { bookingId: bookingId } ).then( ( data ) => {
                      return data
                    } )
                  } else{ return null }
                } )
              } )
            } else{
              return connection.getDestinationsCollection().then( ( destination ) => {
                return destination.updateOne( { destinationId: data.destId }, { $inc: { availability: data.noOfPersons } } ).then( ( info ) => {
                  if( info.nModified === 1 ) {
                    return book.deleteOne( { bookingId: bookingId } ).then( ( data ) => {
                      return data
                    } )
                  } else{ return null }
                } )
              } )
            }
          } else return null
        } )
      } )
    } )
  } )
}

module.exports = cancelDb
