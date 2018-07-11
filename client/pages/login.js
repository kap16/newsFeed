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
            identifier:'',
            errors: {},
            formErrors: {username: '', password: ''}
        }
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    onSave(e){
        e.preventDefault();
        //if(this.refs.uSignIn.value === "" || this.refs.pSignIn.value===""){
        if(this.refs.uSignIn.value === "" ){
            this.setState({formErrors:{username: "Email required"}});
        }
        if(this.refs.pSignIn.value === "" ){
            this.setState({formErrors:{password: "Password required"}});
        }
        else{
            var data = {
                "username": this.refs.uSignIn.value,
                "password": this.refs.pSignIn.value
            };
            this.props.actions.loginUser(data);
        }
    }

    render () {
        const { errors, identifier, isLoading } = this.state;
        var style = {backgroundColor: '#292931'};
        var style2 = {color: 'white'};
        return(
            <div id="login" className="login-bg">
                <form onSubmit={this.onSave} onChange={this.onChange}>
                    <h2>Sign In</h2>
                    <input
                        id="username"
                        type="text"
                        className="text-input"
                        placeholder="Username"
                        defaultValue=""
                        ref="uSignIn"
                        error={errors.identifier}
                        onChange={this.onChange}
                    />
                    <p style={style2}>{this.state.formErrors.username}</p>
                    <input
                        id="password"
                        type="password"
                        className="text-input"
                        placeholder="Password"
                        defaultValue=""
                        ref="pSignIn"
                        error={errors.password}
                        onChange={this.onChange}
                    />
                    <p style={style2}>{this.state.formErrors.password}</p>
                    <input
                        className="login-btn"
                        type="submit"
                        value="Sign In"
                        onChange={this.onChange}
                    />
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