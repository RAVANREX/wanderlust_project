import React, { Component } from'react';
import axios from'axios';
import{ Link, Redirect } from'react-router-dom';
import TextField from'@material-ui/core/TextField';
import Button from'@material-ui/core/Button';
import{Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from'@material-ui/core'
import{backendUrlUser} from'../BackendURL';
///////////////////////////////////////////register//////////////////////////

class Register extends Component {

    constructor ( props ) {
        super( props );
        this.state = {
            formValue: {
                name: "",
                emailId: "",
                contactNo: "",
                password: ""
            },
            formErrorMessage: {
                name: "",
                emailId: "",
                contactNo: "",
                password: ""
            },
            formValid: {
                name: false,
                emailId: false,
                contactNo: false,
                password: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            visibility: true,
            load: false,
            dialogBox: false
           
        }
    }



  

    handleSubmit = ( event ) => {
        event.preventDefault();
        this.register();
       
    }

    register () {
        const{ formValue } = this.state;
        this.setState( { successMessage: "", errorMessage: "" } );

        axios.post( backendUrlUser + '/register', formValue )
            .then( response => {
             
                
                this.setState( { successMessage: "Successfully Registered!!", visibility: false, errorMessage: "" } );
            } ).catch( error => {
                if( error.response ) {
                    this.setState( { errorMessage: error.response.data.message, successMessage: "" } );
                } else{
                    this.setState( { errorMessage: "Please run the Backend", successMessage: "" } );
                }
            } )
    }
onRegister=()=>{
  this.setState( {dialogBox: true} )
}


    handleChange = ( event ) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const{ formValue } = this.state;
        this.setState( { formValue: { ...formValue, [name]: value } } );
        this.validateField( name, value );
    }

    validateField = ( fieldName, value ) => {
        let fieldValidationErrors = this.state.formErrorMessage;
        let formValid = this.state.formValid;

        switch( fieldName ) {
            case"name":
                var nameRegex = /^[A-z]+([\s A-z])*$/
                if( value === '' ) {
                    fieldValidationErrors.name = 'Field required';
                    formValid.name = false;
                } else if( !value.match( nameRegex ) ) {
                    fieldValidationErrors.name = "Enter a valid name";
                    formValid.name = false;
                } else{
                    fieldValidationErrors.name = "";
                    formValid.name = true;
                }
                break;
            case"emailId":
                var emailIdRegex = /^[A-z][A-z0-9]*@[A-z]+.com$/
                if( value === '' ) {
                    fieldValidationErrors.emailId = "Field required";
                    formValid.emailId = false;
                } else if( !value.match( emailIdRegex ) ) {
                    fieldValidationErrors.emailId = "Enter a valid email Id";
                    formValid.emailId = false;
                } else{
                    fieldValidationErrors.emailId = "";
                    formValid.emailId = true;
                }
                break;
            case"contactNo":
                var contactNoRegex = /^[7-9]{1}[0-9]{9}$/
                if( value === '' ) {
                    fieldValidationErrors.contactNo = "Field required";
                    formValid.contactNo = false;
                } else if( !value.match( contactNoRegex ) ) {
                    fieldValidationErrors.contactNo = "Enter a valid contact number";
                    formValid.contactNo = false;
                } else{
                    fieldValidationErrors.contactNo = "";
                    formValid.contactNo = true;
                }
                break;
            case"password":
                var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/
                if( value === '' ) {
                    fieldValidationErrors.password = "field required";
                    formValid.password = false;
                } else if( !value.match( passwordRegex ) ) {
                    fieldValidationErrors.password = "Enter a valid password";
                    formValid.password = false;
                } else{
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.name &&
            formValid.emailId &&
            formValid.contactNo &&
            formValid.password
        this.setState( {
            formErrorMessage: fieldValidationErrors, formValid: formValid,
            errorMessage: "", successMessage: ""
        } )
    }

onHide=()=>{
  this.setState( {diaLogBox: false} )
}
    render () {
      
      if( this.state.load===true ) return<Redirect to='/login'></Redirect>
      if( this.state.successMessage ){
        return(
          <div>
            <Dialog size="lg" open={this.state.dialogBox}  onClose={this.onHide}
aria-labelledby='alert-dialog-title'
aria-describedby='alert-dialog-description'>

   <DialogTitle id='alert-dialog-title'></DialogTitle>


 <DialogContent>
 <DialogContentText id='alert-dialog-description'>
 <b className='h4 text-success' style={{fontFamily: "Courier New"}}>Successfully Registered</b>
   </DialogContentText>
 </DialogContent>

<DialogActions>
   <Link to='/login'color='primary'  variant="outlined"  className='btn btn-info'> LOGIN</Link>&nbsp;
   
   
</DialogActions>
</Dialog>
</div>
           )
        
      }
        return(

         
          <div>
          {this.state.visibility?
          <div className='container-fluid'>
          <div className="register ">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <br />
               
                    <h4 className='display-4' align='center'><b>Join Us</b></h4>
                
                  <div className="card-body">
                    <form className="register form text-left" onSubmit={this.handleSubmit}>
                      <div className="form-group" >
                        <label htmlFor="name">Name <span className="text-danger">*</span></label>
                        <TextField
                          type="text"
                          name="name"
                          id="name"
                          variant='outlined'
                          label='Name'
                          value={this.state.formValue.name}
                          onChange={this.handleChange}
                          className="form-control"
                          placeholder='Rossy  Singh'
                        />
    
                       
                      </div>
                      {this.state.formErrorMessage.name? <span name="nameError" className="text-danger">
                          {this.state.formErrorMessage.name}
                        </span>:null}
    
                      <div className="form-group">
                        <label htmlFor="emaiId">Email ID <span className="text-danger">*</span></label><br/>
                        <TextField
                          type="email"
                          name="emailId"
                          id="emailId"
                          label='Email Id'
                          value={this.state.formValue.emailId}
                          onChange={this.handleChange}
                          className="form-control"
                          variant='outlined'
                          placeholder='abc@gmail.com'
                          />
                          
                        
                        
                      </div>
                      {this.state.formErrorMessage.emailId?<span name="emailIdError" className="text-danger">
                          {this.state.formErrorMessage.emailId}
                        </span>:null}
                      <div className="form-group">
                        <label htmlFor="contactNo">Contact Number <span className="text-danger">*</span></label>
                        <TextField
                          type="number"
                          name="contactNo"
                          id="contactNo"
                          variant='outlined'
                          value={this.state.formValue.contactNo}
                          onChange={this.handleChange}
                          className="form-control"
                          label='Contact Number'
                          placeholder='9098765432'
                        />
                       
                        
                      </div>
                      {this.state.formErrorMessage.contactNo?<span name="contactNoError" className="text-danger">
                          {this.state.formErrorMessage.contactNo}
                        </span>:null}

                      <div className="form-group">
                      
                        <label htmlFor="password">Password <span className="text-danger">*</span></label>
                        <TextField
                         label='Password'
                          type="password"
                          name="password"
                          id="password"
                          variant='outlined'
                          value={this.state.formValue.password}
                          onChange={this.handleChange}
                          className="form-control"
                        />
                        
                      </div>
                      {this.state.formErrorMessage.password?<span name="passwordError" className="text-danger">
                          {this.state.formErrorMessage.password}
                        </span>:null}<br/>
                      <span className="text-danger">*</span><span >marked fields are mandatory</span>
                      <br/> <br/>
                     
                      <Button type='submit'color='primary' variant='contained' fullWidth size='large'
                        disabled={!this.state.formValid.buttonActive} onClick={this.onRegister}>Register</Button>
                    
                    <br />
                   
                    <span name="errorMessage" className="text-danger text-bold">
                      {this.state.errorMessage}
                    </span>
                    </form>
                  </div>
                </div>
              </div>
              </div>
          
    
    
          </div>:null}
        
         </div> )
          ;
         
      }

}

export default Register;