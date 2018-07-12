// Importing Libraries
import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';  
import {Link} from 'react-router';

// Importing files
import loginStyle from 'css/default/login.css';
import styles from 'css/default/index.css';
import * as actions from '../actions/index';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
            formFields: {
                email:'',
                username: '', 
                password: '',
                password2:''
            },
            formErrors:{
                email:'',
                username: '', 
                password: '',
                password2:''
            }
        }

        this.onSave = this.onSave.bind(this);
        this.validate = this.validate.bind(this);
    };

    onEmailFieldChange(e){
        this.setState({
            formFields: { 
                email: e.target.value,
                username: this.state.formFields.username, 
                password: this.state.formFields.password, 
                password2: this.state.formFields.password2
            }
        });
    }

    onUsernameFieldChange(e){
        this.setState({
            formFields: { 
                email: this.state.formFields.email,
                username: e.target.value, 
                password: this.state.formFields.password, 
                password2: this.state.formFields.password2
            }
        });
    }

    onPasswordFieldChange(e){
        this.setState({
            formFields: { 
                email: this.state.formFields.email,
                username: this.state.formFields.username, 
                password: e.target.value, 
                password2: this.state.formFields.password2
            }
        });
    }

    onPassword2FieldChange(e){
        this.setState({
            formFields: { 
                email: this.state.formFields.email,
                username: this.state.formFields.username, 
                password: this.state.formFields.password, 
                password2: e.target.value
            }
        });
    }

    validate(email, username, password, password2){
        const errors = {
            email:'',
            username: '', 
            password: '',
            password2:''
        };

        // email
        if (email.length < 5) {
            errors.email = "Email should be at least 5 characters long";
        }
        else if (email.split('').filter(x => x === '@').length !== 1) {
            errors.email = "Email should contain an @";
        }
        else if (email.indexOf('.') === -1) {
            errors.email = "Email should contain at least one dot";
        }

        // username
        if (username.length === 0) {
            errors.username ="Name can't be empty";
        }
    
        // password
        if (password.length < 6) {
            errors.password = "Password should be at least 6 characters long";
        }
        if (password2 !== password) {
            errors.password2 = "Passwords do not match";
        }
    
        return errors;
    }

    // create user
    onSave(e){
        e.preventDefault();
        const errors = this.validate(
            this.state.formFields.email,
            this.state.formFields.username,
            this.state.formFields.password,
            this.state.formFields.password2);
        if (errors.email !== '' || errors.username !== '' || errors.password !== '' || errors.password2 !== '') {
            this.setState({ formErrors:errors });
        }
        else{
            var data = {
                "email": this.state.formFields.email,
                "username": this.state.formFields.username,
                "password": this.state.formFields.password,
                "password2": this.state.formFields.password2
            };
            this.props.actions.signUp(data);
        }
        
    }
    
    render() {
        var style = {backgroundColor: '#292931'};
        var style2 = {color: 'white'};
        return(
            <div id="login" className="login-bg">
                <form onSubmit={this.onSave}>
                    <h2>Sign Up</h2>
                    <input
                        id="username"
                        type="text"
                        className="text-input"
                        placeholder="Username"
                        value={this.state.formFields.username}
                        onChange={(e) => this.onUsernameFieldChange(e)}
                    />
                    <p style={style2}>{this.state.formErrors.username}</p>
                    <input
                        id="email"
                        type="text"
                        className="text-input"
                        placeholder="Email"
                        value={this.state.formFields.email}
                        onChange={(e) => this.onEmailFieldChange(e)}
                    />
                    <p style={style2}>{this.state.formErrors.email}</p>
                    <input
                        id="password"
                        type="password"
                        className="text-input"
                        placeholder="Password"
                        value={this.state.formFields.password}
                        onChange={(e) => this.onPasswordFieldChange(e)}
                    />
                    <p style={style2}>{this.state.formErrors.password}</p>
                    <input
                        id="password-confirm"
                        type="password"
                        className="text-input"
                        placeholder="Confirm Password"
                        value={this.state.formFields.password2}
                        onChange={(e) => this.onPassword2FieldChange(e)}
                    />
                    <p style={style2}>{this.state.formErrors.password2}</p>
                    <input type="submit" className="login-btn" value="Sign Up"/>
                </form>
                <p id="login-switch">Already have an account? Click <Link to={"/login"}>here</Link> to login</p>
            </div>
        );
    }
}

function mapStateToProps(state) {  
    return { ...state };
}


function mapDispatchToProps(dispatch) {  
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);