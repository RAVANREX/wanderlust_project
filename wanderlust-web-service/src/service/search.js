
const searchDb = require( '../model/search' )

const destinationService = {}

destinationService.searchDestination = ( continent ) => {
  return searchDb.searchDestination( continent ).then( ( destData ) => {
    if( destData.length>0 ) {
      return destData
     
    } else{
      let err = new Error( "Sorry we did not book for this destination" )
      err.status = 404
      throw err
      
    }
  } )
}

module.exports = destinationService


