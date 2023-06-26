const connection = require( "../utilities/connections" )

const searchDb = {}

searchDb.searchDestination= ( dest ) => {
    return connection.getDestinationsCollection().then( ( collection ) => {
        return collection.find( { $or: [{ "continent": dest }, { "name": { $regex: '.*' + dest + '.*' } }] },{_id: 0} ).then( ( destData ) => {
            if( destData && destData.length>0 ) {
                return( destData );
            }
            else return null;
        } )
    } )
}




 
module.exports = searchDb;
