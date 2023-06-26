const express = require( 'express' );
const router = express.Router();
const setupUser = require( "../model/setupUser" )
const userservice = require( '../service/userslogin' )
const registerService = require( '../service/register' )
const hotDeals = require( "../service/hotdeals" )
const search = require( "../service/search" )
const bookingservice = require( '../service/booking' )
const bookings = require( "../service/viewBooking" );
const cancel=require( "../service/cancel" )

router.get( "/setup", ( req, res, next ) => {
    setupUser.setupDb().then( ( data )=>{
      res.send( data )    
    } ).catch( err=>next( err ) )} )
//router to login
router.post( '/login', function ( req, res, next ) {
    let contactNo = req.body.contactNo;
    let password = req.body.password;
    userservice.login( parseInt( contactNo ), password ).then( function ( userDetails ) {
        res.json( userDetails );
          } ).catch( error => next( error ) );

} )

//register
router.post( '/register', function ( req, res, next ) {
  let registerUser = req.body;
  registerUser.contactNo = parseInt( registerUser.contactNo );
  registerService.register( registerUser ).then( () => {
      res.json( { "message": "Successfully Registered!!" } );

  } ).catch( err => next( err ) );
} )

//destination get
router.get( '/getDetails/:destinationId', function ( req, res, next ) {
  const destinationId = req.params.destinationId;
  bookingservice.getDestination( destinationId ).then( ( details ) => {
      res.json( details );

  } ).catch( err => next( err ) );
} )

// post bookings
router.post( '/:userId/:destinationId', function ( req, res, next ) {
  const userId = req.params.userId
  const destinationId = req.params.destinationId
  const booking = req.body
  bookingservice.book( userId, destinationId, booking ).then( () => {
    res.json( { message: 'Booking Confirmed!!' } )
  } ).catch( err => next( err ) )
} )

// hotdeals
router.get( '/hotDeals', ( req, res, next ) => {
hotDeals.getHotDeals().then( ( data ) => {
  res.json( data )
} ).catch( ( err ) => next( err ) )
} )

// search
router.get( '/destination/:destinations', ( req, res, next ) => {
const continent = req.params.destinations

search.searchDestination( continent ).then( ( data ) => {
  res.json( data )
} ).catch( ( err ) => next( err ) )
} )

// getbookings
router.get( '/getBookings/:userId', ( req, res, next ) => {
  const userId = req.params.userId
  bookings.findBooking( userId ).then( ( data ) => {
    res.send( data )
  } ).catch( ( err ) => next( err ) )
} )

//cancelbooking
router.delete( '/cancelBooking/:bookingId', ( req, res, next ) => {
  const bookingId = req.params.bookingId
  cancel.cancelBooking( bookingId ).then( () => {
    res.json( { message: 'Successfully deleted the booking with id ' + bookingId } )
  } ).catch( ( err ) => next( err ) )
} )

//get dates
router.get( '/date/:userId', ( req, res, next ) => {
  const userId = req.params.userId
  bookingservice.getdates( userId ).then( ( data ) => {
    res.json( data )
  } )
    .catch( ( err ) => next( err ) )
} )

module.exports = router
