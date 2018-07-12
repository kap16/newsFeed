import React from 'react';
import PropTypes from 'prop-types';
import style from '../../css/default/modal.css';
import { toast } from 'react-toastify';
const config = require('../../../config');

export default class SourceItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        };

    }

    render(){
        var source = this.props.source;
        return(
            <tr>
                <td>{source.title}</td>
                <td>{source.createdOn}</td>
            </tr>
        )
    }
}