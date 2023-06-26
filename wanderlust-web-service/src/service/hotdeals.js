const hotDealsDb = require( '../model/hotdeals' )
const hotDeals = {}

hotDeals.getHotDeals = () => {
  return hotDealsDb.getHotDeals().then( ( data ) => {
   
    if( data.length>0 ) {
      return data
     
    } else{
      let err = new Error( 'Sorry no hot deals available at this moment' )
      err.status = 404
      throw err
      
    }
  } )
}

module.exports = hotDeals;
//changes