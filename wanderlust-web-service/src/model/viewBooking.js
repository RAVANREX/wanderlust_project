const connection = require( '../utilities/connections' )

const bookingsDb = {}

bookingsDb.findBooking = ( userId ) => {
  return connection.getBookingsCollection().then( ( model ) => {
    return model.find( { userId: userId }, { _id: 0 } ).then( ( data ) => {
      if( data && data.length > 0 ) {
        return data
      } else{ return null }
    } )
  } )
}

module.exports = bookingsDb
