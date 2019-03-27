// Importing Libraries
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { convertDateTime } from '../../utils.js';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import * as actions from '../../actions/index';
const config = require('../../../config');

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onArticlePageRedirect = this.onArticlePageRedirect.bind(this);
  }

  onArticlePageRedirect(e){
    e.preventDefault();
    browserHistory.push('/atricle/'+this.props.item._id);
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
        <div>
          <button onClick={this.onArticlePageRedirect} className="block">View more</button>
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