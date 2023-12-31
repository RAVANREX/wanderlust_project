const userDB = require( '../model/userslogin' );

const userService = {}

//login a user
userService.login = ( contactNo, userPassword ) => {
    return userDB.checkUser( contactNo ).then( ( user ) => {
        if( user == null ) {
            let err = new Error( "Enter registered contact number" )
            err.status = 404
            throw err
        }
        else{
            return userDB.getPassword( contactNo ).then( ( password ) => {
                if( password != userPassword ) {
                    let err = new Error( "Enter correct password" )
                    err.status = 406
                    throw err
                }
                else{
                    return user;
                }
            } )
        }
    } )
}

module.exports = userService
