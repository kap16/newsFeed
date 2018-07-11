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
            username:'',
            email:'',
            password:'',
            password2:'',
            errors: {},
            isLoading: false
        }

        this.onSignUp = this.onSignUp.bind(this);
        this.onChange = this.onChange.bind(this);
    };

    // create user
    onSignUp(e){
        e.preventDefault();
        if(this.refs.email.value === "" ){
            this.setState({errors:{email: "Email required"}});
        }
        if(this.refs.username.value === "" ){
            this.setState({errors:{username: "Username required"}});
        }
        if(this.refs.password.value === "" ){
            this.setState({errors:{password: "Password required"}});
        }
        if(this.refs.password2.value === "" ){
            this.setState({errors:{password2: "Password Confirm required"}});
        }
        else{
            var data = {
                "email": this.refs.email.value,
                "username": this.refs.username.value,
                "password": this.refs.password.value,
                "password2": this.refs.password2.value
            };
            this.props.actions.signUp(data);
        }
        
    }

    onChange(e) {
        return this.setState({ [e.target.name]: e.target.value });
    }
    
    render() {
        const { errors, password, isLoading } = this.state;
        var style = {backgroundColor: '#292931'};
        var style2 = {color: 'white'};
        return(
            <div id="login" className="login-bg">
                <form onSubmit={this.onSignUp} onChange={this.onChange}>
                    <h2>Sign Up</h2>
                    <input
                        id="username"
                        type="text"
                        className="text-input"
                        placeholder="Username"
                        ref="username"
                        defaultValue=""
                        error={this.state.errors.username}
                        onChange={this.onChange}
                    />
                    <p style={style2}>{this.state.errors.username}</p>
                    <input
                        id="email"
                        type="text"
                        className="text-input"
                        placeholder="Email"
                        ref="email"
                        defaultValue=""
                        error={this.state.errors.email}
                        onChange={this.onChange}
                    />
                    <p style={style2}>{this.state.errors.email}</p>
                    <input
                        id="password"
                        type="password"
                        className="text-input"
                        placeholder="Password"
                        ref="password"
                        defaultValue=""
                        error={this.state.errors.password}
                        onChange={this.onChange}
                    />
                    <p style={style2}>{this.state.errors.password}</p>
                    <input
                        id="password-confirm"
                        type="password"
                        className="text-input"
                        placeholder="Confirm Password"
                        ref="password2"
                        defaultValue=""
                        error={this.state.errors.password2}
                        onChange={this.onChange}
                    />
                    <p style={style2}>{this.state.errors.password2}</p>
                    <input
                        className="login-btn"
                        type="submit"
                        value="Sign Up"
                        onChange={this.onChange}
                    />
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

export default connect(null, mapDispatchToProps)(Register);