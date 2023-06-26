import axios from'axios';
import React, { Component } from"react";
import{ backendUrlBooking } from"../BackendURL";
import{ Link } from'react-router-dom';
import{ Collapse } from'react-bootstrap';

import Switch from'@material-ui/core/Switch';


class Booking extends Component {
    constructor ( props ) {
        super( props );
        const destId = props.match.params.destId;
        const destinationURL = 'http://localhost:4000/book/getDetails'
        this.state = {
            formValue: {
                noOfPersons: "",
                flight: false,
                user: { "userId": sessionStorage.getItem( "userId" ) },
                destination: { "destinationId": destId },
                checkInDate: ""
            },
            formErrorMessage: {
                checkInDate: "",
                noOfPersons: "",
                user: ""
            },
            formValid: {
                checkInDate: false,
                noOfPersons: false,
                user: false,
                buttonActive: false,
            },
            booking: {
                checkInDate: "",
                checkOutDate: "",
                noOfPersons: "",
                totalCharges: "",
                userId: "",
                destId: ""
            },
            errorMessage: "",
            successMessage: "",
            visibility: true,
            destURL: destinationURL,
            destinationDetails: {},
            details: {},
            packageInclusion: [],
            restOfDays: [],
            firstDay: "",
            lastDay: "",
            itinerary: {},
            destErrorMessage: "",
            checkOutDate: "",
            totalCharges: "",
            collapse1: false,
            collapse2: false,
            collapse3: false,
            arraydates: []

        };

    }

    componentDidMount = () => {
        this.validateField( "user", this.state.formValue.user.userId );
        const desturl = axios.get( this.state.destURL + '/' + this.state.formValue.destination.destinationId )
        const datesurl = axios.get( "http://localhost:4000/book/date/" + this.state.formValue.user.userId )
        axios.all( [desturl, datesurl] ).then( axios.spread( ( ...responses ) => {
            const destresponse = responses[0]
           
            const datesresponse = responses[1]
           

            this.setState( { destinationDetails: destresponse.data[0] } )
            this.setState( { details: destresponse.data[0].details } )
            this.setState( { packageInclusion: destresponse.data[0].details.itinerary.packageInclusions } )
            this.setState( { itinerary: destresponse.data[0].details.itinerary } )
            this.setState( { restOfDays: destresponse.data[0].details.itinerary.dayWiseDetails.restDaysSightSeeing } )
            this.setState( { firstDay: destresponse.data[0].details.itinerary.dayWiseDetails.firstDay } )
            this.setState( { lastDay: destresponse.data[0].details.itinerary.dayWiseDetails.lastDay } )
            this.setState( { arraydates: datesresponse.data } )
        } ) ).catch( error => {
            if( error.response ) {
                this.setState( { errorMessage: "", successMessage: '' } )

            } else
                this.setState( { errorMessage: "", successMessage: '' } )
        } )





    }

    submitBooking = () => {

       
        const{ booking } = this.state;
        booking.checkInDate = new Date( this.state.formValue.checkInDate ).toISOString();
        booking.checkOutDate = new Date( this.state.checkOutDate ).toISOString();
        booking.noOfPersons = Number( this.state.formValue.noOfPersons )
        booking.totalCharges = this.state.totalCharges;
        booking.destId = this.state.formValue.destination.destinationId;
     
        booking.userId = sessionStorage.getItem( "userId" );
     


        axios.post( backendUrlBooking + "/" + booking.userId + "/" + booking.destId, booking )
            .then( ( response ) => {
               

                this.setState( { successMessage: response.data.message, visibility: false, errorMessage: '' } )
            } ).catch( ( error ) => {
                if( error.response ) {
                    this.setState( { errorMessage: error.response.data.message, successMessage: '' } )

                } else
                    this.setState( { errorMessage: error.message + "Server Down", successMessage: '' } )
            } )

    }

