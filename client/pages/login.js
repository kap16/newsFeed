// Importing Libraries
import React from 'react';
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux';  
import {Link} from 'react-router';

// Importing files
import loginStyle from 'css/default/login.css';
import styles from 'css/default/index.css';
import * as actions from '../actions/index';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            formFields: {
                username: '', 
                password: ''
            },
            formErrors:{
                username: '', 
                password: ''
            }
        }
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validate = this.validate.bind(this);
    };

    onUsernameFieldChange(e){
        this.setState({
            formFields:{ 
                username: e.target.value,
                password: this.state.formFields.password     
            }
        });
    }

    onPasswordFieldChange(e){
        this.setState({
            formFields:{ 
                username: this.state.formFields.username,
                password: e.target.value 
            }
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    validate(username, password){
        const errors = {
            username: '', 
            password: ''
        };

        // username
        if (username.length === 0) {
            errors.username = "Name can't be empty";
        };
        
        // password
        if (password.length < 6) {
            errors.password = "Password should be at least 6 characters long";
        };
        
        return errors;
    }
    
    onSave(e){
        e.preventDefault();
        const errors = this.validate(this.state.formFields.username,this.state.formFields.password);
        if (errors.username !== '' || errors.password !== '') {
            this.setState({ formErrors:errors });
        }
        else{
            var data = {
                "username": this.state.formFields.username,
                "password": this.state.formFields.password
            };
            this.props.actions.loginUser(data);
        }
    }

    render () {
        //var style = {backgroundColor: '#292931'};
        var style2 = {color: '#FA9696'};
        return(
            <div id="login" className="login-bg">
                <form onSubmit={this.onSave} onChange={this.onChange}>
                    <h2>Sign In</h2>
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
                        id="password"
                        type="password"
                        className="text-input"
                        placeholder="Password"
                        value={this.state.formFields.password}
                        onChange={(e) => this.onPasswordFieldChange(e)}
                    />
                    <p style={style2}>{this.state.formErrors.password}</p>
                    <button type="submit"className="login-btn">Sign In</button>
                </form>
                <p id="login-switch">Don't have an account? Click <Link to={"/register"}>here</Link> to sign up</p>
            </div>
        );
    }
}

function mapStateToProps(state) {  
    return { state: state };
}

function mapDispatchToProps(dispatch) {  
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);