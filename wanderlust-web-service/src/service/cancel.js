const cancelDb = require( '../model/cancel' )

const cancelservice = {}

cancelservice.cancelBooking = ( bookingId ) => {
  return cancelDb.cancelBooking( bookingId ).then( ( data ) => {
    if( data == null && data.length < 0 ) {
      const err = new Error( 'Sorry unable to cancel' )
      err.status = 404
      throw err
    } else return data
  } )
}

module.exports = cancelservice
