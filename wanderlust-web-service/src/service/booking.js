const destinationDb = require( '../model/booking' )
const hotdealsDb = require( '../model/hotdeals' )
const destinationService = {}



// get destination
destinationService.getDestination = ( destinationId ) => {
    if( destinationId.includes( 'H' ) ) {
        return hotdealsDb.getHotDeals( destinationId ).then( ( data ) => {
          
            if( data == null && data.length != 0 ) {
                let err = new Error( "Cannot Fetch" )
                err.status = 404
                throw err
            }
            else return data;
        } );

    }
    else{
        return destinationDb.getDestination( destinationId ).then( ( data ) => {
          
            if( data == null && data.length != 0 ) {
                let err = new Error( "Cannot Fetch" )
                err.status = 404
                throw err
            }
            else return data;
        } );
    }
}

// booking
destinationService.book = ( userId, destId, booking ) => {
  if( destId.includes( 'H' ) ) {
    return hotdealsDb.bookHotDeals( userId, destId, booking ).then( ( data ) => {
      if( data === null && data.length < 0 ) {
        const err = new Error( 'Sorry Unable to Book' )
        err.status = 404
        throw err
      } else return data
    } )
  } else{
    return destinationDb.book( userId, destId, booking ).then( ( data ) => {
      if( data === null && data.length !== 0 ) {
        const err = new Error( 'Sorry Unable to Book' )
        err.status = 404
        throw err
      } else return data
    } )
  }
}


// get dates
destinationService.getdates = ( userId ) => {
  return destinationDb.getdates( userId ).then( ( data ) => {
    return data
  } )
}

module.exports = destinationService
