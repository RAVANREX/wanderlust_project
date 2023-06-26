const registerUsersDB = require( '../model/register' )
const usersDB = require( '../model/userslogin' )


const registerService = {}

registerService.register = ( registerUser ) => {

  return usersDB.checkUser( registerUser.contactNo ).then( ( user ) => {
    if( user != null ) {
      let err = new Error( 'User Already Exists ' )
      err.status = 404
      throw err
    } else{
      return registerUsersDB.register( registerUser ).then( ( data ) => {
        if( data == null ) {
          let err = new Error( 'Registration failed!Please try again' )
          err.status = 406
          throw err
        }
      } )
    }
  } )
}

module.exports = registerService
