import React, { Component } from'react';
import'./App.css';
import{ BrowserRouter as Router, Route, Switch, Link, Redirect } from"react-router-dom";
//import {Button} from 'primereact/button';
//import {Dialog} from 'primereact/dialog';
import Booking from'./components/booking'
import Login from'./components/login';
import Home from'./components/home';
import Register from'./components/register';
import{Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from'@material-ui/core'
import Packages from'./components/Packages';

import ViewBookings from'./components/ViewBooking';

class App extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
        dialogBox: false,
        loggedOut: false,
        loginuserId: sessionStorage.getItem( 'userId' ),
        loginuserName: sessionStorage.getItem( 'name' )
    };
}

onClick= ( event ) => {
  this.setState( { dialogBox: true} );
}

onHide= ( event ) => {
  this.setState( {dialogBox: false} );
}


logOut = () => {
  this.setState( {dialogBox: false} )
  sessionStorage.clear();
  this.setState( { loggedOut: true } );
  window.location.reload();

};

confirmLogout = () => {
  this.setState( { dialogBox: true } );
};



  render () {
    

    return(
      <div>
        <Router>
          <div className="App">
            {this.state.loggedOut ? <Redirect to="/home" /> :null}
            
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Start Wandering</Link>
                    </div>

                    
                        <ul className="navbar-nav ml-auto">
                          {this.state.loginuserId ? <li className="nav-item">
                          <Link className="nav-link" to="">Welcome {this.state.loginuserName}</Link>
                          </li>: null}

                            <li className="nav-item">
                                <Link className="nav-link" to="/packages">Hot Deals </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/viewBookings">Planned Trips</Link>
                            </li>
                            {!this.state.loginuserId ?
                               <li className="nav-item">
                                 <Link className="nav-link" to="/login"> Login</Link>
                                 </li>: null}
                                 {this.state.loginuserId ?
                                  <li className="nav-item">  
                                  <button className="nav-link btn" onClick={this.confirmLogout}>Logout</button>
                                  </li>:null}
                                  </ul>
                    
                </nav>
                           
                           <div>
                           <Dialog size="lg" open={this.state.dialogBox} onClose={this.onHide}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'>
               
                  <DialogTitle id='alert-dialog-title'>{ 'Confirmation'}</DialogTitle>
              
  
                <DialogContent>
                <DialogContentText id='alert-dialog-description'>
               <span className='text-danger display-5'style={{fontFamily: "Courier New"}}><b> Are you sure you want to logout?</b> </span>
                  </DialogContentText>
                </DialogContent>
  
              <DialogActions>
                  <Button type='submit' color='primary' variant="contained" onClick={this.onHide}> CONTINUE EXPLORING</Button>&nbsp;
                  <Button type='submit'  variant="contained" onClick={this.logOut}> LOGOUT</Button>
                  
              </DialogActions>
          </Dialog>
          </div>
  

         
            <Switch>
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/home/:userId" component={Home}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/packages" component={()=><Packages hotdeals="true"/>}></Route>{/* Only HotDeals */}
              <Route exact path="/packages/:continent" component={()=><Packages hotdeals="false"/>}></Route>{/* Destinations with search */}
              <Route exact path="/book/:destId" component={Booking}></Route>
              <Route exact path="/viewBookings" component={ViewBookings}></Route>
              <Route path='/' render={()=><Redirect to='/home'/>}></Route>
            </Switch>

          </div>
        </Router>
        <footer className="bg-black text-center text-white-50" id='footer'>
          Copyright &copy; www.eta.wanderlust.com 2018
    </footer>
      </div>
    );
  }
}

export default App;
