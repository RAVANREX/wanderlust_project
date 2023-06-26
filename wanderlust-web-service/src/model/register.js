const UserDetails = require( './beanClasses/users' )
const connection = require( '../utilities/connections' )

const registerUsersDB = {}
registerUsersDB.generateId = () => {
  return connection.getUserCollection().then( ( register ) => {
    return register.distinct( 'userId' ).then( ( ids ) => {
     let arr = []
     for( let ar of ids ) {
      arr.push( ar.substr( 1 ) )
     
     }
     let id = Math.max( ...arr )
     id=id+1
    
     return"U"+( id )

      
    } )
  } )
}
registerUsersDB.register = ( details ) => {
  return connection.getUserCollection().then( ( collection ) => {
    return registerUsersDB.generateId().then( ( newUserId ) => {
      details.userId = newUserId
      
      return collection.insertMany( [details] ).then( ( data ) => {
        if( data.length != 0 ) {
          return new UserDetails( details )
        } else{
          return null
        }
      } )
    } )
  } )
}

module.exports = registerUsersDB
