// Importing Libraries
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../actions/index';
import EditSource from '../../components/modal/editSource';
import { convertDateTime } from '../../utils.js'
import style from '../../css/default/modal.css';
const config = require('../../../config');

class SourceItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var source = this.props.source;
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
          <td onClick={this.props.actions.showEditSourceModal}>{source.title}</td>
          <td>{convertDateTime(source.createdOn)}
            {
              this.props.modal.active && this.props.modal.type === actions.EDIT_SOURCE ?
                <EditSource
                  sItem={source}
                  onClose={this.props.actions.hideModal}
                  show={this.props.modal.active} />
                : null
            }
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