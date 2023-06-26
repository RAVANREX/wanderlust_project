
const connection = require( "../utilities/connections" );
let bookingDb = {}

bookingDb.getDestination = ( destinationId ) => {
    return connection.getDestinationsCollection().then( ( collection ) => {
        return collection.find( { destinationId: destinationId }, { _id: 0 } ).then( ( data ) => {
            if( data.length != 0 && data ) {
                return data
            } else{
                return null
            }

        } )
    } )

}

//generate booking id
bookingDb.generateId = () => {
    return connection.getBookingsCollection().then( ( register ) => {
        return register.distinct( "bookingId" ).then( ( ids ) => {

            let arr = []
     for( let ar of ids ) {
      arr.push( ar.substr( 1 ) )
     
     }
     let id = Math.max( ...arr )
     id=id+1
    
     return"B"+( id )
        } )
    } )
}


bookingDb.destname = ( destId ) => {
    return connection.getDestinationsCollection().then( ( collection ) => {
        return collection.findOne( { destinationId: destId }, { _id: 0, name: 1 } ).then( ( data ) => {


            if( data ) {

                return data["name"]
            } else{
                return null
            }
        } )
    } )


}
bookingDb.book = ( userId, destinationId, booking ) => {
    return connection.getBookingsCollection().then( ( collection ) => {
        return bookingDb.destname( destinationId ).then( ( data ) => {


            return bookingDb.generateId().then( ( newbookId ) => {



                booking.bookingId = newbookId;
                booking.destinationName = data;

                booking.timeStamp = new Date().getTime().toString();

                return collection.insertMany( [booking] ).then( ( data ) => {

                    if( data.length != 0 && data ) {


                        return bookingDb.bookuser( userId, newbookId ).then( ( data ) => {
                            if( data == true ) {
                                return bookingDb.updateAvail( destinationId, booking.noOfPersons ).then( ( data ) => {
                                    if( data == true ) {
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
bookingDb.bookuser = ( userId, bookingId ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.updateOne( { userId: userId }, { $push: { bookings: bookingId } } ).then( ( data ) => {

            if( data.nModified == 1 ) {
                return true
            } else{
                return false
            }
        } )
    } )


}

bookingDb.updateAvail = ( destId, noOfPerson ) => {
    return connection.getDestinationsCollection().then( ( collection ) => {
        return collection.updateOne( { destinationId: destId }, { $inc: { availability: -noOfPerson } } ).then( ( data ) => {

            if( data.nModified == 1 ) {
                return true
            } else{
                return false
            }
        } )
    } )


}

bookingDb.getdates = ( userId ) => {
    return connection.getBookingsCollection().then( ( collection ) => {
        return collection.find( { userId: userId }, { _id: 0, checkInDate: 1, checkOutDate: 1 } ).then( ( data ) => {

            if( data && data.length > 0 ) {
                return data
            }
            else null;
        } )

    } )
}

 module.exports = bookingDb