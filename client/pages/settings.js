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
        this.setState({ DefaultPagination: newValue });
    }

    onSave(){
        var data = {
            defaultPagination: this.state.DefaultPagination
        }
        this.props.actions.saveUser(data);
    }

    render(){
        var style1 = {display:'inline-block'}
        return( 
            <div>
                <Navbar/>
                <div>
                    <div style={{padding:'20px'}}>
                        <div style={style1}>
                        Default Pagination: <input 
                            type="number"
                            className="text-input"
                            readOnly="readonly"
                            value={this.state.DefaultPagination}/><br/>
                            <button onClick={() => this.onDefaultPaginationFieldChange(20)}>20</button>
                            <button onClick={() => this.onDefaultPaginationFieldChange(50)}>50</button>
                            <button onClick={() => this.onDefaultPaginationFieldChange(100)}>100</button>
                        </div>
                    </div>
                    <button onClick={this.onSave}>Save</button>
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