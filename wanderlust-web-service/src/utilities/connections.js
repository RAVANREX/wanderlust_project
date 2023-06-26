const{ Schema } = require( 'mongoose' )
const Mongoose = require( 'mongoose' )
Mongoose.Promise = global.Promise
const url = 'mongodb://localhost:27017/Wanderlust_DB'

const userSchema = Schema( {
  name: String,
  userId: String,
  emailId: String,
  contactNo: Number,
  password: String,
  bookings: [String]
}, { collection: 'Users' } )

const bookingsSchema = Schema( {
  destinationName: String,
  bookingId: String,
  userId: String,
  destId: String,
  cdestinationName: String,
  checkInDate: Date,
  checkOutDate: Date,
  noOfPersons: Number,
  totalCharges: Number,
  timeStamp: Date

}, { collection: 'Bookings' } )

const destinationsSchema = Schema( {
  destinationId: String,
  continent: String,
  imageUrl: String,
  name: String,
  details: {
    about: String,
    itinerary: {
      dayWiseDetails: {
        firstDay: String,
        restDaysSightSeeing: [String],
        lastDay: String

      },
      packageInclusions: [String],
      tourHighlights: [String],
      tourPace: [String]

    }
  },
  noOfNights: Number,
  flightCharges: Number,
  chargesPerPerson: Number,
  discount: Number,
  availability: Number

}, { collection: 'Destinations' } )

const hotDealsSchema = Schema( {
  destinationId: String,
  continent: String,
  imageUrl: String,
  name: String,
  details: {
    about: String,
    itinerary: {
      dayWiseDetails: {
        firstDay: String,
        restDaysSightSeeing: [String],
        lastDay: String

      },
      packageInclusions: [String],
      tourHighlights: [String],
      tourPace: [String]

    }
  },
  noOfNights: Number,
  flightCharges: Number,
  chargesPerPerson: Number,
  discount: Number,
  availability: Number

}, { collection: 'HotDeals' } )

const collection = {}

collection.getUserCollection = () => {
  return Mongoose.connect( url, { useNewUrlParser: true } ).then( ( database ) => {
    return database.model( 'Users', userSchema )
  } ).catch( ( error ) => {
    error = new Error( 'Could not connect to Database' )
    
    error.status = 500
    throw error
  } )
}
collection.getBookingsCollection = () => {
  return Mongoose.connect( url, { useNewUrlParser: true } ,{ useUnifiedTopology: true }).then( ( database ) => {
    return database.model( 'Bookings', bookingsSchema )
  } ).catch( ( error ) => {
    error = new Error( 'Could not connect to Database' )
    error.status = 500
    throw error
  } )
}
collection.getHotDealsCollection = () => {
  return Mongoose.connect( url, { useNewUrlParser: true } ).then( ( database ) => {
    return database.model( 'HotDeals', hotDealsSchema )
  } ).catch( ( error ) => {
    error = new Error( 'Could not connect to Database' )
    error.status = 500
    throw error
  } )
}
collection.getDestinationsCollection = () => {
  return Mongoose.connect( url, { useNewUrlParser: true } ).then( ( database ) => {
    return database.model( 'Destinations', destinationsSchema )
  } ).catch( ( error ) => {
    error = new Error( 'Could not connect to Database' )
    error.status = 500
    throw error
  } )
}
module.exports = collection
