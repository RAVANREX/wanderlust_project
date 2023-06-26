import React, { Component}  from'react';
import{Link} from'react-router-dom';
import axios from'axios'
import{ backendUrlUser,backendUrlBooking} from'../BackendURL'
import{Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from'@material-ui/core'

    class ViewBookings extends Component {

      constructor () {
          super();
          this.state = {
              viewBookingsUrl: backendUrlUser+ "/getBookings/" + sessionStorage.getItem( "userId" ),
              deleteBookingsUrl: backendUrlBooking + "/cancelBooking/",
              successMessage: "",
              errorMessage: "",
             dialogBox: false,
              singleBooking: {},
              viewbookings: []
              
          
          }
      }
       
      windowReload=()=>{
          window.location.reload();
         
      }
     
      componentDidMount=()=>{
         
          this.setState( {errorMessage: ""} )
        axios.get( this.state.viewBookingsUrl )
        .then( response=>{
         
          this.setState( {viewbookings: response.data} )
  
        } )
        .catch( error => {
  
          if( error.response ) {
            this.setState( { errorMessage: error.response.data.message } )
          }
          else{
            this.setState( { errorMessage: "Server Down" } )
  
          }
        } )
      
      }
      handleClose=()=>{
       
          this.setState( {dialogBox: false} )
      }
      handleShow=( booking )=>{
          this.setState( {singleBooking: booking} )
          this.setState( {dialogBox: true} )
      }
  
      confirmCancellation=( booking )=>{
          this.setState( {successMessage: ""} )
          var deleteUrl=this.state.deleteBookingsUrl+booking.bookingId
        
          axios.delete( deleteUrl )
          .then( response=>{
         
            this.setState( {successMessage: response.data.message} )
    
          } )
          .catch( error=>{
              
            if( error.response ){
              this.setState( {errorMessage: error.response.data.message} )
            }
            else{
              this.setState( {errorMessage: "Server Down"} )
              
            }
          } )
          
          this.handleClose();
          this.windowReload(); 
      }
  
      render (){
  
           if( this.state.errorMessage ){
              return( <div className='card bg-light text-dark '><div className='card-body text-left '>
              <div className='offset-2'>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <h2>{this.state.errorMessage}</h2><br/>
            <Link className="btn btn-success" to="/">CLICK HERE TO START THE BOOKING</Link>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            </div>
            </div>
              )
          }
          return( <div>
                      <br/>
          {this.state.viewbookings.map( ( booking,key ) => (
          <div key={booking.bookingId}>
                                      
              <div className="row">
  
                  <div className="col-6 offset-3">
                      <br/>
                      <div className="card border border-dark" >
                          <div className="card-header bg-dark text-white ">
                              <h4>Booking ID : {booking.bookingId}</h4>
  
                          </div>
                          <div className="card-body " style={{backgroundColor: '#BCC6CC'}}>
                              <h3>{booking.destinationName}</h3>
                              <h6>Trip Starts on: {new Date( booking.checkInDate ).toDateString()}</h6>
                              <h6>Trip ends on:{new Date( booking.checkOutDate ).toDateString()} </h6>
                              <h6>Travellers:{booking.noOfPersons} </h6>
                              <h6>Fare Details: 
                                $ {Math.round( booking.totalCharges )}</h6>
                                  
                      
                        <Button color="primary" variant="contained" value={booking.bookingId} onClick={() => { this.handleShow( booking ) }}>Claim Refund</Button>
                      
                   
                  
                          </div>
                              <div>
                                
                                </div>
                </div>
              </div>
            </div>
            <div >
              <Dialog size="lg" open={this.state.dialogBox} onClose={this.handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'>
               
                  <DialogTitle id='alert-dialog-title'>{ 'Confirm Cancellation'}</DialogTitle>
              
  
                <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  <div className="text-danger" style={{fontFamily: "Courier New", fontWeight: "bold"}} > Are you sure you want to cancel trip to {this.state.singleBooking.destinationName}</div>
                  <div> <b>Trip start date : {new Date( this.state.singleBooking.checkInDate ).toDateString()}</b><br />
                  <b>  Trip end date   : {new Date( this.state.singleBooking.checkOutDate ).toDateString()}</b><br />
                  <b>  Refund Amount : $ {Math.round( this.state.singleBooking.totalCharges )}</b>
                  </div>
                  </DialogContentText>
                </DialogContent>
  
              <DialogActions>
                  <Button variant="outlined " className='btn btn-danger' color="secondary" onClick={this.handleClose}> Close</Button>&nbsp;
                <div>
                
                  <Button color="primary" variant="contained" onClick={()=>{this.confirmCancellation( this.state.singleBooking )  } 
                  
                  }> Confirm Cancellation</Button>
                    
                 </div>
              </DialogActions>
          </Dialog>
          </div>
          </div>
        ) )}
      </div>
      )
    }
  }
  export default ViewBookings