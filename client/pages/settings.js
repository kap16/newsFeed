import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';

import * as actions from '../actions/index';
import Navbar from '../components/navbar';
var config = require('../../config');

class Settings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            DefaultPagination:''
        }

        this.onDefaultPaginationFieldChange = this.onDefaultPaginationFieldChange.bind(this)
        this.onSave = this.onSave.bind(this);
    }


    componentDidMount(){
        this.props.actions.getUser();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.settings !== prevProps.settings) {
            this.setState({ 
                DefaultPagination: this.props.settings.defaultPagination
            });
        }
    }

    onDefaultPaginationFieldChange(newValue){
        this.setState({ 
            DefaultPagination: newValue
        });
    }

    onSave(){
        var data = {
            defaultPagination: this.state.DefaultPagination
        }
        this.props.actions.saveUser(data);
    }

    render(){
        return( 
            <div>
                <Navbar/>
                <div style={{padding:'20px'}}>
                    <div>
                        <div>
                        Default Pagination: <input 
                            type="number"
                            className="text-input"
                            value={this.state.DefaultPagination}/><br/>
                            <input
                                type="button"
                                value={20}
                                onClick={this.onDefaultPaginationFieldChange(20)}/>
                            <input
                                type="button"
                                value={50}
                                onClick={this.onDefaultPaginationFieldChange(50)}/>
                            <input
                                type="button"
                                value={100}
                                onClick={this.onDefaultPaginationFieldChange(100)}/>
                        </div>
                        <button onClick={this.onSave}>Save</button>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);