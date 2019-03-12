// Importing Libraries
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { convertDateTime } from '../../utils.js';
import PropTypes from 'prop-types';

import * as actions from '../../actions/index';
const config = require('../../../config');

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    var item = this.props.item;
    return (
      <div className="card">
        <div className="img2">
          <div className="center">
          </div>
        </div>
        <div>
          <h5>{item.title}</h5>
          <p>This was published on {convertDateTime(item.pubDate)}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedItem);