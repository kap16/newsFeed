// Importing Libraries
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Importing files
import * as actions from '../actions/index';
const config = require('../../config');

export class ErrorPage extends React.Component {
  render() {
    return (
      <div className="main-body">
        <div>
          <p>Error</p>
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

export default connect(null, mapDispatchToProps)(ErrorPage);