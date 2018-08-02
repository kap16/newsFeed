// Importing Libraries
import React from 'react';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import * as actions from '../../actions/index';
import EditSource from '../../components/modal/editSource';
import style from '../../css/default/modal.css';
const config = require('../../../config');

class SourceItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {};

        this.ConvertDateTime = this.ConvertDateTime.bind(this);
    }

    ConvertDateTime(str){
        let date = moment(str);
        var dateCompoment = date.utc().format('YYYY-MM-DD');
        var timeCompoment = date.utc().format('HH:mm');
        var output = dateCompoment + " at " + timeCompoment;
        return output;
    }

    render(){
        var source = this.props.source;
        return(
            <tr>
                <td onClick={this.props.actions.showEditSourceModal}>{source.title}</td>
                <td>{this.ConvertDateTime(source.createdOn)}
                {   
                    this.props.modal.active && this.props.modal.type===actions.EDIT_SOURCE?
                    <EditSource
                        sItem={source}
                        onClose={this.props.actions.hideModal}
                        show={this.props.modal.active}/>
                    :null
                }
                </td>
                
            </tr>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(SourceItem);