    handleSubmit = ( event ) => {
        event.preventDefault()
        const arraydates = this.state.arraydates

        if( arraydates && arraydates.length > 0 ) {
            
            var flag = 0;
            const checkin = new Date( this.state.formValue.checkInDate )
            const checkout = new Date( this.state.checkOutDate )
            for( let i = 0; i < arraydates.length; i++ ) {
                arraydates[i].checkInDate = new Date( arraydates[i].checkInDate );
                arraydates[i].checkOutDate = new Date( arraydates[i].checkOutDate )
                if( ( ( checkin >= arraydates[i].checkInDate ) && ( checkin < arraydates[i].checkOutDate ) ) || ( ( checkout > arraydates[i].checkInDate ) && ( checkout <= arraydates[i].checkOutDate ) ) ) {
                    flag = 1
                    this.setState( { errorMessage: "Sorry!You have already booked a package for this duration" } )
                    setTimeout( ()=>this.setState( { errorMessage: "" } ),3000 )

                }

            }
            if( flag !== 1 ) {

                this.submitBooking()

            }
            else{ 
                this.setState( { errorMessage: "Sorry!You have already booked a package for this duration" } )
                setTimeout( ()=>this.setState( { errorMessage: "" } ),3000 )
            }
        }
        else{
            this.submitBooking()
        }

    }


    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if( name === "checkInDate" && value !== "" ) {
            var date1 = new Date( value )

            var days = this.state.destinationDetails.noOfNights;
            date1.setDate( date1.getDate() + days )
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Noverber", "December"]
            var date2 = new Date( value )
            var date2mod = date2.getMonth()
            var checkInDate = months[date2mod] + " " + date2.getDate() + "," + date2.getFullYear()
            var mdate = date1.getMonth()
            var modate = months[mdate] + " " + date1.getDate() + ", " + date1.getFullYear()
            this.setState( { checkOutDate: modate, checkInDate: checkInDate } )
        }
        // dates



        if( name === "noOfPersons" && value > 0 && value < 6 && value !== "" ) {

            var tc = Number( ( this.state.destinationDetails.chargesPerPerson - ( this.state.destinationDetails.chargesPerPerson * this.state.destinationDetails.discount / 100 ) ) * value );
            this.setState( { totalCharges: tc } )

        }

        var formValue = this.state.formValue

