const bookingsDb = require( '../model/viewBooking' )

const bookings = {}

bookings.findBooking = ( userId ) => {
  return bookingsDb.findBooking( userId ).then( ( data ) => {
    if( data === null ) {
      const err = new Error( "Sorry you have not planned any trips with us yet!" )
      err.status = 404
      throw err
    } else{
      return data
    }
  } )
}

module.exports = bookings
