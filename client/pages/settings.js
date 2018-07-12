// Importing Libraries
import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';

// Importing files
import * as actions from '../actions/index';
const config = require('../../config');
import Navbar from '../components/navbar';

class Settings extends React.Component{
    render(){
        return( 
            <div>
                <Navbar/>
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

export default connect(null, mapDispatchToProps)(Settings);