        this.setState( { formValue: { ...formValue, [name]: value } } );
        this.validateField( name, value );
    };


    validateField = ( fieldName, value ) => {
        let fieldValidationErrors = this.state.formErrorMessage;
        let formValid = this.state.formValid;

        switch( fieldName ) {
            case"user":
                if( value === null ) {
                    fieldValidationErrors.user = "You need to Login for Booking";
                    formValid.user = false;
                } else{
                    fieldValidationErrors.user = "";
                    formValid.user = true;
                }
                break;
            case"checkInDate":
                if( value === "" ) {
                    fieldValidationErrors.checkInDate = "Field required";
                    formValid.checkInDate = false;
                } else if( new Date( value ) <= new Date() ) {
                    fieldValidationErrors.checkInDate = "Trip start date should be after today's date";
                    formValid.checkInDate = false;
                } else{
                    fieldValidationErrors.checkInDate = "";
                    formValid.checkInDate = true;
                }
                break;
            case"noOfPersons":
                if( value === "" ) {
                    fieldValidationErrors.noOfPersons = "Field required";
                    formValid.noOfPersons = false;
                }
                else if( value <= 0 || value > 5 ) {
                    fieldValidationErrors.noOfPersons = "No of travellers should be between 1 and 5";
                    formValid.noOfPersons = false;
                } else{
                    fieldValidationErrors.noOfPersons = "";
                    formValid.noOfPersons = true;
                }
                break;

            default:
                break;
        }

        formValid.buttonActive =
            formValid.noOfPersons &&
            formValid.checkInDate &&
            formValid.user
        this.setState( { formErrorMessage: fieldValidationErrors, formValid: formValid, successMessage: "" } )
    };

    handleToggle = ( event ) => {
        const{ formValue } = this.state;
        this.setState( { formValue: { ...formValue, flight: event.target.checked } } );
        let withFlight = this.state.formValue.noOfPersons * ( ( this.state.destinationDetails.chargesPerPerson - ( this.state.destinationDetails.chargesPerPerson * this.state.destinationDetails.discount / 100 ) ) + this.state.destinationDetails.flightCharges )
        let withoutFlight = this.state.formValue.noOfPersons * ( ( this.state.destinationDetails.chargesPerPerson - ( this.state.destinationDetails.chargesPerPerson * this.state.destinationDetails.discount / 100 ) ) )
        if( this.state.totalCharges !== "" ) {
            this.state.formValue.flight ? this.setState( { totalCharges: withoutFlight } ) : this.setState( { totalCharges: withFlight } )
        }
    }

    handleCollapse = ( event ) => {

        switch( event.target.id ) {
            case"collapse1":
                if( this.state.collapse1 === false ) {
                    this.setState( { collapse1: true } )
                    document.getElementById( "collapse1" ).innerHTML = "- Overview";

                }
                else{
                    this.setState( { collapse1: false } )
                    document.getElementById( "collapse1" ).innerHTML = "+ Overview";
                }


                break;
            case"collapse2":
                if( this.state.collapse2 === false ) {
                    this.setState( { collapse2: true } )
                    document.getElementById( "collapse2" ).innerHTML = "- Package Inclusions";

                }
                else{
                    this.setState( { collapse2: false } )
                    document.getElementById( "collapse2" ).innerHTML = "+ Package Inclusions";
                }
                break;
            case"collapse3":
                if( this.state.collapse3 === false ) {
                    this.setState( { collapse3: true } )
                    document.getElementById( "collapse3" ).innerHTML = "- Itinerary";

                }
                else{
                    this.setState( { collapse3: false } )
                    document.getElementById( "collapse3" ).innerHTML = "+ Itinerary";
                }
                break;
            default:
                break;

        }
    }



    render () {
        return(
            <div>
                {this.state.visibility ?
                    <div className="masthead-book-page" style={{ overflow: "hidden" }}>
                        <div className="row">
                            <br />
                            <div className="col-lg-5 offset-1 card-color text-light " >
                             <center><h3 style={{ color: "#000000", fontSize: "30px", fontWeight: "bold" }}>{this.state.destinationDetails.name}</h3></center>
                                <div className="scroll"> <br />
                                    <button className="btn-lg btn-block text-left" onClick={this.handleCollapse} id="collapse1">+ Overview</button>
                                    <br />
                                    <Collapse in={this.state.collapse1}>
                                        <div className="coll-mod text-light" style={{fontWeight:"bold"}}>{this.state.details.about}</div>
                                    </Collapse>
                                    <br />
                                    <button className="btn-lg btn-block text-left  " onClick={this.handleCollapse} id="collapse2">+ Package Inclusions</button>
                                    <br />
                                    <Collapse in={this.state.collapse2}>
                                        <div className="coll-mod text-light" style={{fontWeight:"bold"}}>
                                            {String( this.state.itinerary.packageInclusions )
                                                .split( "," )
                                                .map( ( x, index ) => {
                                                    return<li  key={index} style={{fontFamily: "Flamenco"}}>{x}</li>
                                                } )}
                                        </div>
                                    </Collapse>
                                    <br />
                                    <button className="btn-lg btn-block text-left " onClick={this.handleCollapse} id="collapse3">+ Itinerary</button>
                                    <br />
                                    <Collapse in={this.state.collapse3}>
                                        <div className="coll-mod text-light" style={{fontWeight:"bold"}}><h5>Day 1:</h5>{this.state.firstDay}<br /><br /><h5>Rest Of Days:</h5>{String( this.state.restOfDays )
                                            .split( "," )
                                            .map( ( x, index ) => {
                                                return<li style={{fontFamily: "Flamenco"}}key={index}>{x}</li>
                                            } )}<br /><h5>Last Day:</h5>{this.state.lastDay}</div>
                                    </Collapse>
                                </div>
                            </div>

                            <div className="col-lg-4  offset-1 card-body card-color text-light right-col" style={{ float: "right" }}>
                             <center><h3 style={{ color: "#000000", fontSize: "40px", fontWeight: "bold" }}>Travel Booking</h3></center>
                                <form className="tripBooking" onSubmit={this.handleSubmit} align="left">
                                    <span name="userError" className="text-danger">{this.state.formErrorMessage.user}</span>
                                    <div className="form-group">
                                        <label htmlFor="noOfPersons" style={{fontWeight: "bold"}} className='text-light w3-input w3-border'>Number Of Travellers </label>
                                        <input
                                            type="number"
                                            name="noOfPersons"
                                            id="noOfPersons"
                                            placeholder="Enter No. of Travellers"
                                            value={this.state.formValue.noOfPersons}
                                            onChange={this.handleChange}
                                            className="form-control"
                                        />
                                        <span name="noOfPersonsError" className="text-danger"style={{fontWeight: "bold"}}>
                                            {this.state.formErrorMessage.noOfPersons}
                                        </span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="checkInDate" className='text-light w3-input w3-border' style={{fontWeight: "bold"}}>Trip Start Date</label>
                                        <input
                                            type="date"
                                            name="checkInDate"
                                            id="checkInDate"
                                            value={this.state.formValue.checkInDate}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            
                                        />

                                        <span name="checkInError" className="text-danger" style={{fontWeight: "bold"}}>
                                          {this.state.formErrorMessage.checkInDate}
                                        </span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="flight" className='text-light' style={{fontWeight: "bold"}}>Include Flight</label>
                                        <Switch color="secondary" name="flight" id="flight"
                                            checked={this.state.formValue.flight} onChange={this.handleToggle.bind( this )} />
                                    </div>
                                    <span className="text-success" style={{fontWeight: "bold"}}>
                                        {( this.state.formErrorMessage.checkInDate === "" && this.state.formErrorMessage.noOfPersons === "" && this.state.formValue.checkInDate ? <span style={{ fontFamily: "Flamenco" }}>Your Trip Ends On:&nbsp;{this.state.checkOutDate}</span> : "" )}
                                    </span>
                                    <span className="text-success" style={{fontWeight: "bold"}}>{( this.state.formErrorMessage.checkInDate === "" && this.state.formErrorMessage.noOfPersons === "" && this.state.formValue.noOfPersons > 0 && this.state.formValue.noOfPersons < 6 && this.state.formValue.checkInDate && this.state.destinationDetails.discount > 0 ? <span style={{ fontFamily: "Flamenco" }} className="center"><br />Instant discount applied: {this.state.destinationDetails.discount}%</span> : "" )}</span>
                                    <span className="text-success" style={{fontWeight: "bold"}}>{( this.state.formErrorMessage.checkInDate === "" && this.state.formErrorMessage.noOfPersons === "" && this.state.formValue.noOfPersons > 0 && this.state.formValue.noOfPersons < 6 && this.state.formValue.checkInDate ? <span className="center" style={{ fontFamily: "Flamenco" }}><br />You have to pay: ${Math.round( this.state.totalCharges )}<br ></br></span> : "" )}</span>
                                    <span></span>

                                    <div className="row center">

                                        <button type="submit" className="btn btn-info adj" name="confirmBook"
                                            disabled={!this.state.formValid.buttonActive}>Confirm Booking</button>

                                        &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;
                                            <button type="button" onClick={() => { window.history.back() }} className="btn btn-secondary " style={{ float: "right" }} name="goBack">Go Back</button>

                                    </div>
                                </form>
                                <span name="errorMessage" className="text-danger text-bold">
                                  {this.state.errorMessage}
                                </span>
                            </div>
                        </div>
                    </div>
                    : <div className="success-page">
                        <center>
                            <div>
                                <br /><br />
                                < h3 className="text-success"> {this.state.successMessage}</ h3><br />
                                <h3 className="text-success">Happy Travelling</h3><br />
                                <p><Link to="/viewBookings">Click Here To View Your Bookings</Link></p>
                                <p className="text-success font-weight-bold">Your Trip Starts on :&nbsp;{this.state.checkInDate}</p>
                                <p className="text-success font-weight-bold">Your Trip Ends on :&nbsp;{this.state.checkOutDate}</p>
                                <br /><br /><br /><br /><br /><br />
                            </div>
                        </center>
                    </div>
                }

            </div>
        )
    }
}

export default Booking;