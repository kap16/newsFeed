// Importing Libraries
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions/index';
import EditSource from '../../components/modal/editSource';
import { convertDateTime } from '../../utils.js'
import style from '../../styles/default/modal.css';
const config = require('../../../config');

class SourceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: this.props.source
    }; 

    this.showModal = this.showModal.bind(this);
    this.deleteSource = this.deleteSource.bind(this);
  }

  showModal(){
    this.props.actions.showEditSourceModal(this.state.source);
  }

  deleteSource(){
    this.props.actions.deleteSource({id: this.state.source._id});
  }

  render() {
    if(this.props.displayOn === "home"){
      return (
        <tr>
          <td><input type="checkbox"/></td>
          <td>{source.title}</td>        
        </tr>
      )
    }else{
      return (
        <tr>
          <td>{this.state.source.title}</td>
          <td>{convertDateTime(this.state.source.createdOn)}</td>
          <td>
            <button onClick={this.showModal}>Edit</button>
            <button onClick={this.deleteSource}>Delete</button>
          </td>
        </tr>
      )
    }
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