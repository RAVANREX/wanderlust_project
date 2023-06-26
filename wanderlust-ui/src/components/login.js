import React, { Component } from"react";
import axios from"axios";
import{ Redirect } from'react-router-dom';
import{backendUrlUser} from'../BackendURL';
import{ TextField } from"@material-ui/core";
import{ Button } from"@material-ui/core";
////////////////////////////////////////////////login/////////////

class Login extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            loginform: {
                contactNo: "",
                password: ""
            },
            loginformErrorMessage: {
                contactNo: "",
                password: ""
            },
            loginformValid: {
                contactNo: false,
                password: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            loadHome: false,
            loadRegister: false,
            userId: ""
        }
    }

    handleClick = () => {
        this.setState( { loadRegister: true } )
    }

    handleChange = ( event ) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const{ loginform } = this.state;
        this.setState( {
            loginform: { ...loginform, [name]: value }
        } );
        this.validateField( name, value );
       
    }

    login = () => {
        const{ loginform } = this.state;
        axios.post( backendUrlUser+'/login', loginform )
            .then( response => {
                sessionStorage.setItem( "contactNo", response.data.contactNo );
                sessionStorage.setItem( "userId", response.data.userId );
                sessionStorage.setItem( "name", response.data.name );
             
                let userId=response.data.userId;
                this.setState( { userId: userId ,successMessage: "User Logged in successfully"} )
                window.location.reload();


            } ).catch( error => {
              
                if( error.response ){
                    this.setState( {errorMessage: error.response.data.message} )
                } else{
                    this.setState( {errorMessage: error.message} )
                }
                sessionStorage.clear();
            } )
       
    }

    handleSubmit = ( event ) => {
        event.preventDefault();
        this.login();
    }

    validateField = ( fieldName, value ) => {
        let fieldValidationErrors = this.state.loginformErrorMessage;
        let formValid = this.state.loginformValid;
        switch( fieldName ) {
            case"contactNo":
                var cnoRegex = /^[7-9]\d{9}$/
                if( !value || value === "" ) {
                    fieldValidationErrors.contactNo = "Please enter your contact Number";
                    formValid.contactNo = false;
                } else if( !value.match( cnoRegex ) ) {
                    fieldValidationErrors.contactNo = "Contact number should be a valid 10 digit number";
                    formValid.contactNo = false;
                } else{
                    fieldValidationErrors.contactNo = "";
                    formValid.contactNo = true;
                }
                break;
            case"password":
              var  passRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/
                if( !value || value === "" ) {
                    fieldValidationErrors.password = "Password is mandatory";
                    formValid.password = false;
                    } else if( !( value.match( passRegex ) ) ) {
                        fieldValidationErrors.password = " Enter Correct Password"
                        formValid.password = false;
                } else{
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.contactNo && formValid.password;
        this.setState( {
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        } );
    }

    render () {
        if( this.state.successMessage !== "" ) return<Redirect to={'/home/' + this.state.userId} />
        if( this.state.loadRegister === true ) return<Redirect to={'/register'} />
        return(
            <div>
                <section id="loginPage" className="loginSection">    
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 offset-4 ">
                                <h1>Login</h1>
                                <form className="form" onSubmit={this.handleSubmit} align='left'> 
                                    <div className="form-group">
                                        <label htmlFor="uContactNo" >Contact Number<span className="text-danger">*</span></label>
                                        <TextField
                                            type="number"
                                            value={this.state.loginform.contactNo}
                                            onChange={this.handleChange}
                                            id="uContactNo"
                                            name="contactNo"
                                            className="form-control"
                                            variant='outlined'
                                            label='Contact Number'
                                            placeholder='9098765432'
                                        />
                                    </div>
                                    {this.state.loginformErrorMessage.contactNo ? ( <span className="text-danger">
                                        {this.state.loginformErrorMessage.contactNo}
                                    </span> )
                                        : null}

                                    <div className="form-group">
                                        <label htmlFor="uPass">Password<span className="text-danger">*</span></label>
                                        <TextField
                                            type="password"
                                            value={this.state.loginform.password}
                                            onChange={this.handleChange}
                                            id="uPass"
                                            name="password"
                                            className="form-control"
                                            variant='outlined'
                                            label='Password'
                                           
                                        />
                                    </div>
                                    {this.state.loginformErrorMessage.password ? ( <span className="text-danger">
                                        {this.state.loginformErrorMessage.password}
                                    </span> )
                                        : null}<br />
                                    <span><span className="text-danger">*</span> marked fields are mandatory</span>
                                    <br />
                                   
                                
                                    <Button
                                        type="submit" color='primary' variant='contained' fullWidth size='large'
                                        disabled={!this.state.loginformValid.buttonActive}
                                        className="btn btn-primary"
                                   onClick={this.login} >
                                        Login
                                    </Button>
                                </form>
                                <br />
                                <span className="text-danger">{this.state.errorMessage}</span>
                                <span className="text-success">{this.state.successMessage}</span>
                                {/* <!--can be a button or a link based on need --> */}
                                <Button color='primary' variant='contained' fullWidth size='large' onClick={this.handleClick} >Click here to Register</Button>
                            </div>
                        </div>
                    </div>
                </section>
               
            </div>

        )
    }
}

export default Login;